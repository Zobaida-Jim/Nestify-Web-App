# Nestify

Nestify is a full-stack web application inspired by Airbnb. It was built as a web development learning project to practice and implement real-world concepts such as authentication, authorization, CRUD operations, session management, image upload, and MVC architecture.

---

## Features

- Authentication and authorization for users, listings, and reviews  
- Create, edit, and delete listings  
- Add, edit, and manage reviews  
- Map integration based on listing location  
- Search listings by country  
- Image upload for listings  
- Flash messages for user feedback  
- Session management with persistent login  
- MVC architecture for clean and scalable code  
- Responsive and smooth navigation bar  

---

## Tech Stack

Frontend: HTML, CSS, Bootstrap, EJS  
Backend: Node.js, Express.js  
Database: MongoDB Atlas (Mongoose)  
Authentication: Passport.js  
Maps: Mapbox
Image Upload: Cloudinary  
Session Management: express-session, connect-mongo 

---

## Project Structure

```plaintext
Nestify/
│
├── controllers/
│   ├── listings.js
│   ├── review.js
│   └── user.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/
│   ├── CSS/
│   │   ├── style.js
│   │   └── rating.js
│   │
│   └── JS/
│       ├── map.js
│       └── script.js
│
├── utils/
│   ├── ExpressError.js
│   └── WrapAsync.js
│
├── views/
│   ├── includes/
│   │   ├── flash.ejs
│   │   ├── footer.ejs
│   │   └── navbar.ejs
│   │
│   ├── layouts/
│   │   └── boilerplate.ejs
│   │
│   ├── listings/
│   │   ├── edit.ejs
│   │   ├── error.ejs
│   │   ├── index.ejs
│   │   ├── new.ejs
│   │   ├── profile.ejs
│   │   └── show.ejs
│   │
│   ├── user/
│   │   ├── login.ejs
│   │   └── signup.ejs
│   │
│   └── footers/
│       ├── privacy.ejs
│       └── terms.ejs
│
├── app.js
├── cloudConfig.js
├── middleware.js
├── Schema.js
└── package.json 
