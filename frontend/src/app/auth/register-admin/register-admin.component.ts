import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html'
})
export class RegisterAdminComponent {
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
  phone: ['', [
    Validators.required,
    Validators.pattern('^[6-9]\\d{9}$')
  ]],
  address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
  gender: ['', Validators.required],
  dateOfBirth: ['', Validators.required],
  country: ['', Validators.required],
  role: ['ADMIN']
});
}

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.authService.registerAdmin(this.registerForm.value).subscribe({
      next: () => {
        alert('Admin registered successfully!');
        this.router.navigate(['/login/admin']);
      },
      error: () => {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  }
}
