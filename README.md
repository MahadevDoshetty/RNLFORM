# Registration and Login Form (RNLFORM)

## 📌 Overview

**RNLFORM** is a full-stack authentication application that includes a **registration form**, **login form**, and a **personalized dashboard**.  
It demonstrates secure user authentication using **JWT (JSON Web Tokens)** and **MongoDB**.

---

## 🧭 Features

- User Registration
- User Login
- JWT-based Authentication
- Protected Routes
- Personalized Dashboard

---

## 🧱 Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)

---

## 📝 Registration

- Users can register by entering valid details
- Registered user data is securely stored in the database

---

## 🔐 Login

- Email and password are verified
- On successful authentication, a **JWT token** is generated and assigned to the user

---

## 📊 Personalized Dashboard

- Accessible only to authenticated users
- JWT token is verified before granting access
- Displays a personalized greeting for the logged-in user

---

## 🛡️ Security

- JWT-based route protection
- Backend validation for secured APIs
- Unauthorized users cannot access protected routes

---

## 📂 Project Structure

```text
RNLFORMCODE/
├── frontend/    # React (Vite) application
├── backend/     # Node.js / Express API
└── README.md    # Project documentation
```


## 🚧 Future Enhancements

- Refresh token implementation
- Forgot password functionality
- UI improvement using Tailwind CSS

---

## 👤 Author
**Mahadev Doshetty**