package com.example.todo.dto;

import java.time.LocalDateTime;

public class SignupRequest {
    private String userId;
    private String userEmail;
    private String password;
    private String userName;
    private LocalDateTime createdAt;
    
    public SignupRequest() {
    }
    
    public SignupRequest(String userId, String userEmail, String password, String userName, LocalDateTime createdAt) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.password = password;
        this.userName = userName;
        this.createdAt = createdAt;
    }
    
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
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getUserName() {
        return userName;
    }
    
    public void setUserName(String userName) {
        this.userName = userName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

