# 📚 Library Management System  

## 📖 Introduction  
The **Library Management System** is a fullstack web application designed to digitize and simplify day-to-day library operations.  
It helps librarians track book inventory, manage user accounts, and facilitate book borrowing/returning, while providing users with a modern interface to search, reserve, and review books.  

This system solves the problem of manual record keeping by offering a digital solution for:  
- Managing book inventory  
- User authentication and profiles  
- Borrowing and returning books  
- Sending reminders and notifications  

---

## 🎯 Project Goal  
Build a secure and scalable web application that allows users to:  
- Search for and borrow books  
- Track their borrowed books  
- Interact with the library via events, reviews, and digital books  

And librarians to:  
- Manage books, users, and reports via an admin dashboard  

---

## 🏗 Project Type  
**Fullstack Application (Frontend + Backend + Database)**  

---

## 🌍 Deployed App  
- **Frontend**: https://bookworm-lib-app.netlify.app 
- **Backend**: https://library-management-system-1-5z1a.onrender.com  
- **Database**: MongoDB Compass / Atlas

---

## 📂 Directory Structure  

Library-Management-System/
├── backend/                # Node.js + Express + MongoDB backend
│   ├── config/             # DB connection, environment setup
│   ├── controllers/        # Request handlers (books, auth, users)
│   ├── models/             # MongoDB schemas (Book, User, Borrow)
│   ├── routes/             # Express routes
│   ├── middlewares/        # Auth and validation middleware
│   └── server.js           # Backend entry point
│
├── frontend/               # React frontend with Vite
│   ├── public/
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Home, About, Dashboard, Login, Register
│       ├── store/          # Redux store / context
│       ├── App.jsx         # Main app entry
│       └── index.css       # TailwindCSS styling
│
└── README.md


---

## ✨ Features  

### ✅ Minimum Expected Features  
- User Authentication (secure login/register with JWT, hashed passwords)  
- User Profiles (details, borrowed books list)  
- Book Catalog (searchable with filters: title, author, genre)  
- Borrowing/Returning Books with real-time availability updates  
- Due Dates & Notifications (email reminders)  
- Book Reservation Queue for unavailable books  
- Librarian Dashboard to manage books & users  

### 🌟 Unique Features  
- Book Recommendations based on borrowing history  
- User Reviews & Ratings on book detail pages  
- Advanced Search & Filters (genre, year, rating)  
- Digital Library (eBooks) section  
- Events Calendar for workshops/book clubs  

### 🚀 Challenging Features  
- Inventory Management System (CRUD with validations)  
- Fine Calculation System for overdue books  
- Advanced Reporting (most borrowed books, active users, fines)  
- Mobile-Friendly Responsive UI  
- User Activity Tracking (logs in profiles)  

### 🌐 Additional Features  
- Dark Mode  
- Social Media Sharing for reviews  
- Multi-language Support  
- Customizable User Dashboard  

---

## 🛠 Design Decisions & Assumptions  
- MongoDB for flexible schema design (users, books, transactions)  
- JWT-based Authentication for secure login  
- Separation of Frontend & Backend for scalability  
- TailwindCSS for fast UI prototyping and responsiveness  

---

## 🚀 Installation & Getting Started  

### 🔧 Backend Setup  
```bash
cd backend
npm install
---

## Create a .env file with the following:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=3000;

# Run the server 
 npm start
 
 --- 

### 💻 Frontend Setup

cd frontend
npm install
npm run dev   # Run locally
npm run build # For production


### 📌 Usage
👤 For Users:

- Register/Login
- Search books in the catalog
- Borrow or reserve books
- Track due dates, receive notifications
- Return books, leave reviews, join events

👨‍💼 For Librarians:

- Login as admin
- Add/Update/Delete books
- Manage users and borrowing history
- Generate reports on usage/fines

## 🔑 Demo Credentials
Admin
Email: daniak0412@gmail.com
Password: 123456789

User
Email: daniakhan0412@gmail.com
Password: 123456789

### 📡 API Endpoints
##🔐 Auth

POST /api/auth/register → Register user
POST /api/auth/login → Login user
GET /api/auth/me → Get current user

##📚 Books

GET /api/books → Get all books
POST /api/books → Add new book (Admin only)
PUT /api/books/:id → Update book (Admin only)
DELETE /api/books/:id → Delete book (Admin only)

###📖 Borrow/Return

POST /api/borrow/:bookId → Borrow a book
POST /api/return/:bookId → Return a book
POST /api/reserve/:bookId → Reserve a book

### 🖥 Technology Stack
##Frontend

React.js
Tailwind CSS
Redux/Context
Axios

##Backend

Node.js
Express.js
Database
MongoDB Compass
Authentication
JWT (JSON Web Token)
bcrypt
Other Tools
Nodemailer (email notifications)
Chart.js (reporting)

### Deployment

Backend: VS
Database: MongoDB Compass
