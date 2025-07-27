import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Auth Components
import { LoginUserComponent } from './auth/login-user/login-user.component';
import { RegisterUserComponent } from './auth/register-user/register-user.component';
import { LoginOwnerComponent } from './auth/login-owner/login-owner.component';
import { RegisterOwnerComponent } from './auth/register-owner/register-owner.component';
import { LoginAdminComponent } from './auth/login-admin/login-admin.component';
import { RegisterAdminComponent } from './auth/register-admin/register-admin.component';

// Shared
import { BackButtonComponent } from './shared/back-button/back-button.component';

// Pages
import { HomeComponent } from './pages/home/home.component';

// Dashboards
import { UserComponent } from './dashboard/user/user.component';
import { OwnerComponent } from './dashboard/owner/owner.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { BookFlightComponent } from './dashboard/user/book-flight/book-flight.component';

// Services and Guards
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { OwnerGuard } from './auth/owner.guard';

import { AuthInterceptor } from './interceptors/auth.interceptor';

// Pipes
import { FlightFilterPipe } from './dashboard/owner/flight-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    RegisterUserComponent,
    LoginOwnerComponent,
    RegisterOwnerComponent,
    LoginAdminComponent,
    RegisterAdminComponent,
    HomeComponent,
    BackButtonComponent,
    UserComponent,
    OwnerComponent,
    AdminComponent,
    BookFlightComponent,
    FlightFilterPipe  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    OwnerGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
