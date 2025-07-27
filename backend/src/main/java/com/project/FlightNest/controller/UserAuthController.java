package com.project.FlightNest.controller;


import com.project.FlightNest.dto.AuthRequest;
import com.project.FlightNest.dto.AuthResponse;
import com.project.FlightNest.dto.RegisterRequest;
import com.project.FlightNest.entity.Role;
import com.project.FlightNest.security.AuthenticationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
/**
 * UserAuthController manages authentication endpoints for general users.
 * It provides dedicated APIs for user registration and login under /api/v1/auth/user.
 * During registration, the role is explicitly assigned as USER before processing.
 *
 * The controller forwards authentication logic to AuthenticationService.
 *
 * Developer: C Vamsidhar Reddy
 * Created on: July 26, 2025  
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/auth/user")
public class UserAuthController {

    private final AuthenticationService authService;

    public UserAuthController(AuthenticationService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        request.setRole(Role.USER);
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
