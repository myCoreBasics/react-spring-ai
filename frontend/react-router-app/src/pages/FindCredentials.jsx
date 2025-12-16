import { CloseIcon, EmailIcon, LockIcon } from "@chakra-ui/icons";
import { FormControl, FormLabel,} from "@chakra-ui/form-control";
import {
  Box,
  VStack,
  Input,
  Button,
  Flex,
  Image,
  Link,
  Text,
  Heading,
} from "@chakra-ui/react";
import {
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/input";
import { findCredentials } from '../services/authApi';
import Swal from 'sweetalert2';
import '../styles/credentials/FindCredentials.css';

export function Credentials() {
  async function handleSubmit(e){}

  return (
    <Box className="FindCredentials-container">
      <Box className="FindCredentials-card">
        <Heading className="FindCredentials-title">계정찾기</Heading>
        <Text className="FindCredentials-subtitle">
          다양한 기능을 사용하고 싶다면 로그인해주세요.
        </Text>
        <VStack 
          className="FindCredentials-form"
          as="form" 
          onSubmit={handleSubmit}
        >

        </VStack>
      </Box>
    </Box>
  );
}