import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html'
})
export class LoginUserComponent {
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

    this.authService.loginUser(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res)
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', 'USER');
        localStorage.setItem('username', this.loginForm.value.username);
        alert(res.message);
        this.router.navigate(['/user/home']); 
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
  
}
