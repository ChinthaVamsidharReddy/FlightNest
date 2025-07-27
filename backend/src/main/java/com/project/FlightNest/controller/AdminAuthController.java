package com.project.FlightNest.controller;

import com.project.FlightNest.dto.AuthRequest;
import com.project.FlightNest.dto.AuthResponse;
import com.project.FlightNest.dto.RegisterRequest;
import com.project.FlightNest.entity.Role;
import com.project.FlightNest.security.AuthenticationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * AdminAuthController handles authentication endpoints specific to Admin users.
 * It provides separate registration and login APIs for admins under /api/v1/auth/admin.
 * Internally, it sets the role to ADMIN during registration and delegates logic to AuthenticationService.
 * 
 * Developer: C Vamsidhar Reddy
 * Created on: July 26, 2025  
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/auth/admin")
public class AdminAuthController {

    private final AuthenticationService authService;

    public AdminAuthController(AuthenticationService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        request.setRole(Role.ADMIN);
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
