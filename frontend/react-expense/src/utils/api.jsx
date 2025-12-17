const API_BASE_URL = 'http://13.220.93.143:8080';

async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };
    
    const token = localStorage.getItem('token')
    if(token){
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config = {
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

export async function signup(userInfo) {
    console.log(userInfo)

    return apiRequest('/api/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userInfo),
    });
}

export async function login(credentials) {
    return apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
}

export async function checkEmail(email){
    const encodedEmail = encodeURIComponent(email);
    return apiRequest(`/api/auth/check-email?email=${encodedEmail}`, {method:'GET'});
}

/* 사용자 관리 */
export async function getAllUsers(){
    return apiRequest('/api/users', {method: 'GET'});
}

/* 사용자 정보 조회 */
export async function getUserById(userId){
    return apiRequest(`/api/users/${userId}`, {method :'GET'});
}

/* 사용자 정보 수정 */
export async function updateUser(userId, userData){
    return apiRequest(`/api/users/${userId}`, {
        method : 'PUT', 
        body: JSON.stringify(userData),
    });
}

/* 사용자 정보 등록 */
export async function createUser(userData){
    return apiRequest('/api/users', {
        method : 'POST',
        body: JSON.stringify(userData),
    })
}

/* 영수증 관리 */
export async function analyzeExpense(imageFile){
  const url = `${API_BASE_URL}/api/expenses/analyze`;
  const formData = new FormData();
  formData.append('image', imageFile);
  const token = localStorage.getItem('token');
  const headers = {};
  if(token){
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: formData
    });

    const data = await response.json();
    if(!response.ok){
      throw new Error(data.message || `HTTP error! status: ${response.status}`)
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/* 모든 지출 내역 목록 조회 */
export async function getAllExpenses(){
  return apiRequest('/api/expenses', {method : 'GET'})
}

/* 모든 지출 내역 */
export async function getExpenseById(expenseId){
  return apiRequest(`/api/expenses/${expenseId}`, {method : 'GET'})
}