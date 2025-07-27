import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service'; 

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  user: any = {};
  bookings: any[] = [];
  profileForm!: FormGroup;
  editMode = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService 
  ) {}

  ngOnInit(): void {
    const role = this.authService.getRole();
    const token = localStorage.getItem('token');

    if (!token || role !== 'USER') {
      alert('Access denied. Users only!');
      this.router.navigate(['/login-user']);
      return;
    }

    this.loadUserProfile();
    this.loadUserBookings();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe({
      next: (res) => {
        this.user = res;
        this.profileForm = this.fb.group({
          fullName: [this.user.fullName, Validators.required],
          email: [this.user.email, [Validators.required, Validators.email]],
          phone: [this.user.phone, Validators.required],
          address: [this.user.address, Validators.required],
          gender: [this.user.gender, Validators.required],
          dateOfBirth: [this.user.dateOfBirth, Validators.required],
          country: [this.user.country, Validators.required]
        });
      },
      error: (err) => console.error('Profile fetch error', err)
    });
  }

  loadUserBookings(): void {
    this.userService.getUserBookings().subscribe({
      next: (res) => this.bookings = res,
      error: (err) => console.error('Booking fetch error', err)
    });
  }

  enableEdit(): void {
    this.editMode = true;
  }

  saveProfile(): void {
    if (this.profileForm.invalid) return;
    this.userService.updateUserProfile(this.profileForm.value).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.editMode = false;
        this.loadUserProfile();
      },
      error: () => alert('Update failed')
    });
  }

  goToBookFlight(): void {
    this.router.navigate(['/book-flight']);
  }

  logout(): void {
    this.authService.logout();
  }
}
