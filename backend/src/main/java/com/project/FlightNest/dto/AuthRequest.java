package com.project.FlightNest.dto;

import lombok.*;
/**
 * AuthRequest is a Data Transfer Object used for capturing login credentials.
 * It contains the username and password submitted by the client during authentication.
 *
 * This DTO is used in the login endpoints for USER, ADMIN, and FLIGHT_OWNER roles.
 *
 * Developer: C Vamsidhar Reddy
 * Created on: July 26, 2025  
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {
    private String username;
    private String password;
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}

