import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html'
})
export class OwnerComponent implements OnInit {
  profile: any;
  profileForm!: FormGroup;
  editMode = false;

  flights: any[] = [];
  filteredFlights: any[] = [];

  filters = {
    name: '',
    departureDate: '',
    source: '',
    destination: '',
    airlineName: ''
  };

  flightForm!: FormGroup;
  bookings: any[] = [];
  selectedFlightId: number | null = null;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const role = this.authService.getRole();
    const token = localStorage.getItem('token');

    if (!token || role !== 'FLIGHT_OWNER') {
      alert('Access denied. Flight Owners only!');
      this.router.navigate(['/login-owner']);
      return;
    }

    this.loadProfile();
    this.loadFlights();
    this.initFlightForm();
  }

  getAuthHeaders() {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
  }

  loadProfile() {
    this.http.get('http://localhost:8080/api/v1/users/me', {
      headers: this.getAuthHeaders()
    }).subscribe((data: any) => {
      this.profile = data;
      this.profileForm = this.fb.group({
        fullName: [data.fullName, Validators.required],
        phone: [data.phone, Validators.required],
        address: [data.address, Validators.required],
        gender: [data.gender, Validators.required],
        dateOfBirth: [data.dateOfBirth, Validators.required],
        country: [data.country, Validators.required]
      });
    });
  }

  enableEdit() {
    this.editMode = true;
    this.profileForm.patchValue(this.profile);
  }

  cancelEdit() {
    this.editMode = false;
    this.profileForm.patchValue(this.profile);
  }

  saveProfile() {
    if (this.profileForm.invalid) return;

    this.http.put('http://localhost:8080/api/v1/users/update', this.profileForm.value, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    }).subscribe({
      next: () => {
        alert('Profile updated!');
        this.editMode = false;
        this.loadProfile();
      },
      error: (err) => {
        console.error('Profile update error:', err);
        alert('Profile update failed');
      }
    });
  }

  initFlightForm() {
    this.flightForm = this.fb.group({
      flightNumber: ['', Validators.required],
      source: ['', Validators.required],
      destination: ['', Validators.required],
      departureTime: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      totalSeats: [0, Validators.required],
      availableSeats: [0, Validators.required],
      price: [0, Validators.required],
      airlineName: ['', Validators.required]
    });
  }

  minDate = new Date().toISOString().slice(0, 10);

  loadFlights() {
    this.http.get<any[]>('http://localhost:8080/api/v1/flights/all', {
      headers: this.getAuthHeaders()
    }).subscribe(data => {
      this.flights = data;
      this.filteredFlights = [...this.flights];
    });
  }

  applyFilters() {
    this.filteredFlights = this.flights.filter(flight => {
      const matchesName =
        this.filters.name.trim() === '' ||
        flight.flightNumber.toLowerCase().includes(this.filters.name.trim().toLowerCase());

      const matchesDate =
        this.filters.departureDate === '' ||
        (flight.departureTime && flight.departureTime.startsWith(this.filters.departureDate));

      const matchesSource =
        this.filters.source.trim() === '' ||
        flight.source.toLowerCase().includes(this.filters.source.trim().toLowerCase());

      const matchesDestination =
        this.filters.destination.trim() === '' ||
        flight.destination.toLowerCase().includes(this.filters.destination.trim().toLowerCase());

      const matchesAirline =
        this.filters.airlineName.trim() === '' ||
        flight.airlineName.toLowerCase().includes(this.filters.airlineName.trim().toLowerCase());

      return (
        matchesName &&
        matchesDate &&
        matchesSource &&
        matchesDestination &&
        matchesAirline
      );
    });
  }

  clearFilters() {
    this.filters = {
      name: '',
      departureDate: '',
      source: '',
      destination: '',
      airlineName: ''
    };
    this.filteredFlights = [...this.flights];
  }

  addFlight() {
  if (this.flightForm.invalid) return;

  const rawDeparture = this.flightForm.value.departureTime;
  const departureDate = new Date(rawDeparture);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (departureDate < today) {
    alert('You cannot select a past date for flight departure.');
    return;
  }

  // Format to "yyyy-MM-ddTHH:mm:ss"
  const formattedDepartureTime = rawDeparture.length === 16
    ? rawDeparture + ':00' // e.g., "2025-07-27T14:30" → "2025-07-27T14:30:00"
    : rawDeparture;

  const payload = {
    ...this.flightForm.value,
    departureTime: formattedDepartureTime
  };

  this.http.post('http://localhost:8080/api/v1/flights/add', payload, {
    headers: this.getAuthHeaders()
  }).subscribe(() => {
    alert('Flight added successfully');
    this.flightForm.reset();
    this.loadFlights();
  }, () => {
    alert('Failed to add flight');
  });
}


  deleteFlight(id: number) {
    if (!confirm('Are you sure you want to delete this flight?')) return;

    this.http.delete(`http://localhost:8080/api/v1/flights/${id}`, {
      headers: this.getAuthHeaders()
    }).subscribe(() => {
      alert('Flight deleted');
      this.loadFlights();
      this.bookings = [];
    }, () => {
      alert('Failed to delete flight');
    });
  }

  viewBookings(flightId: number) {
    this.selectedFlightId = flightId;

    this.http.get<any[]>(`http://localhost:8080/api/v1/bookings/flight/${flightId}`, {
      headers: this.getAuthHeaders()
    }).subscribe(data => {
      this.bookings = data;
    }, () => {
      alert('Failed to load bookings');
    });
  }

  logout() {
    this.authService.logout();
  }
}
