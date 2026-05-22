# 🚌 Transport Management System (TMS)

A comprehensive **web-based Transport Management System** designed to streamline, automate, and secure the management of transportation operations. Built with a modern full-stack architecture using **Node.js**, **Express.js**, and **MongoDB**.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Security](#security)
- [Screenshots](#screenshots)
- [Authors](#authors)
- [License](#license)

---

## 📖 About the Project

Many small to medium-scale transport operators still rely on manual, paper-based systems that are prone to human error, data redundancy, and scheduling conflicts. This **Transport Management System (TMS)** addresses those challenges by providing a centralized, automated, and scalable web platform.

Transport administrators can:
- Track all vehicles in the fleet
- Manage driver credentials and assignments
- Handle dynamic route assignments in real-time
- View a live dashboard with operational statistics

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| 🔐 Admin Authentication | Secure JWT-based login & registration |
| 🚗 Vehicle Management | Add, update, delete, and list vehicles |
| 👨‍✈️ Driver Management | Manage driver profiles and assignments |
| 🗺️ Route Management | Create and manage transport routes |
| 📊 Real-time Dashboard | Overview of fleet, drivers, and active routes |
| 🛡️ Input Validation | All requests validated with `express-validator` |
| 🔒 Password Hashing | Passwords secured using `bcryptjs` |
| ⚡ RESTful API | Clean, modular REST API architecture |

---

## 🛠️ Tech Stack

**Backend:**
- [Node.js](https://nodejs.org/) — Runtime environment
- [Express.js](https://expressjs.com/) — Web framework
- [MongoDB](https://www.mongodb.com/) — NoSQL database
- [Mongoose](https://mongoosejs.com/) — MongoDB ODM

**Authentication & Security:**
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) — JWT-based stateless auth
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js) — Password hashing
- [express-validator](https://express-validator.github.io/) — Input validation

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- Served as static files via Express

**Dev Tools:**
- [nodemon](https://nodemon.io/) — Auto-restart on file change
- [dotenv](https://github.com/motdotla/dotenv) — Environment variable management

---

## 📁 Project Structure

```
transport-management-system/
│
├── config/
│   └── db.js                  # MongoDB connection setup
│
├── controllers/
│   ├── authController.js      # Register & Login logic
│   ├── dashboardController.js # Dashboard stats
│   ├── driverController.js    # Driver CRUD
│   ├── routeController.js     # Route CRUD
│   └── vehicleController.js   # Vehicle CRUD
│
├── middleware/
│   └── authMiddleware.js      # JWT verification middleware
│
├── models/
│   ├── Admin.js               # Admin schema
│   ├── Driver.js              # Driver schema
│   ├── Route.js               # Route schema
│   └── Vehicle.js             # Vehicle schema
│
├── routes/
│   ├── authRoutes.js
│   ├── dashboardRoutes.js
│   ├── driverRoutes.js
│   ├── routeRoutes.js
│   └── vehicleRoutes.js
│
├── public/
│   ├── index.html             # Login / Register page
│   ├── dashboard.html         # Main dashboard UI
│   ├── script.js              # Frontend logic
│   └── style.css              # Styling
│
├── .env                       # Environment variables (not committed)
├── server.js                  # Application entry point
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud instance)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/transport-management-system.git
   cd transport-management-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root of the project and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

> ⚠️ **Never commit your `.env` file to GitHub.** Make sure it's listed in `.gitignore`.

### Running the App

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start at: `http://localhost:5000`

Open your browser and navigate to `http://localhost:5000` to access the application.

---

## 📡 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| POST | `/api/auth/register` | Register a new admin | ❌ |
| POST | `/api/auth/login` | Login and receive JWT token | ❌ |

### Vehicle Routes — `/api/vehicles`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| GET | `/api/vehicles` | Get all vehicles | ✅ |
| POST | `/api/vehicles` | Add a new vehicle | ✅ |
| PUT | `/api/vehicles/:id` | Update a vehicle | ✅ |
| DELETE | `/api/vehicles/:id` | Delete a vehicle | ✅ |

### Driver Routes — `/api/drivers`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| GET | `/api/drivers` | Get all drivers | ✅ |
| POST | `/api/drivers` | Add a new driver | ✅ |
| PUT | `/api/drivers/:id` | Update a driver | ✅ |
| DELETE | `/api/drivers/:id` | Delete a driver | ✅ |

### Route Routes — `/api/routes`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| GET | `/api/routes` | Get all routes | ✅ |
| POST | `/api/routes` | Create a new route | ✅ |
| PUT | `/api/routes/:id` | Update a route | ✅ |
| DELETE | `/api/routes/:id` | Delete a route | ✅ |

### Dashboard Routes — `/api/dashboard`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|:-------------:|
| GET | `/api/dashboard` | Get dashboard statistics | ✅ |

> **Note:** Protected routes require a valid JWT token passed in the `Authorization` header as `Bearer <token>`.

---

## 🔒 Security

- **Password Hashing:** All admin passwords are hashed using `bcryptjs` before storage.
- **JWT Authentication:** Stateless authentication using JSON Web Tokens. Tokens expire and must be included in request headers for protected routes.
- **Input Validation:** All incoming request bodies are validated using `express-validator` to prevent invalid data and injection attacks.
- **CORS:** Cross-Origin Resource Sharing is handled using the `cors` package.

---

## 👨‍💻 Authors

- **Your Name** — [GitHub Profile](https://github.com/your-username)

---

## 📄 License

This project is developed as part of a Minor Project for academic purposes.

---

## 📝 Keywords

`Transport Management` · `Node.js` · `MongoDB` · `Express.js` · `REST API` · `JWT` · `Fleet Management` · `Logistics` · `Web Application`
