package com.example.todo.dto;

public class UpdateProfileRequest {
    private String userId;
    private String userEmail;
    private String userName;
    private String password;  // 선택사항 (비밀번호 변경 시에만)
    
    // 기본 생성자
    public UpdateProfileRequest() {
    }
    
    // 전체 생성자
    public UpdateProfileRequest(String userId, String userEmail, String userName, String password) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.userName = userName;
        this.password = password;
    }
    
    // Getters and Setters
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public String getUserEmail() {
        return userEmail;
    }
    
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
    
    public String getUserName() {
        return userName;
    }
    
    public void setUserName(String userName) {
        this.userName = userName;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
}

