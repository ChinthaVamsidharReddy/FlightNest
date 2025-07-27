package com.project.FlightNest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.FlightNest.entity.Flight;

import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
List<Flight> findBySourceAndDestination(String source, String destination);
List<Flight> findByAirlineNameContainingIgnoreCase(String airlineName);
}
