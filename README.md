# Nestify

Nestify is a full-stack web application inspired by Airbnb. It was built as a web development learning project to practice and implement real-world concepts such as authentication, authorization, CRUD operations, session management, image upload, and MVC architecture.

---

## Live Demo

You can view the live project here: https://nestify-web-app.onrender.com/listings
Demo Video : https://youtu.be/BRwpaH-uZgg

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
- Responsive design with smooth navigation bar
- Implements proper error handling for both client-side form validation and server-side API/database operations.

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

### Environment Variables

Create a `.env` file and add:

```
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_token

ATLAS_DB_URL=your_mongodb_atlas_url

SESSION_SECRET=your_secret_key
```


---

## Run the App

Start the server using:

```
nodemon app.js
```

Then open your browser and visit:

```
http://localhost:8080/listings
```

---

## Author

**Zobaida Jim**
[LinkedIn](https://www.linkedin.com/in/zobaida-jim/)


## Project Structure

```plaintext
Nestify/
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
│   │   ├── style.css
│   │   ├── rating.css
│   │   ├── filter.css
│   │   └── navbar.css
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
│   │   ├── navbar.ejs
│   │   └── filter.ejs
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
├── package.json
└── package-lock.json
