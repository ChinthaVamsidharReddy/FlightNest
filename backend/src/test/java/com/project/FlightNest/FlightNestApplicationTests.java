package com.project.FlightNest;

import com.project.FlightNest.entity.Flight;
import com.project.FlightNest.repository.FlightRepository;
import com.project.FlightNest.service.FlightService;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class FlightNestApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void testAddFlight() {
		FlightRepository flightRepository = mock(FlightRepository.class);
		FlightService flightService = new FlightService(flightRepository);

		Flight flight = new Flight();
		flight.setAirlineName("IndiGo");

		when(flightRepository.save(flight)).thenReturn(flight);

		Flight result = flightService.addFlight(flight);
		assertEquals("IndiGo", result.getAirlineName());
	}

	@Test
	void testGetFlightById() {
		FlightRepository flightRepository = mock(FlightRepository.class);
		FlightService flightService = new FlightService(flightRepository);

		Flight flight = new Flight();
		flight.setId(1L);

		when(flightRepository.findById(1L)).thenReturn(Optional.of(flight));

		Optional<Flight> result = flightService.getFlightById(1L);
		assertTrue(result.isPresent());
		assertEquals(1L, result.get().getId());
	}

	@Test
	void testGetAllFlights() {
		FlightRepository flightRepository = mock(FlightRepository.class);
		FlightService flightService = new FlightService(flightRepository);

		when(flightRepository.findAll()).thenReturn(List.of(new Flight(), new Flight()));

		List<Flight> flights = flightService.getAllFlights();
		assertEquals(2, flights.size());
	}
}
