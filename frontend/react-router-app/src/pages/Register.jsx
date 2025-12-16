import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

export function Register() {
  return (
        <Flex w="100%" maxW="350px" mx="auto" mt="10px">
            <Box w="100%" p={4}>
                <Heading textAlign="center" color="#90CDF4">회원가입</Heading>
                <Text textAlign="center" fontSize="12px" color="#828282" mt={2}>
                    다양한 기능을 사용하려면 회원가입을 해주세요.
                </Text>
                {/* <form onSubmit={handleSubmit}>
                    <FormControl mt={9} mb={4} isRequired>
                        <FormLabel fontSize="12px" color="#333">아이디</FormLabel>
                        <Input
                            type="text"
                            name="id"
                            placeholder="아이디를 입력하세요"
                            value={formData.id}
                            onChange={handleChange}
                            fontSize="12px"
                        />
                    </FormControl>
                    <FormControl mb={4} isRequired>
                        <FormLabel fontSize="12px" color="#333">닉네임</FormLabel>
                        <Input
                            type="text"
                            name="nickname"
                            placeholder="닉네임을 입력하세요"
                            value={formData.nickname}
                            onChange={handleChange}
                            fontSize="12px"
                        />
                    </FormControl>
                    <FormControl mb={4} isRequired isInvalid={formErrors.emailInvalid || formErrors.emailNotVerified}>
                        <FormLabel fontSize="12px" color="#333">이메일</FormLabel>
                        <HStack>
                            <Input
                                type="email"
                                name="email"
                                placeholder="이메일을 입력하세요"
                                value={formData.email}
                                onChange={handleChange}
                                fontSize="12px"
                            />
                            <Button
                                onClick={handleSendVerificationEmail}
                                variant='outline'
                                background="#FFFFFF"
                                fontWeight="normal"
                                fontSize="12px"
                                color="#333"
                            >
                                이메일 발송
                            </Button>
                        </HStack>
                        {formErrors.emailInvalid && (
                            <FormErrorMessage>이메일 형식이 올바르지 않습니다.</FormErrorMessage>
                        )}
                        {formErrors.emailNotVerified && (
                            <FormErrorMessage>이메일 인증이 필요합니다.</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl mb={4} isRequired>
                        <HStack>
                            <Input
                                type="text"
                                name="verificationCode"
                                placeholder="인증 코드를 입력하세요"
                                value={formData.verificationCode}
                                onChange={handleChange}
                                fontSize="12px"
                            />
                            <Button
                                onClick={handleVerifyCode}
                                variant='outline'
                                background="#FFFFFF"
                                fontWeight="normal"
                                fontSize="12px"
                                color="#333"
                            >
                                인증 코드 확인
                            </Button>
                        </HStack>
                    </FormControl>
                    <FormControl mb={4} isRequired isInvalid={formErrors.passwordMismatch}>
                        <FormLabel fontSize="12px" color="#333">비밀번호</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            placeholder="비밀번호를 입력하세요"
                            value={formData.password}
                            onChange={handleChange}
                            fontSize="12px"
                        />
                    </FormControl>
                    <FormControl mb={4} isRequired isInvalid={formErrors.passwordMismatch}>
                        <Input
                            type="password"
                            name="confirmPassword"
                            placeholder="비밀번호를 다시 입력하세요"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            fontSize="12px"
                        />
                        {formErrors.passwordMismatch && (
                            <FormErrorMessage>비밀번호가 일치하지 않습니다.</FormErrorMessage>
                        )}
                    </FormControl>
                    <Button
                        mt={9}
                        w="100%"
                        variant='gradient'
                        color="white"
                        fontSize="12px"
                        onClick={handleSubmit}
                    >
                        회원가입
                    </Button>
                    <Text textAlign="center" fontSize="12px" color="#4F4F4F" mt={5}>
                        이미 계정이 있으신가요? <Link to='/login' style={{ color: '#90CDF4' }}> 로그인</Link>.
                    </Text>
                </form> */}
            </Box>
        </Flex>
    );
};