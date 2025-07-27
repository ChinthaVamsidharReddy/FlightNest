import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-owner',
  templateUrl: './register-owner.component.html'
})
export class RegisterOwnerComponent {
  registerForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
  username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
  password: ['', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(20),
    Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$')
  ]],
  email: ['', [Validators.required, Validators.email]],
  fullName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]{3,50}$')]],
  phone: ['', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]],
  address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
  gender: ['', Validators.required],
  dateOfBirth: ['', Validators.required],
  country: ['', Validators.required],
  role: ['FLIGHT_OWNER']
  });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.authService.registerOwner(this.registerForm.value).subscribe({
      next: () => {
        alert('Registration successful');
        this.router.navigate(['/login/owner']);
      },
      error: () => {
        this.errorMessage = 'Registration failed. Try again.';
      }
    });
  }
}
