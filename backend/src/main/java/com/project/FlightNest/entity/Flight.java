package com.project.FlightNest.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "flights")
@Getter
@Setter
@NoArgsConstructor
public class Flight {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String airlineName;
private String flightNumber;

private String source;
private String destination;

private LocalDateTime departureTime;
private LocalDateTime arrivalTime;

private int totalSeats;
private double price;


public Long getId() {
	return id;
}



public void setId(Long id) {
	this.id = id;
}



public String getAirlineName() {
	return airlineName;
}



public void setAirlineName(String airlineName) {
	this.airlineName = airlineName;
}



public String getFlightNumber() {
	return flightNumber;
}



public void setFlightNumber(String flightNumber) {
	this.flightNumber = flightNumber;
}



public String getSource() {
	return source;
}



public void setSource(String source) {
	this.source = source;
}



public String getDestination() {
	return destination;
}



public void setDestination(String destination) {
	this.destination = destination;
}



public LocalDateTime getDepartureTime() {
	return departureTime;
}



public void setDepartureTime(LocalDateTime departureTime) {
	this.departureTime = departureTime;
}



public LocalDateTime getArrivalTime() {
	return arrivalTime;
}



public void setArrivalTime(LocalDateTime arrivalTime) {
	this.arrivalTime = arrivalTime;
}



public int getTotalSeats() {
	return totalSeats;
}



public void setTotalSeats(int totalSeats) {
	this.totalSeats = totalSeats;
}



public double getPrice() {
	return price;
}



public void setPrice(double price) {
	this.price = price;
}



public FlightStatus getStatus() {
	return status;
}



public void setStatus(FlightStatus status) {
	this.status = status;
}



@Enumerated(EnumType.STRING)
private FlightStatus status;
}