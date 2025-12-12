package com.example.todo.dto;

public class SignupRequest {
    private String userId;
    private String userEmail;
    private String password;
    private String userName;
    
    public SignupRequest() {
    }
    
    public SignupRequest(String userId, String userEmail, String password, String userName) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.password = password;
        this.userName = userName;
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
}

