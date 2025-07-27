package com.project.FlightNest.dto;
/**
 * AuthResponse is a Data Transfer Object used to send authentication results.
 * It contains a message (e.g., success or error) and a JWT token upon successful login.
 *
 * This DTO is returned by authentication endpoints for USER, ADMIN, and FLIGHT_OWNER roles.
 *
 * Developer: C Vamsidhar Reddy
 * Created on: July 26, 2025  
 */

public class AuthResponse {
    private String message;
    private String token;

    public AuthResponse() {
    }

    public AuthResponse(String message, String token) {
        this.message = message;
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public String getToken() {
        return token;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
