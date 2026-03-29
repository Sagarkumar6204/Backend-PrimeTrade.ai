# 📌 PrimeTrade.ai - Backend Developer Assignment

This repository contains my submission for the **Backend Developer** assignment at **PrimeTrade.ai**. The primary goal of this project was to build a **secure, fully functional, and scalable system** using the **MERN stack**, with a strong emphasis on robust authentication, API security, and **Role-Based Access Control (RBAC)**.

> **📝 Note on Project Scope:** As this is a Backend Developer assignment, my primary engineering focus has been dedicated to the **backend architecture, security protocols, and database scalability**. The frontend is intentionally kept lightweight and simple, yet it strictly adheres to best UI/UX principles to ensure a smooth, modern, and intuitive testing experience.

---

## 🛠️ Tech Stack & Key Implementations

* **Backend:** Node.js & Express.js (Implementing a clean **MVC Pattern**).
* **Database:** MongoDB with Mongoose ODM (Optimized with **field indexing**).
* **Security Architecture:** * **JWT & HTTP-Only Cookies:** Engineered for secure, **stateless** session management.
  * **BcryptJS:** Applied for salted password hashing (**10-round salt**).
  * **RBAC:** Strict Role-Based Access Control distinguishing **Admin** and **User** privileges.
* **Frontend (Supportive UI):** React.js integrated with Tailwind CSS for a clean, responsive interface.

---

## ✨ Features & Functional Logic

### 1. Secure Authentication & Session Management
* **Refresh Persistence (Stateless State):** Fixed the common React issue where users are logged out upon a page refresh. I engineered a dedicated `/currentuser` endpoint paired with an `isAuth` middleware to silently verify the **JWT** from cookies every time the app reloads, ensuring a seamless user experience.
* **Cookie Security:** To protect against **XSS (Cross-Site Scripting)** vulnerabilities, authentication tokens are strictly stored in **HTTP-Only Cookies** rather than local storage.

### 2. Role-Based Access Control (RBAC)
* Created specific custom middlewares (`isAuthAdmin` and `isAuthUser`) to act as security checkpoints. This ensures that sensitive API endpoints are exclusively accessible to authorized roles, preventing **privilege escalation**.

### 3. Entity Management (CRUD Operations)
* Developed comprehensive **Create, Read, Update, and Delete (CRUD)** APIs for the secondary entity (Tasks/Notes), complete with input validation and proper HTTP status code responses (`200`, `201`, `400`, `401`, `404`).

### 4. Scalable Project Structure
* The project strictly follows a **modular directory structure**. By decoupling routes, controllers, and middlewares, the codebase remains highly maintainable, making it easy to integrate new features without disrupting existing logic.

---

## 📂 Folder Structure

```text
├── backend/
│   ├── src/
│   │   ├── controllers/    # Logical implementation of APIs
│   │   ├── middlewares/    # Authentication & Role guards
│   │   ├── models/         # Database Schemas
│   │   ├── routes/         # API Versioning (/api/v1)
│   │   └── utils/          # Token generation & Helper functions
│   └── docs/               # Postman API Documentation
├── frontend/               # React UI
└── README.md               # Project Documentation
```

## 🚀 Scalability & Future Improvements

Even as an initial version, the backend architecture is designed with **scalability** in mind:

* **API Versioning:** Implementing a `/v1` prefix ensures that future backend updates or mobile app integrations can be done without breaking the current frontend application.
* **Database Performance:** Indexed the `email` and `username` fields in MongoDB to guarantee **$O(1)$ lookup times**, ensuring fast queries even as the user base grows.
* **Ready for Redis:** The **decoupled controller logic** makes it straightforward to inject a caching layer (like **Redis**) for handling high-traffic analytical or reading scenarios.

---

## 📖 How to Test (API Documentation)

A professional **Postman Collection** is included in the project for quick testing and evaluation:

* **Path:** `backend/docs/PrimeTrade_API_Collection.json`
* **Instructions:** Import this JSON file directly into **Postman**. All routes are pre-configured to test against the base URL `http://localhost:3000/api/v1`. *(Ensure cookies are enabled in Postman to test protected routes).*

---
## ⚙️ Setup Instructions
# 1. Backend Initialization

Navigate to the **backend directory** and **install dependencies**:

```Bash
cd backend
npm install
```
 
# Create a .env file in the root of the backend folder and include your variables:



```bash
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
```
*Start the development server:*

```Bash
npm run dev
```
2. Frontend Initialization
Navigate to the frontend directory and install dependencies:


```Bash
cd frontend
npm install
```
*Start the React application:*

```Bash
npm run dev
```

<div align="center">
<b>Developed by <a href="https://github.com/Sagarkumar6204" target="_blank">Sagar Kumar</a></b>
</div>
