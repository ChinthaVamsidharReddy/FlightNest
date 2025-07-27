# ✈️ FlightNest – Frontend (Angular)

FlightNest is a web-based flight management platform. This is the **Angular frontend** for the FlightNest system, developed using Angular CLI version `15.2.11`.

---

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

---

## ⚙️ Setup & Installation

✅ Prerequisites
Node.js (v16.x or later)

Angular CLI installed globally:

    npm install -g @angular/cli
---