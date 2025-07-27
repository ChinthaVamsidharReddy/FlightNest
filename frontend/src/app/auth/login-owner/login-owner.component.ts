import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-owner',
  templateUrl: './login-owner.component.html'
})
export class LoginOwnerComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.authService.loginOwner(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', 'FLIGHT_OWNER');
        localStorage.setItem('username', this.loginForm.value.username);
        alert(res.message);
        this.router.navigate(['/owner/home']);
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
