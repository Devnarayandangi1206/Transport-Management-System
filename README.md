Transport Management System (TMS)

A full-stack web application for managing transportation operations, including vehicle management, driver management, route assignments, and administrative monitoring. The system provides a centralized platform to automate transport-related activities and improve operational efficiency.

🚀 Features
🔐 Secure Authentication & Authorization using JWT
🚚 Vehicle Management
👨‍✈️ Driver Management
🛣️ Route Assignment & Scheduling
📊 Administrative Dashboard
🗄️ MongoDB Database Integration
🔒 Password Encryption using bcrypt
✅ Input Validation using express-validator
🌐 RESTful API Architecture
📈 Scalable and Modular Backend Design
🛠️ Technologies Used
Backend
Node.js
Express.js
Database
MongoDB
Mongoose
Security
JSON Web Token (JWT)
bcryptjs
express-validator
Development Tools
Visual Studio Code
Postman
Nodemon
Git & GitHub
📂 Project Structure
Transport-Management-System/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── .env
├── server.js
├── package.json
└── README.md
⚙️ Installation
1. Clone Repository
git clone https://github.com/Devnarayandangi1206/Transport-Management-System.git
2. Navigate to Project
cd Transport-Management-System
3. Install Dependencies
npm install
4. Configure Environment Variables

Create a .env file in the root directory:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
5. Run Application

Development Mode:

npm run dev

Production Mode:

npm start
📌 API Modules
Authentication
User Registration
User Login
JWT Token Generation
Protected Routes
Vehicle Management
Add Vehicle
Update Vehicle
Delete Vehicle
View Vehicle Details
Driver Management
Add Driver
Update Driver
Delete Driver
View Driver Details
Route Management
Create Route
Assign Driver
Assign Vehicle
Update Route Information
Delete Route
🔒 Security Features
JWT-Based Authentication
Password Hashing using bcrypt
Input Validation
Protected API Routes
Secure Data Handling
💡 Future Enhancements
Real-Time GPS Tracking
Mobile Application Support
SMS & Email Notifications
Online Payment Integration
Advanced Analytics Dashboard
Cloud Deployment
AI-Based Route Optimization
Multi-Role Access Control
🎯 Objectives
Centralize transportation management.
Reduce manual workload and human errors.
Improve resource utilization.
Enhance operational efficiency.
Provide secure and scalable transport management.
📊 Expected Outcomes
Efficient management of vehicles and drivers.
Better route planning and scheduling.
Improved security and data management.
Real-time visibility of transportation resources.
Modern digital transformation of transport operations.
👨‍💻 Author

Dev Narayan Dangi

GitHub: Devnarayandangi1206 GitHub Profile

📄 License

This project is developed for educational and learning purposes. Feel free to use and modify it according to your requirements.

⭐ If you like this project, don't forget to star the repository.
