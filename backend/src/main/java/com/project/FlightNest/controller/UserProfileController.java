package com.project.FlightNest.controller;

import org.springframework.security.core.Authentication;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.FlightNest.entity.User;
import com.project.FlightNest.repository.UserRepository;
/**
 * UserProfileController provides endpoints for authenticated users to manage their profile.
 * It includes functionality to:
 * Retrieve the current user's profile (/me)
 * Update user profile details (/update)
 *
 * Access to profile update is restricted to users with the USER role.
 * The controller directly interacts with UserRepository for data access.
 *
 * Developer: C Vamsidhar Reddy
 * Created on: July 26, 2025  
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/users")
public class UserProfileController {

private final UserRepository userRepository;

public UserProfileController(UserRepository userRepository) {
    this.userRepository = userRepository;
}

@GetMapping("/me")
//@PreAuthorize("hasRole('USER')")
public ResponseEntity<User> getMyProfile(Authentication auth) {
    String username = auth.getName();
    return userRepository.findByUsername(username)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}

@PutMapping("/update")
@PreAuthorize("hasAnyRole('USER', 'ADMIN', 'FLIGHT_OWNER')")
public ResponseEntity<String> updateProfile(@RequestBody User updatedData,
                                            Authentication auth) {
    String username = auth.getName();
    User user = userRepository.findByUsername(username).orElse(null);

    if (user == null) return ResponseEntity.notFound().build();

    user.setFullName(updatedData.getFullName());
    user.setPhone(updatedData.getPhone());
    user.setAddress(updatedData.getAddress());
    user.setGender(updatedData.getGender());
    user.setDateOfBirth(updatedData.getDateOfBirth());
    user.setCountry(updatedData.getCountry());

    userRepository.save(user);
    return ResponseEntity.ok("Profile updated successfully");
}
}