import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }


  getRole(): string | null {
    return localStorage.getItem('role');
  }
  getUsername(): string | null {
  return localStorage.getItem('username');
  }
}
