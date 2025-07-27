import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html'
})
export class LoginAdminComponent {
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

    this.authService.loginAdmin(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', 'ADMIN');
        localStorage.setItem('username', this.loginForm.value.username);
        alert(res.message);
        this.router.navigate(['/admin/home']);
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
