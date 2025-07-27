import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) {}

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`, {
      headers: this.getAuthHeaders()
    });
  }

  getUserBookings(): Observable<any[]> {
  const bookingsUrl = 'http://localhost:8080/api/v1/bookings/my';
  return this.http.get<any[]>(bookingsUrl, {
    headers: this.getAuthHeaders()
  });
}

  updateUserProfile(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, data, {
      headers: this.getAuthHeaders(),
      responseType: 'text' as 'json'
    });
  }
}
