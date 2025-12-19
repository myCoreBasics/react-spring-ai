package com.example.todo.controller;

import com.example.todo.dto.LoginRequest;
import com.example.todo.dto.LoginResponse;
import com.example.todo.dto.SignupRequest;
import com.example.todo.dto.UpdateProfileRequest;
import com.example.todo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    // 로그인
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        // 입력 검증
        if (request.getUserId() == null || request.getUserId().isEmpty()) {
            return ResponseEntity.badRequest()
                .body(new LoginResponse(false, "아이디를 입력해주세요."));
        }
        
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            return ResponseEntity.badRequest()
                .body(new LoginResponse(false, "비밀번호를 입력해주세요."));
        }
        
        LoginResponse response = authService.login(request);
        
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
    
    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<LoginResponse> signup(@RequestBody SignupRequest request) {
        // 입력 검증
        if (request.getUserId() == null || request.getUserId().isEmpty()) {
            return ResponseEntity.badRequest()
                .body(new LoginResponse(false, "아이디를 입력해주세요."));
        }
        
        if (request.getUserEmail() == null || request.getUserEmail().isEmpty()) {
            return ResponseEntity.badRequest()
                .body(new LoginResponse(false, "이메일을 입력해주세요."));
        }
        
        if (request.getPassword() == null || request.getPassword().isEmpty()) {
            return ResponseEntity.badRequest()
                .body(new LoginResponse(false, "비밀번호를 입력해주세요."));
        }
        
        if (request.getUserName() == null || request.getUserName().isEmpty()) {
            return ResponseEntity.badRequest()
                .body(new LoginResponse(false, "이름을 입력해주세요."));
        }
        
        LoginResponse response = authService.signup(request);
        
        if (response.isSuccess()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    
    // 로그아웃 (클라이언트에서 처리하므로 단순 응답)
    @PostMapping("/logout")
    public ResponseEntity<LoginResponse> logout() {
        return ResponseEntity.ok(new LoginResponse(true, "로그아웃 성공"));
    }
    
    // 회원정보 수정
    @PutMapping("/profile")
    public ResponseEntity<LoginResponse> updateProfile(@RequestBody UpdateProfileRequest request) {
        // 입력 검증
        if (request.getUserId() == null || request.getUserId().isEmpty()) {
            return ResponseEntity.badRequest()
                .body(new LoginResponse(false, "아이디를 입력해주세요."));
        }
        
        if (request.getUserEmail() == null || request.getUserEmail().isEmpty()) {
            return ResponseEntity.badRequest()
                .body(new LoginResponse(false, "이메일을 입력해주세요."));
        }
        
        if (request.getUserName() == null || request.getUserName().isEmpty()) {
            return ResponseEntity.badRequest()
                .body(new LoginResponse(false, "이름을 입력해주세요."));
        }
        
        LoginResponse response = authService.updateProfile(request);
        
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
}

