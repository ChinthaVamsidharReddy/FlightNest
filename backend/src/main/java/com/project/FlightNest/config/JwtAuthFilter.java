package com.project.FlightNest.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.project.FlightNest.security.JwtUtil;
import com.project.FlightNest.security.UserDetailsServiceImpl;

import java.io.IOException;


/**
 * JwtAuthFilter is a filter that processes incoming requests to validate JWT tokens.
 * It checks the Authorization header for a valid token and sets the authentication
 * in the SecurityContext if the token is valid.
 * 
 * Developer: C Vamsidhar Reddy
 * Created on: July 26, 2025
 */
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImpl userDetailsService;

    public JwtAuthFilter(JwtUtil jwtUtil, UserDetailsServiceImpl userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

    	

        String path = request.getServletPath();
        if (
        		path.equals("/api/v1/auth/user/register") ||
        		path.equals("/api/v1/auth/user/login") ||
        		path.equals("/api/v1/auth/admin/register") ||
        		path.equals("/api/v1/auth/admin/login") ||
        		path.equals("/api/v1/auth/owner/register") ||
        		path.equals("/api/v1/auth/owner/login") ||
        		path.startsWith("/swagger-ui") ||
        		path.startsWith("/v3/api-docs") ||
        		path.startsWith("/swagger-resources") ||
        		path.startsWith("/webjars")||
        		path.equals("/swagger-ui.html")
        		) {
        		filterChain.doFilter(request, response);
        		return;
        		}

        final String authHeader = request.getHeader("Authorization");
        final String token;
        final String username;

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        token = authHeader.substring(7);
        

        username = jwtUtil.extractUsername(token);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (jwtUtil.validateToken(token)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                SecurityContextHolder.getContext().setAuthentication(authToken);
                System.out.println("Set authentication for user: " + username);
            }
        }

        filterChain.doFilter(request, response);
    }
}
