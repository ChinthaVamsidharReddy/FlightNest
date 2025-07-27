# ✈️ FlightNest – Frontend (Angular)

FlightNest is a web-based flight management platform. This is the **Angular frontend** for the FlightNest system, developed using Angular CLI version `15.2.11`.

---

## 🌐 Live Environment (If running locally)

* Backend: `http://localhost:8080`
* Frontend: `http://localhost:4200`

---

## 🔧 Technologies Used

### Frontend

* Angular CLI 15.2.11
* Angular Modules (Reactive Forms, HttpClient, Router)
* JWT Token-based Authentication
* Bootstrap / Custom CSS

---

## 🚀 How to Setup and Run the Full Stack

### ✅ Prerequisites

* Java 17
* Maven
* MySQL Server
* Node.js & Angular CLI
* An IDE (e.g., Eclipse, IntelliJ, VS Code)

---


---

## 🌐 Frontend Setup (Angular)

### 1. Clone the Repository

```bash
git clone https://github.com/ChinthaVamsidharReddy/FlightNest.git
cd FlightNest/frontend
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
## 📁 Project Structure

```bash
frontend/
├── .angular/                 # Angular cache
├── .vscode/                 # Editor settings
├── node_modules/            # Dependencies
├── src/
│   ├── app/
│   │   ├── auth/            # Login, signup, auth guards, JWT handling
│   │   ├── dashboard/       # Admin/User dashboard components
│   │   ├── interceptors/    # HTTP interceptors (e.g., auth token handling)
│   │   ├── pages/           # Page-level components (flights, booking, etc.)
│   │   ├── services/        # Angular services for API calls
│   │   ├── shared/          # Shared components, pipes, directives
│   │   ├── app-routing.module.ts
│   │   ├── app.component.ts / html / css
│   │   └── app.module.ts
│   ├── assets/              # Static assets like images/icons
│   ├── index.html
│   ├── main.ts              # Main entry point
│   ├── styles.css           # Global styles
├── angular.json             # Angular project configuration
├── package.json             # Dependencies and scripts
├── Dockerfile               # For containerization
├── nginx.conf               # NGINX config for production
└── README.md                # You are here

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

---




## ⚙️ Setup & Installation

✅ Prerequisites
Node.js (v16.x or later)

Angular CLI installed globally:

    npm install -g @angular/cli
---
