
# 🎫 EventPass – QR Code Based College Event Management System

A complete **paperless event management system** where students register online, receive **QR-based tickets**, and volunteers validate entries instantly using a scanner.  
This project includes **user login, admin dashboard, volunteer accounts, event creation, ticket management, QR validation**, and more.

---

## 🚀 1. Problem Statement  

College fest entry management usually suffers from:

- Long queues  
- Fake or duplicate tickets  
- Manual paper lists  
- Difficult check-in tracking  
- Lost physical passes  
- No real-time analytics  

**EventPass** eliminates these problems using **digital ticketing with QR codes**, backed by a secure authentication system and real-time admin tools.

---

## ⭐ 2. Features  

### 👨‍🎓 Student (User)
- Register & login safely  
- Browse events  
- Register for an event  
- Get QR ticket on **Dashboard**  
- Download/view QR anytime  

### 🧑‍💼 Admin
- Secure login (admin email/password)  
- Create/manage events  
- Create volunteer accounts  
- View analytics  
- Export participant list (CSV)  
- Manage tickets  

### 🧑‍🤝‍🧑 Volunteer
- Login using volunteer credentials  
- Scan QR using scanner page  
- Validate ticket instantly  

---

## 🛠 3. Tech Stack  

### Frontend
- HTML  
- CSS  
- JavaScript  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- JWT  

---

## 📁 4. Folder Structure  

backend-h/  
frontend-h/  


---

## 🔗 5. API Endpoints  

Includes auth, event creation, ticket verification.

---

## 🧭 6. How It Works  

1. User logs in  
2. Registers for an event  
3. QR ticket generated  
4. Volunteer scans QR  
5. Admin monitors dashboard  

---

## ⚙ 7. Setup Instructions  

Create `.env`  

PORT=5000

MONGO_URI=mongodb://localhost:27017/eventmgmt
JWT_SECRET=super_secret_user_auth_key_change_this

QR_SECRET=super_secret_qr_token_key_change_this

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=email-password
FROM_EMAIL="Event Team <noreply@example.com>"

BASE_URL=http://localhost:3000
ADMIN_EMAIL=admin@event.com
ADMIN_PASSWORD=Admin123 

Open frontend:  
`index.html`

---

## 👨‍💻 Developer  
Rishabh Kumar
Rahul
Prasun Mittal
Yogendra Palhawat
