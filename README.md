🏥 Clinic Management System (React + Firebase)
🌐 Live Demo → https://nirjargajeraclinic.netlify.app/

📌 Project Description -> 
The Clinic Management System is a role-based web application built using React.js and Firebase.
It is designed to streamline clinic operations by managing patients, doctors, prescriptions, and user roles securely.
This project demonstrates full-stack architecture using Firebase Authentication, Firestore database, and production-level security rules.

🎯 Objective -> 
To design and implement a secure clinic management application that:
Implements role-based access control (Admin, Doctor, Receptionist, User)
Uses Firebase Authentication for login/registration
Uses Firestore as a real-time NoSQL database
Applies secure Firestore rules for data protection
Provides separate dashboards for each role
Demonstrates real-world application architecture

🛠️ Tech Stack -> 
React.js
React Router
Firebase Authentication
Firebase Firestore
Firestore Security Rules
Material UI
JavaScript (ES6)
CSS3
Netlify Hosting (Deployment)

👥 User Roles ->
✔ Admin
View all users
Change user roles
Disable users (Soft Delete using isActive)
Manage system access

✔ Doctor
View only assigned patients
Add prescriptions
View own prescriptions
Access patient details securely

✔ Receptionist
Add new patients
Reuse existing patient records
Assign doctor to patients
Generate patient tokens
View doctors list

✔ User
Register and login
Access personal dashboard
Wait for role assignment

✨ Features ->
✔ Authentication
Secure registration and login using Firebase Auth
User profile stored in Firestore
Role-based redirection after login

✔ Role-Based Access Control
Protected routes using PrivateRoute
Role validation in frontend
Enforced database security using Firestore rules

✔ Admin Panel
Real-time user list
Update user roles
Soft delete users (isActive = false)
Real-time updates using onSnapshot

✔ Doctor Dashboard
View assigned patients
Add prescription notes
View patient details with visit information
Secure access to only own data

✔ Receptionist Dashboard
Add new patients
Search and reuse existing patients
Assign doctors
Automatic token generation
View patient list sorted by date

✔ Security
Firestore role-based security rules
Soft delete protection
Active user validation
Database-level access restriction

✔ UI/UX
Clean and responsive design
Material UI components
Dashboard-based layout
Error handling and user feedback

📂 Project Structure ->
📦clinic-management
 ┣ 📂public/
 ┣ 📂src
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📜admin.js
 ┃ ┃ ┣ 📜auth.js
 ┃ ┃ ┣ 📜doctor.js
 ┃ ┃ ┗ 📜receptionist.js
 ┃ ┣ 📂assets
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂layout
 ┃ ┃ ┃ ┣ 📜AppLayout.jsx
 ┃ ┃ ┃ ┣ 📜Footer.jsx
 ┃ ┃ ┃ ┣ 📜Header.jsx
 ┃ ┃ ┃ ┗ 📜Loading.jsx
 ┃ ┃ ┗ 📂UI
 ┃ ┃ ┃ ┣ 📜PrivateRoute.jsx
 ┃ ┃ ┃ ┗ 📜RoleRedirect.jsx
 ┃ ┣ 📂context
 ┃ ┃ ┗ 📜AuthContext.jsx
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂admin
 ┃ ┃ ┃ ┣ 📜AdminDashboard.jsx
 ┃ ┃ ┃ ┣ 📜AdminDoctors.jsx
 ┃ ┃ ┃ ┣ 📜AdminReceptionists.jsx
 ┃ ┃ ┃ ┗ 📜AdminUsers.jsx
 ┃ ┃ ┣ 📂doctor
 ┃ ┃ ┃ ┣ 📜DoctorDashboard.jsx
 ┃ ┃ ┃ ┗ 📜DoctorPatientDetails.jsx
 ┃ ┃ ┣ 📜ErrorPage.jsx
 ┃ ┃ ┣ 📜Login.jsx
 ┃ ┃ ┣ 📜ReceptionistDashboard.jsx
 ┃ ┃ ┣ 📜Register.jsx
 ┃ ┃ ┗ 📜UserDashboard.jsx
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜helper.js
 ┃ ┃ ┗ 📜waitForAuth.js
 ┃ ┣ 📜App.css
 ┃ ┣ 📜App.jsx
 ┃ ┣ 📜firebase.js
 ┃ ┗ 📜main.jsx
 ┣ 📜.env
 ┣ 📜.env.example
 ┣ 📜.gitignore
 ┣ 📜bun.lock
 ┣ 📜eslint.config.js
 ┣ 📜index.html
 ┣ 📜package.json
 ┣ 📜README.md
 ┗ 📜vite.config.js

🚀 How to Run Locally ->
Clone the repository
git clone https://github.com/gajeranirjar/clinic-management
Navigate to the project folder
cd clinic-management
Install dependencies
npm install
Start the development server
npm run dev

Open in browser ->
http://localhost:5173

🔑 Firebase Setup ->
1.Create a Firebase project
2.Enable:
Authentication (Email/Password)
Firestore Database
3.Add your Firebase config inside firebase.js
4.Add Firestore Security Rules
5.Run the project

🔐 Security Implementation ->
Role-based Firestore rules
Soft delete system using isActive
Admin-only role modification
Doctor restricted to assigned patients
Receptionist restricted to patient management
Disabled users blocked automatically

📄 License
This project is created for educational purposes.

👤 Author
Nirjar Gajera
GitHub: https://github.com/gajeranirjar