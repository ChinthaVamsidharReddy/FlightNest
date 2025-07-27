# ✈️ FlightNest - Flight Booking System (Spring Boot Backend)

Welcome to the **FlightNest** backend repository! This is a comprehensive flight booking system built using **Spring Boot**, **Spring Security**, **JWT**, **MySQL**, and **Swagger/OpenAPI**. This guide will help you set up, run, and test the backend project with ease.

---

## 🌐 Base URL

If running locally, the base URL for all API endpoints is:

```
http://localhost:8080
```

---

## 🔧 Technologies Used

* Java 17
* Spring Boot 3.3.12
* Spring Data JPA
* Spring Security with JWT
* MySQL Database
* Swagger (springdoc-openapi)
* Lombok
* Maven

---

## 🚀 How to Setup and Run the Backend

### ✅ Prerequisites

* Java 17 installed
* Maven installed
* MySQL server running
* An IDE like Eclipse/IntelliJ

### ⚡ Step-by-Step Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/NLohithReddy/FlightNest.git
   cd FlightNest
   ```

2. **Configure MySQL Database**

   * Create a database named `simplyfly_db`
   * Update your credentials in `src/main/resources/application.properties`

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/simplyfly_db?useSSL=false&serverTimezone=UTC
   spring.datasource.username=root
   spring.datasource.password=Chintha@2127

   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
   ```

3. **JWT Configuration**

   ```properties
   jwt.secret=FlightNestJWTSecretKey_128BitsStrong_UseSecureRandom1234
   jwt.expiration=3600000
   ```

4. **Run the Application**

   * From IDE: Run `FlightNestApplication.java`
   * From Terminal:

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

5. **Access Swagger Documentation**

   ```
   http://localhost:8080/swagger-ui.html
   ```

---

## 🔢 Project Structure

```
com.project.FlightNest
|
|-- controller/       # REST Controllers for Admin, User, Flights, Bookings
|-- dto/              # DTOs for API input/output
|-- entity/           # JPA Entity classes
|-- repository/       # JPA Repositories
|-- security/         # JWT token handling, filters, configs
|-- service/          # Business logic services
|-- config/           # CORS, Swagger, Security configs
|-- FlightNestApplication.java  # Main entry point
```

---

## 🔐 JWT Token Generation Snippet (Backend)

**jwt.secret should be in 32+ bytes**
```

---

## 🏢 Full List of API Endpoints

### 🔒 User Authentication

```
POST /api/v1/auth/user/register
POST /api/v1/auth/user/login
```

### 🔒 Admin Authentication

```
POST /api/v1/auth/admin/register
POST /api/v1/auth/admin/login
```

### 🔒 Flight Owner Authentication

```
POST /api/v1/auth/owner/register
POST /api/v1/auth/owner/login
```

### 👤 User Profile

```
GET  /api/v1/users/me
PUT  /api/v1/users/update
```

### ✈️ Flight Management

```
POST   /api/v1/flights/add
GET    /api/v1/flights/all
GET    /api/v1/flights/search?source=Delhi&destination=Mumbai
DELETE /api/v1/flights/{id}
```

### 🛬 Booking Management

```
POST /api/v1/bookings/book
PUT  /api/v1/bookings/cancel/{id}
GET  /api/v1/bookings/my
GET  /api/v1/bookings/all
GET  /api/v1/bookings/flight/{flightId}
```

---

## 📊 Testing with Postman or Swagger

### Postman:

* Import all routes manually or write a Postman collection.
* Use `http://localhost:8080` as the base URL.
* Pass JWT in headers:

  ```
  Authorization: Bearer <your_jwt_token>
  ```

### Swagger UI:

* Access Swagger at:

  ```
  http://localhost:8080/swagger-ui.html
  ```
* Try all endpoints interactively

---

## 🚫 Common Issues & Fixes

* **403 Forbidden** on login:

  * Ensure your Spring Security allows the login endpoints via `permitAll()`
  * CORS errors? Add CORS config or `@CrossOrigin(origins = "http://localhost:4200")`
* **Database not created?** Ensure `spring.jpa.hibernate.ddl-auto=update` and MySQL is running.
* **JWT expired too quickly?** Update `jwt.expiration` in milliseconds (e.g., 3600000 for 1 hour).

---

## 🚀 You're Ready!

You can now build, run, and test your backend for **FlightNest** — a complete flight booking solution.

Let me know if you need a `Postman Collection`, Docker setup, or Angular frontend integration steps!


---
## 🎓 Contributors

* Vamsidhar Reddy Chintha 
---

## 🚀 You're Ready!

You can now build, run, and test the **FlightNest** full stack flight booking system. For deployment, containerization (Docker), and CI/CD integration, feel free to ask!

---

## ❤️ Star the repo if you found it useful!

[GitHub Repository](https://github.com/ChinthaVamsidharReddy/FlightNest.git)

