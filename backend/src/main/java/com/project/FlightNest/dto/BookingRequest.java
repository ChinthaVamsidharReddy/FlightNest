package com.project.FlightNest.dto;

import java.time.LocalDate;
import java.util.List;
/**
 * BookingRequest is a Data Transfer Object used to capture details required for booking a flight.
 * It includes the flight ID, booking date, and a list of passengers.
 *
 * This DTO is typically used in booking endpoints to process multi-passenger bookings.
 *
 * Developer: C Vamsidhar Reddy
 * Created on: July 26, 2025  
 */

public class BookingRequest {

private Long flightId;
private LocalDate bookingDate;
private List<PassengerDTO> passengers;

// Getters and Setters

public Long getFlightId() {
    return flightId;
}

public void setFlightId(Long flightId) {
    this.flightId = flightId;
}

public LocalDate getBookingDate() {
    return bookingDate;
}

public void setBookingDate(LocalDate bookingDate) {
    this.bookingDate = bookingDate;
}

public List<PassengerDTO> getPassengers() {
    return passengers;
}

public void setPassengers(List<PassengerDTO> passengers) {
    this.passengers = passengers;
}
}