package com.project.FlightNest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.FlightNest.entity.Booking;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
List<Booking> findByUsername(String username);
List<Booking> findByFlightId(Long flightId);
}