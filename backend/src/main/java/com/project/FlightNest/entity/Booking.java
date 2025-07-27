package com.project.FlightNest.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
public class Booking {


@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String username; 

@ManyToOne
@JoinColumn(name = "flight_id")
private Flight flight;

@OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
private List<Passenger> passengers;


private int seatsBooked;
private double totalAmount;

private LocalDateTime bookingTime;



public Long getId() {
	return id;
}



public void setId(Long id) {
	this.id = id;
}



public String getUsername() {
	return username;
}



public void setUsername(String username) {
	this.username = username;
}



public Flight getFlight() {
	return flight;
}



public void setFlight(Flight flight) {
	this.flight = flight;
}



public int getSeatsBooked() {
	return seatsBooked;
}



public void setSeatsBooked(int seatsBooked) {
	this.seatsBooked = seatsBooked;
}



public double getTotalAmount() {
	return totalAmount;
}



public void setTotalAmount(double totalAmount) {
	this.totalAmount = totalAmount;
}



public LocalDateTime getBookingTime() {
	return bookingTime;
}



public void setBookingTime(LocalDateTime bookingTime) {
	this.bookingTime = bookingTime;
}



public BookingStatus getStatus() {
	return status;
}



public void setStatus(BookingStatus status) {
	this.status = status;
}



@Enumerated(EnumType.STRING)
private BookingStatus status;
}