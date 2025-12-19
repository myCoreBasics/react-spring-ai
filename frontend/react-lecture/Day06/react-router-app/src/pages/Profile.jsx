import { useState, useEffect } from 'react';
import { Box, Alert, AlertIcon } from '@chakra-ui/react';
import { ProfileHeader } from '../components/Profile/ProfileHeader';
import { ProfileInfo } from '../components/Profile/ProfileInfo';
import { ProfileEditForm } from '../components/Profile/ProfileEditForm';
import { updateUserProfile } from '../services/authApi';
import Swal from 'sweetalert2';
import '../styles/Profile.css';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // localStorage에서 사용자 정보 가져오기
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    if (userId) {
      setUser({
        userId,
        userName: userName || '',
        userEmail: userEmail || '',
      });
    }
  }, []);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  async function handleSubmit(updateData) {
    setIsLoading(true);
    try {
      // userId를 포함하여 요청
      const requestData = {
        userId: user.userId,
        ...updateData
      };
      const response = await updateUserProfile(requestData);
      
      if (response.data && response.data.success) {
        // localStorage 업데이트
        if (updateData.userName) {
          localStorage.setItem('userName', updateData.userName);
        }
        if (updateData.userEmail) {
          localStorage.setItem('userEmail', updateData.userEmail);
        }

        // 사용자 정보 업데이트
        setUser((prev) => ({
          ...prev,
          ...updateData,
        }));

        setIsEditing(false);

        Swal.fire({
          icon: 'success',
          title: '수정 완료!',
          text: '회원정보가 성공적으로 수정되었습니다.',
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        throw new Error(response.data?.message || '수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('회원정보 수정 오류:', error);
      const errorMessage = error.response?.data?.message || '회원정보 수정 중 오류가 발생했습니다.';
      Swal.fire({
        icon: 'error',
        title: '수정 실패',
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (!user) {
    return (
      <Box className="profile-container">
        <div className="profile-wrapper">
          <Alert status="warning">
            <AlertIcon />
            로그인이 필요합니다.
          </Alert>
        </div>
      </Box>
    );
  }

  return (
    <Box className="profile-container">
      <div className="profile-wrapper">
        <Box className="profile-card">
          <ProfileHeader
            isEditing={isEditing}
            onEdit={handleEdit}
            onCancel={handleCancel}
          />

          {isEditing ? (
            <ProfileEditForm
              user={user}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isLoading}
            />
          ) : (
            <ProfileInfo user={user} />
          )}
        </Box>
      </div>
    </Box>
  );
}
