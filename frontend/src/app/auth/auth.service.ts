import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient, private router: Router) {}

  // LOGIN 

  loginUser(data: { username: string; password: string }): Observable<{ token: string; message: string }> {
    return this.http.post<{ token: string; message: string }>(
      `${this.baseUrl}/user/login`,
      data
    ).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', 'USER');
      })
    );
  }

  loginAdmin(data: { username: string; password: string }): Observable<{ token: string; message: string }> {
    return this.http.post<{ token: string; message: string }>(
      `${this.baseUrl}/admin/login`,
      data
    ).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', 'ADMIN');
      })
    );
  }

  loginOwner(data: { username: string; password: string }): Observable<{ token: string; message: string }> {
    return this.http.post<{ token: string; message: string }>(
      `${this.baseUrl}/owner/login`,
      data
    ).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', 'FLIGHT_OWNER');
      })
    );
  }

  // REGISTER 

  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/register`, data);
  }

  registerAdmin(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/register`, data);
  }

  registerOwner(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/owner/register`, data);
  }

  // LOGOUT 

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  // GETTERS 

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
