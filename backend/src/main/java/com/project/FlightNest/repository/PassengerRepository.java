package com.project.FlightNest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.FlightNest.entity.Passenger;

public interface PassengerRepository extends JpaRepository<Passenger, Long> {} 