import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service'; 

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  profile: any;
  flights: any[] = [];
  editMode = false;
  profileForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService 
  ) {}
  
  ngOnInit(): void {
    const role = this.authService.getRole();
    const token = localStorage.getItem('token');

    if (!token || role !== 'ADMIN') {
      alert('Access denied. Admins only!');
      this.router.navigate(['/login-admin']);
      return;
    }

    this.fetchProfile();
    this.fetchFlights();
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
  }

  fetchProfile() {
    this.http.get('http://localhost:8080/api/v1/users/me', {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: (data) => {
        this.profile = data;
        this.profileForm = this.fb.group({
          fullName: [this.profile.fullName],
          phone: [this.profile.phone],
          address: [this.profile.address],
          gender: [this.profile.gender],
          dateOfBirth: [this.profile.dateOfBirth],
          country: [this.profile.country]
        });
      },
      error: () => {
        this.errorMessage = 'Failed to load profile';
      }
    });
  }

  fetchFlights() {
    this.http.get<any[]>('http://localhost:8080/api/v1/flights/all').subscribe({
      next: (data) => {
        this.flights = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load flights';
      }
    });
  }

  enableEdit() {
    this.editMode = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  saveProfile() {
    this.http.put('http://localhost:8080/api/v1/users/update', this.profileForm.value, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: () => {
        this.successMessage = 'Profile updated successfully';
        this.editMode = false;
        this.fetchProfile();
      },
      error: () => {
        this.errorMessage = 'Failed to update profile';
      }
    });
  }

  cancelEdit() {
    this.editMode = false;
    this.profileForm.patchValue(this.profile);
  }

  logout() {
    this.authService.logout();
  }
  
}
