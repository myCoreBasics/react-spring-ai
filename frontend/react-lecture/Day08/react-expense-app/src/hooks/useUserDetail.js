import { useState, useEffect } from 'react';
import { getUserById } from '../utils/api';

export function useUserDetail(userId, isCreateMode){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(!isCreateMode);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!isCreateMode && userId){
            loadUser();
        }
    }, [userId, isCreateMode]);

    async function loadUser(){
        try{
            setLoading(true);
            setError(null);
            const result = await getUserById(userId);
            setUser(result);
        }catch(err){
            setError(err.message || '시용자정보 불러오기 실패');
        }finally{
            setLoading(false);
        }
    }

    return {user, loading, error, refetch: loadUser};

}