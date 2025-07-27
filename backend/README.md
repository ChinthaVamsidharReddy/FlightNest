# ✈️ FlightNest – Full Stack Flight Booking System

FlightNest is a comprehensive full-stack **Flight Booking System** that includes a **Spring Boot** backend and an **Angular** frontend. It enables users to search and book flights, while admins and flight owners can manage flight data and bookings.

---

## 🌐 Live Environment (If running locally)

* Backend: `http://localhost:8080`
* Frontend: `http://localhost:4200`

---

## 🔧 Technologies Used

### Backend

* Java 17
* Spring Boot 3.3.12
* Spring Security (JWT Authentication)
* MySQL
* Spring Data JPA
* Swagger / OpenAPI
* Lombok
* Maven


---

## 🚀 How to Setup and Run the Full Stack

### ✅ Prerequisites

* Java 17
* Maven
* MySQL Server
* Node.js & Angular CLI
* An IDE (e.g., Eclipse, IntelliJ, VS Code)

---

## 📦 Backend Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ChinthaVamsidharReddy/FlightNest.git
cd FlightNest/backend
```

### 2. Configure MySQL Database

Create a database named `simplyfly_db` or `FlightNest`, then update the credentials in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/FlightNest?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

jwt.secret=FlightNestJWTSecretKey_128BitsStrong_UseSecureRandom1234
jwt.expiration=3600000
```

### 3. Run the Backend

```bash
mvn clean install
mvn spring-boot:run
```

Or run `FlightNestApplication.java` from your IDE.

### 4. Access Swagger API Docs

```
http://localhost:8080/swagger-ui.html
```

---

## 📂 Backend Project Structure

```
com.project.FlightNest
├── controller/       # REST Controllers
├── dto/              # Request and Response DTOs
├── entity/           # JPA Entities
├── repository/       # JPA Repositories
├── security/         # JWT filters, config, services
├── service/          # Business logic
├── config/           # Swagger, CORS, Security config
└── FlightNestApplication.java
```

---

## 🛠️ JWT Token Example

```java
public String generateToken(String username) {
    Date now = new Date();
    Date expiry = new Date(now.getTime() + jwtExpiration);

    return Jwts.builder()
        .setSubject(username)
        .setIssuedAt(now)
        .setExpiration(expiry)
        .signWith(getSigningKey(), SignatureAlgorithm.HS256)
        .compact();
}
```

---

## 🌐 Frontend Setup (Angular)

### 1. Navigate to the Frontend Folder

```bash
cd ../frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Angular App

```bash
ng serve
```

Visit: `http://localhost:4200`

---

## 📁 Frontend Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── auth/            # Auth components/services
│   │   ├── dashboard/       # Dashboards (Admin, User, Owner)
│   │   ├── interceptors/    # HTTP Interceptors (JWT handling)
│   │   ├── pages/           # Feature pages (Booking, Flights, etc.)
│   │   ├── services/        # API services
│   │   ├── shared/          # Shared UI components
│   │   └── app.module.ts    # App module
│   ├── assets/              # Images and icons
│   ├── index.html
│   └── main.ts
├── angular.json
├── package.json
└── README.md
```

---

## 🔐 API Endpoints (Spring Boot)

### User Authentication

```
POST /api/v1/auth/user/register
POST /api/v1/auth/user/login
```

### Admin Authentication

```
POST /api/v1/auth/admin/register
POST /api/v1/auth/admin/login
```

### Flight Owner Authentication

```
POST /api/v1/auth/owner/register
POST /api/v1/auth/owner/login
```

### Flight Management

```
POST   /api/v1/flights/add
GET    /api/v1/flights/all
GET    /api/v1/flights/search?source=Delhi&destination=Mumbai
DELETE /api/v1/flights/{id}
```

### Booking Management

```
POST /api/v1/bookings/book
PUT  /api/v1/bookings/cancel/{id}
GET  /api/v1/bookings/my
GET  /api/v1/bookings/all
GET  /api/v1/bookings/flight/{flightId}
```

### User Profile

```
GET  /api/v1/users/me
PUT  /api/v1/users/update
```

---

## 🧪 Testing

### Postman

* Base URL: `http://localhost:8080`
* Use JWT in headers:

```http
Authorization: Bearer <your_token>
```

### Swagger UI

```
http://localhost:8080/swagger-ui.html
```

---

## 🧰 Common Issues

* **403 Forbidden on Login:** Ensure `permitAll()` for login endpoints in Spring Security config.
* **CORS Errors:** Add CORS config or `@CrossOrigin(origins = "http://localhost:4200")`
* **Database Not Created?** Confirm MySQL is running and `ddl-auto=update` is set.
* **JWT Token Expired Quickly?** Update `jwt.expiration` in `application.properties`.

---

## 🎓 Contributors

* Chintha Vamsidhar Reddy

---

## 🌟 GitHub Repository

[https://github.com/ChinthaVamsidharReddy/FlightNest.git](https://github.com/ChinthaVamsidharReddy/FlightNest.git)

---

## ❤️ Found This Useful?

Star ⭐ this repository and share it with others!
