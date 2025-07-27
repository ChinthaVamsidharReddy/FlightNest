import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/booking.service';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
})
export class BookFlightComponent implements OnInit {
  bookingForm!: FormGroup;
  availableFlights: any[] = [];
  submitting = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  today: string = new Date().toISOString().split('T')[0];  // Format YYYY-MM-DD

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      flightId: ['', Validators.required],
      seats: ['', [Validators.required, Validators.min(1)]],
      bookingDate: [this.today, Validators.required],
    });

    this.loadFlights();
  }

  loadFlights() {
    this.flightService.getAllFlights().subscribe({
      next: (flights) => (this.availableFlights = flights),
      error: (err) => console.error('Error loading flights', err),
    });
  }

  submitBooking() {
    if (this.bookingForm.invalid) return;

    this.bookingService.bookFlight(this.bookingForm.value).subscribe({
      next: (res: any) => {
        this.successMessage = res.message;
        this.errorMessage = '';
        this.bookingForm.reset({ bookingDate: this.today });  
      },
      error: (err) => {
        this.errorMessage = 'Booking failed: ' + (err.error?.message || err.message);
        this.successMessage = '';
      }
    });
  }
}
