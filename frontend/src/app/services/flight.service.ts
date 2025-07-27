import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private flightBaseUrl = 'http://localhost:8080/api/v1/flights';
  private bookingUrl = 'http://localhost:8080/api/v1/bookings/book';

  constructor(private http: HttpClient) {}

  getAllFlights(): Observable<any[]> {
    return this.http.get<any[]>(`${this.flightBaseUrl}/all`);
  }

  bookFlight(request: { flightId: number; seats: number }): Observable<string> {
    return this.http.post(this.bookingUrl, request, { responseType: 'text'});
  }
}
