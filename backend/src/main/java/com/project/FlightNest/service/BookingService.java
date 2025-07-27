package com.project.FlightNest.service;

import com.project.FlightNest.entity.Booking;
import com.project.FlightNest.entity.BookingStatus;
import com.project.FlightNest.entity.Flight;
import com.project.FlightNest.repository.BookingRepository;
import com.project.FlightNest.repository.FlightRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * BookingService handles the business logic for flight bookings.
 * It provides methods to book flights, cancel bookings, and retrieve booking information.
 * 
 * Developer: C Vamsidhar Reddy
 * Created on: July 26, 2025
 */

@Service
public class BookingService {

private final BookingRepository bookingRepository;
private final FlightRepository flightRepository;

public BookingService(BookingRepository bookingRepository, FlightRepository flightRepository) {
    this.bookingRepository = bookingRepository;
    this.flightRepository = flightRepository;
}

public String bookFlight(String username, Long flightId, int seatsRequested) {
    Optional<Flight> optionalFlight = flightRepository.findById(flightId);
    if (optionalFlight.isEmpty()) {
        return "Flight not found";
    }

    Flight flight = optionalFlight.get();

    if (flight.getTotalSeats() < seatsRequested) {
        return "Not enough seats available";
    }

    // Reduce available seats
    flight.setTotalSeats(flight.getTotalSeats() - seatsRequested);
    flightRepository.save(flight);

    Booking booking = new Booking();
    booking.setUsername(username);
    booking.setFlight(flight);
    booking.setSeatsBooked(seatsRequested);
    booking.setTotalAmount(seatsRequested * flight.getPrice());
    booking.setBookingTime(LocalDateTime.now());
    booking.setStatus(BookingStatus.CONFIRMED);

    bookingRepository.save(booking);
    return "Booking confirmed";
}

public String cancelBooking(Long bookingId, String username) {
    Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);
    if (optionalBooking.isEmpty()) {
        return "Booking not found";
    }

    Booking booking = optionalBooking.get();
    if (!booking.getUsername().equals(username)) {
        return "Unauthorized to cancel this booking";
    }

    if (booking.getStatus() == BookingStatus.CANCELLED) {
        return "Booking already cancelled";
    }

    // Restore seats
    Flight flight = booking.getFlight();
    flight.setTotalSeats(flight.getTotalSeats() + booking.getSeatsBooked());
    flightRepository.save(flight);

    booking.setStatus(BookingStatus.CANCELLED);
    bookingRepository.save(booking);
    return "Booking cancelled successfully";
}

public List<Booking> getUserBookings(String username) {
    return bookingRepository.findByUsername(username);
}

public List<Booking> getAllBookings() {
    return bookingRepository.findAll();
}

public List<Booking> getBookingsByFlightId(Long flightId) {
return bookingRepository.findByFlightId(flightId);
}
}
