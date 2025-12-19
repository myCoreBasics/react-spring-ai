package com.example.todo.dto;

public class LoginResponse {
    private boolean success;
    private String message;
    private String userId;
    private String userName;
    private String userEmail;
    
    public LoginResponse() {
    }
    
    public LoginResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
    
    public LoginResponse(boolean success, String message, String userId, String userName, String userEmail) {
        this.success = success;
        this.message = message;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
    }
    
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public String getUserName() {
        return userName;
    }
    
    public void setUserName(String userName) {
        this.userName = userName;
    }
    
    public String getUserEmail() {
        return userEmail;
    }
    
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}

