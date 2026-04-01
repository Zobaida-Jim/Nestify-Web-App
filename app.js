if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const { MongoStore } = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
console.log("DB URL:", process.env.ATLASDB_URL);
const dbUrl = process.env.ATLASDB_URL;

// getting-started.js
main()
.then(() => {
    console.log("Connected to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true})); 
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public"))); //To use all static file

//Use Mongo-session store instead of local store
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto : { //For sensitive data to encrypt it
        secret:  process.env.SECRET,
    },
    touchAfter: 24 * 3600, //in seconds not in mili seconds
})

//to detect mongo error
store.on("error", () => {
    console.log ("Error in mongo store", err);
})

//Define session options
const sessionOptions = {
    store, //Mongo session store
    secret : process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

//Root
app.get("/", (req, res) => {
    res.redirect("/listings");
})


//Use session
app.use(session(sessionOptions));
//use connect-flash
app.use(flash()); //Must use after session and before all routes

//Implement passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware for flash message
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.deleted = req.flash("deleted");
    res.locals.update = req.flash("update");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();//Must write this otherwise we will stucked here
})

//Demo User
// app.get("/demouser", async(req, res) => {
//     let fakeUser = new User ({
//         email: "fakeuser@gmail.com",
//         username: "Developer"
//     })

//     let registeredUser = await User.register(fakeUser, "password1234"); //register method will save this user with that password.
//     res.send(registeredUser);
// })

//For listing.js
app.use("/listings", listingRouter);

//For Review
app.use("/listings/:id/reviews", reviewRouter);

//For User
app.use("/", userRouter); 

app.get("/privacy", (req, res) => {
    res.render("./footers/privacy.ejs");
})
app.get("/terms", (req, res) => {
    res.render("./footers/terms.ejs");
})

//Profile
app.get("/profile", (req, res) => {
    const user = req.user;
    res.render("./listings/profile.ejs", {user});
})

//For invalid Route
app.use((req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
})

//Custom Error Handilng middleware
app.use((err, req, res, next) => {
    let {statusCode = 500, message = "SOMTHING WENT WRONG"} = err;
    res.status(statusCode).render("listings/error.ejs", { message });
    //res.status(statusCode).send(message);
})

// app.get("/test", async(req, res) => {
//     let sampleListing = new Listing ({
//         title : "My new Vila",
//         description : "By the beatch",
//         price : 12000,
//         location : "Cox's Bazar",
//         country : "Bangladesh"
//     });

//     await sampleListing.save();
//     console.log("saved");
//     res.send("Succsessful"); 
// })

app.listen(8080, () => {
    console.log("Server is listening to port 8080");
})