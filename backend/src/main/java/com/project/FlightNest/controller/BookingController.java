package com.project.FlightNest.controller;

import com.project.FlightNest.dto.BookFlightRequest;
import com.project.FlightNest.entity.Booking;
import com.project.FlightNest.service.BookingService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


/**
 * BookingController exposes endpoints to handle flight booking operations.
 * It provides role-based access control for booking creation, cancellation,
 * and viewing bookings depending on the user's role (USER, ADMIN, FLIGHT_OWNER).
 *
 * USERs can:
 * Book a flight
 * Cancel their booking
 * View their own bookings
 *
 * ADMINs and FLIGHT_OWNERs can:
 * View all bookings
 * View bookings by flight ID
 *
 * Developer: C Vamsidhar Reddy
 * Created on: July 26, 2025   
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/bookings")
public class BookingController {


private final BookingService bookingService;

public BookingController(BookingService bookingService) {
    this.bookingService = bookingService;
}

// Book a flight (USER only)
@PostMapping("/book")
@PreAuthorize("hasRole('USER')")
public ResponseEntity<Map<String, String>> bookFlight(@RequestBody BookFlightRequest request,
Authentication authentication) {
String username = authentication.getName();
String result = bookingService.bookFlight(username, request.getFlightId(), request.getSeats());
return ResponseEntity.ok(Map.of("message", "Flight booked successfully!"));
}


// Cancel a booking (USER only)
@PutMapping("/cancel/{id}")
@PreAuthorize("hasRole('USER')")
public ResponseEntity<String> cancelBooking(@PathVariable Long id,
                                            Authentication authentication) {
    String username = authentication.getName();
    String result = bookingService.cancelBooking(id, username);
    return ResponseEntity.ok(result);
}

// View own bookings (USER only)
@GetMapping("/my")
@PreAuthorize("hasRole('USER')")
public ResponseEntity<List<Booking>> getUserBookings(Authentication authentication) {
    String username = authentication.getName();
    return ResponseEntity.ok(bookingService.getUserBookings(username));
}

// View all bookings (ADMIN or OWNER)
@GetMapping("/all")
@PreAuthorize("hasRole('ADMIN') or hasRole('FLIGHT_OWNER')")
public ResponseEntity<List<Booking>> getAllBookings() {
    return ResponseEntity.ok(bookingService.getAllBookings());
}

@GetMapping("/flight/{flightId}")
@PreAuthorize("hasRole('ADMIN') or hasRole('FLIGHT_OWNER')")
public ResponseEntity<List<Booking>> getBookingsByFlight(@PathVariable Long flightId) {
return ResponseEntity.ok(bookingService.getBookingsByFlightId(flightId));
}
}