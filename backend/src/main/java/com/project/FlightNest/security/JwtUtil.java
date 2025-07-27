package com.project.FlightNest.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

/**
 * JwtUtil is a utility class for handling JSON Web Tokens (JWT).
 * It provides methods to generate, extract, and validate JWTs.
 * 
 * Developer: C Vamsidhar Reddy
 * Created on: July 26, 2025
 */
@Component
public class JwtUtil {

@Value("${jwt.secret}")
private String jwtSecret;

@Value("${jwt.expiration}")
private long jwtExpiration;

private Key getSigningKey() {
    return Keys.hmacShaKeyFor(jwtSecret.getBytes());
}

public String generateToken(String username) {
    Date now = new Date();
    Date expiry = new Date(now.getTime() + jwtExpiration);
    
    String token = Jwts.builder()
            .setSubject(username)
            .setIssuedAt(now)
            .setExpiration(expiry)
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();


    return token;
}

public String extractUsername(String token) {
    return Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
}

public boolean validateToken(String token) {
    try {
        extractUsername(token); // will throw if invalid
        return true;
    } catch (JwtException | IllegalArgumentException e) {
        return false;
    }
}
}