package com.project.FlightNest.security;

import com.project.FlightNest.dto.AuthRequest;
import com.project.FlightNest.dto.AuthResponse;
import com.project.FlightNest.dto.RegisterRequest;
import com.project.FlightNest.entity.User;
import com.project.FlightNest.repository.UserRepository;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * AuthenticationService handles user authentication and registration.
 * It provides methods for user registration and login, including token generation.
 * 
 * Developer: C Vamsidhar Reddy
 * Created on: July 26, 2025
 */
@Service
public class AuthenticationService {

private final UserRepository userRepository;
private final AuthenticationManager authManager;
private final PasswordEncoder passwordEncoder;
private final JwtUtil jwtUtil;

public AuthenticationService(UserRepository userRepository,
                             AuthenticationManager authManager,
                             PasswordEncoder passwordEncoder,
                             JwtUtil jwtUtil) {
    this.userRepository = userRepository;
    this.authManager = authManager;
    this.passwordEncoder = passwordEncoder;
    this.jwtUtil = jwtUtil;
}

public AuthResponse register(RegisterRequest request) {
    if (userRepository.existsByUsername(request.getUsername())) {
        return new AuthResponse("Username already exists", null);
    }

    if (userRepository.existsByEmail(request.getEmail())) {
        return new AuthResponse("Email already in use", null);
    }

    User user = new User();
    user.setUsername(request.getUsername());
    user.setPassword(passwordEncoder.encode(request.getPassword()));
    user.setEmail(request.getEmail());
    user.setRole(request.getRole());
    user.setFullName(request.getFullName());
    user.setPhone(request.getPhone());
    user.setAddress(request.getAddress());
    user.setGender(request.getGender());
    user.setDateOfBirth(request.getDateOfBirth());
    user.setCountry(request.getCountry());

    userRepository.save(user);

    String token = jwtUtil.generateToken(user.getUsername());

    return new AuthResponse("User registered successfully", token);
}

public AuthResponse login(AuthRequest request) {
    try {
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword()
            )
        );
    } catch (AuthenticationException e) {
        return new AuthResponse("Invalid username or password", null);
    }

    User user = userRepository.findByUsername(request.getUsername())
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    String token = jwtUtil.generateToken(user.getUsername());

    return new AuthResponse("Login successful", token);
}
}