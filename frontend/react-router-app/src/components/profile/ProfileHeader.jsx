import { Heading, Box } from '@chakra-ui/react';
import '../../styles/profile/ProfileHeader.css';
import { EditIcon, CloseIcon } from '@chakra-ui/icons';

export function ProfileHeader({ isEditing, onEdit, onCancel }) {
  return (
    <Box className="profile-header">
      <Heading size="lg" className="profile-title">
        회원정보
      </Heading>
      {!isEditing ? (
        <Box
          as="button"
          className="profile-nav-button"
          onClick={onEdit}
        >
          <EditIcon />
          <span>수정</span>
        </Box>
      ) : (
        <Box
          as="button"
          className="profile-nav-button"
          onClick={onCancel}
        >
          <CloseIcon />
          <span>취소</span>
        </Box>
      )}
    </Box>
  );
}

