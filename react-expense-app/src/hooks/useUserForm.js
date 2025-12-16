import { useState, useEffect } from 'react';
import { createUser, updateUser} from '../utils/api'

export function useUserForm(initialData, isCreateMode, userId, onSuccess){

    const [formData, setFormData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(()=>{
        if(initialData){
            setFormData(initialData);
        }
    }, [initialData, isCreateMode]);

    function handleChange(e){
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        setError(null);
        setSuccess(false);
    }

    function resetForm(originalData){
        if (originalData){
            setFormData({
                name: originalData.name,
                email : originalData.email,
                password: '',
                 role: originalData.role || '일반사용자',
                status: originalData.status || '활성',
            });
        }else{
            setFormData({
                name: '',
                email: '',
                password: '',
                role: '일반사용자',
                status: '활성',
            })
        }
        setError(null);
        setSuccess(false);
    }

    async function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        setError(null);
        // 유효성 검사

        try{
            if(isCreateMode){
                const newUser = await createUser({
                    email: formData.email,
                    name: formData.name,
                    password: formData.password,
                    role: formData.role,
                    status: formData.status,
                });
                
                setSuccess(true);
                if(onSuccess){
                    onSuccess(newUser);
                }
            }else{
                const updatedUser = await updateUser(parseInt(userId), {
                    name: formData.name,
                    email: formData.email,
                    role: formData.role,
                    status: formData.status,
                });
                setSuccess(true);  
                if(onSuccess){
                    onSuccess(updatedUser)
                }

                setTimeout(() =>{
                    setSuccess(false);
                }, 3000);
            }
        }catch(error){
            setError(error.message || (isCreateMode ? '사용자 등록이 실패' : '사용자 정보 수정이 실패'));
        }finally{
            setLoading(false);
        }
    }

    return {
        formData, loading, error, success, handleChange, handleSubmit, resetForm,
    };
}