import type {
    User, 
    Expense, 
    SignupRequest, 
    LoginRequest, 
    AuthResponse, 
    CreateUserRequest,
    UpdateUserRequest,
    AnalyzeExpenseResponse,
    CheckEmailResponse,
    PaginationOptions,
    
} from '../types';

const API_BASE_URL = 'http://13.220.93.143:8080';

interface RequestOptions extends RequestInit{
    headers?: Record<string, string>;
}

async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    
    const token = localStorage.getItem('token')
    if(token){
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
        ...options,
        headers: {
        ...defaultHeaders,
        ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}

export async function signup(userInfo: SignupRequest): Promise<AuthResponse> {
    console.log(userInfo)

    return apiRequest<AuthResponse>('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userInfo),
    });
}

export async function login(credentials: LoginRequest): Promise<AuthResponse> {
    return apiRequest<AuthResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
}

export async function checkEmail(email: string): Promise<CheckEmailResponse>{
    const encodedEmail = encodeURIComponent(email);
    return apiRequest<CheckEmailResponse>(`/api/auth/check-email?email=${encodedEmail}`, {method:'GET'});
}

/* 사용자 관리 */
export async function getAllUsers(): Promise<User[]>{
    return apiRequest<User[]>('/api/users', {method: 'GET'});
}
// 사용자 정보 조회
export async function getUserById(userId: string | number): Promise<User> {
    return apiRequest<User>(`/api/users/${userId}`, {method :'GET'});
}

// 사용자 정보 수정
export async function updateUser(userId : string | number, userData: UpdateUserRequest): Promise<User>{
    return apiRequest<User>(`/api/users/${userId}`, {
        method : 'PUT', 
        body: JSON.stringify(userData),
    });
}

// 사용자 정보 등록
export async function createUser(userData: CreateUserRequest): Promise<User>{
    return apiRequest<User>('/api/users',{
        method : 'POST',
        body: JSON.stringify(userData),
    })
}

/* 영수증 관리 */

export async function analyzeExpense(imageFile: File): Promise<AnalyzeExpenseResponse>{
    const url = `${API_BASE_URL}/api/expenses/analyze`;

    const formData = new FormData();
    formData.append('image', imageFile);

    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {};
    if(token){
        headers['Authorization'] = `Bearer ${token}`;
    }
    try{
        const response = await fetch(url, {
            method : 'POST', 
            headers : headers,
            body : formData, 
        });

        const data = await response.json();
        if(!response.ok){
            throw new Error(data.message || `HTTP error! status: ${response.status}`)
        }
        return data as AnalyzeExpenseResponse;
    }catch(error){
        console.error(error);
        throw error;
    }

}

// 모든 지출 내역 목록 조회

export async function getAllExpenses(options: PaginationOptions = {}): Promise<Expense[]>{
    const { page, size } = options;
    const queryParams = new URLSearchParams();
    if( page !== undefined && page !== null){
        queryParams.append('page', page.toString());
    }
    if(size !== undefined && size !== null){
        queryParams.append('size', size.toString());
    }

    const queryString = queryParams.toString();
    const url = queryString ? `/api/expenses/paged?${queryString}` : '/api/expenses';

    return apiRequest<Expense[]>(url, {method: 'GET'});

}

export async function getExpenseById(expenseId: string): Promise<Expense>{
    return apiRequest<Expense>(`/api/expenses/${expenseId}`, {method: 'GET'});
}