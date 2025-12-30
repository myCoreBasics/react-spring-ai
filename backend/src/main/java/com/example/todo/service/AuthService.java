package com.example.todo.service;

import com.example.todo.dto.LoginRequest;
import com.example.todo.dto.LoginResponse;
import com.example.todo.dto.SignupRequest;
import com.example.todo.dto.UpdateProfileRequest;
import com.example.todo.model.User;
import com.example.todo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    public LoginResponse login(LoginRequest request) {
        Optional<User> userOptional = userRepository.findByUserId(request.getUserId());
        
        if (userOptional.isEmpty()) {
            return new LoginResponse(false, "사용자를 찾을 수 없습니다.");
        }
        
        User user = userOptional.get();
        
        // 비밀번호 확인
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new LoginResponse(false, "비밀번호가 일치하지 않습니다.");
        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = user.getCreatedAt().format(formatter);
        
        return new LoginResponse(
            true, 
            "로그인 성공",
            user.getUserId(),
            user.getUserName(),
            user.getUserEmail(),
            formattedDate
        );
    }
    
    public LoginResponse signup(SignupRequest request) {
        // 아이디 중복 확인
        if (userRepository.existsByUserId(request.getUserId())) {
            return new LoginResponse(false, "이미 존재하는 아이디입니다.");
        }
        
        // 이메일 중복 확인
        if (userRepository.existsByUserEmail(request.getUserEmail())) {
            return new LoginResponse(false, "이미 존재하는 이메일입니다.");
        }
        
        // 비밀번호 해싱
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        
        // 사용자 생성
        User user = new User(
            request.getUserId(),
            request.getUserEmail(),
            hashedPassword,
            request.getUserName()
        );

        user.setCreatedAt(LocalDateTime.now());
        
        userRepository.save(user);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = user.getCreatedAt().format(formatter);
        
        return new LoginResponse(
            true,
            "회원가입 성공",
            user.getUserId(),
            user.getUserName(),
            user.getUserEmail(),
            formattedDate  
        );
    }
    
    public LoginResponse updateProfile(UpdateProfileRequest request) {
        // 사용자 찾기
        Optional<User> userOptional = userRepository.findByUserId(request.getUserId());
        
        if (userOptional.isEmpty()) {
            return new LoginResponse(false, "사용자를 찾을 수 없습니다.");
        }
        
        User user = userOptional.get();
        
        // 이메일 변경 시 중복 확인 (현재 사용자의 이메일이 아닌 경우에만)
        if (!user.getUserEmail().equals(request.getUserEmail())) {
            if (userRepository.existsByUserEmail(request.getUserEmail())) {
                return new LoginResponse(false, "이미 사용 중인 이메일입니다.");
            }
        }
        
        // 정보 업데이트
        user.setUserEmail(request.getUserEmail());
        user.setUserName(request.getUserName());
        
        // 비밀번호가 제공된 경우에만 업데이트
        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            String hashedPassword = passwordEncoder.encode(request.getPassword());
            user.setPassword(hashedPassword);
        }
        
        userRepository.save(user);
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = user.getCreatedAt().format(formatter);
        
        return new LoginResponse(
            true,
            "회원정보가 성공적으로 수정되었습니다.",
            user.getUserId(),
            user.getUserName(),
            user.getUserEmail(),
            formattedDate
        );
    }
}

