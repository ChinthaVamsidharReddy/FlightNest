package com.project.FlightNest.controller;

import com.project.FlightNest.dto.AuthRequest;
import com.project.FlightNest.dto.AuthResponse;
import com.project.FlightNest.dto.RegisterRequest;
import com.project.FlightNest.entity.Role;
import com.project.FlightNest.security.AuthenticationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
/**
 * FlightOwnerAuthController handles authentication endpoints for Flight Owners.
 * It provides separate registration and login APIs under /api/v1/auth/owner.
 * During registration, the role is explicitly set to FLIGHT_OWNER before processing.
 *
 * The controller delegates all authentication logic to AuthenticationService.
 *
 * Developer: N Lohith Reddy  
 * Created on: May 29, 2025  
 * Last Modified: May 30, 2025  
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/auth/owner")
public class FlightOwnerAuthController {

    private final AuthenticationService authService;

    public FlightOwnerAuthController(AuthenticationService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        request.setRole(Role.FLIGHT_OWNER);
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
}
