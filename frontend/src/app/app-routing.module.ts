import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Auth Components
import { LoginUserComponent } from './auth/login-user/login-user.component';
import { RegisterUserComponent } from './auth/register-user/register-user.component';
import { LoginAdminComponent } from './auth/login-admin/login-admin.component';
import { RegisterAdminComponent } from './auth/register-admin/register-admin.component';
import { LoginOwnerComponent } from './auth/login-owner/login-owner.component';
import { RegisterOwnerComponent } from './auth/register-owner/register-owner.component';

// Dashboard Components
import { UserComponent } from './dashboard/user/user.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { OwnerComponent } from './dashboard/owner/owner.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { BookFlightComponent } from './dashboard/user/book-flight/book-flight.component'; 

// Guards
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { OwnerGuard } from './auth/owner.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Public Page
  { path: 'home', component: HomeComponent },

  // User Auth
  { path: 'login/user', component: LoginUserComponent },
  { path: 'register/user', component: RegisterUserComponent },

  // Admin Auth
  { path: 'login/admin', component: LoginAdminComponent },
  { path: 'register/admin', component: RegisterAdminComponent },

  // Owner Auth
  { path: 'login/owner', component: LoginOwnerComponent },
  { path: 'register/owner', component: RegisterOwnerComponent },

  // Dashboards
  { path: 'user/home', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'admin/home', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'owner/home', component: OwnerComponent, canActivate: [OwnerGuard] },

  // Book Flight
  { path: 'book-flight', component: BookFlightComponent, canActivate: [AuthGuard] },

  // Fallback
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
