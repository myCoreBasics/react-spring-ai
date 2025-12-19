import { Box, VStack, Text, HStack } from '@chakra-ui/react';
import { EmailIcon, AtSignIcon, CalendarIcon } from '@chakra-ui/icons';

// 사용자 아이콘 SVG 컴포넌트
function UserIcon({ color = "#BDBDBD", size = "20px" }) {
  const iconColor = color;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
        fill={iconColor}
      />
      <path
        d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z"
        fill={iconColor}
      />
    </svg>
  );
}

export function ProfileInfo({ user }) {
  return (
    <VStack spacing={4} align="stretch" className="profile-info">
      <Box className="profile-info-item">
        <HStack spacing={3}>
          <AtSignIcon color="#BDBDBD" />
          <Text color="black" minW="100px">
            아이디
          </Text>
          <Text color="black">{user?.userId || '-'}</Text>
        </HStack>
      </Box>

      <Box className="profile-info-item">
        <HStack spacing={3}>
          <EmailIcon color="#BDBDBD" />
          <Text color="black" minW="100px">
            이메일
          </Text>
          <Text color="black">{user?.userEmail || '-'}</Text>
        </HStack>
      </Box>

      <Box className="profile-info-item">
        <HStack spacing={3}>
          <UserIcon color="#BDBDBD" />
          <Text color="black" minW="100px">
            이름
          </Text>
          <Text color="black">{user?.userName || '-'}</Text>
        </HStack>
      </Box>

      {user?.createdAt && (
        <Box className="profile-info-item">
          <HStack spacing={3}>
            <CalendarIcon color="#BDBDBD" />
            <Text color="black" minW="100px">
              가입일
            </Text>
            <Text color="black">{user.createdAt}</Text>
          </HStack>
        </Box>
      )}
    </VStack>
  );
}