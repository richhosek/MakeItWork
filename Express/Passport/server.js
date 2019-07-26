var path = require("path");
// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

// Setting up port 
var PORT = process.env.PORT || 8080;

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "miw", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// passport configuration
// this creates a simple local strategy 
// for purposes of demonstration, this does NOT use a database or external service, 
// just assumes all users have a password of "password"
passport.use(new LocalStrategy(
  // simple, static login strategy based on the username
  // "baduser" will be rejected and invalid username, everyone else has a password of "password"
  function(username, password, done) {
    // When a user tries to sign in this code runs
    // If we're trying to log in with an invalide username
    if (!username || username.toLowerCase() === "baduser") {
      return done(null, false, {
        message: "Incorrect username."
      });
    }
    // If we're using an invalid password
    else if (password != "password") {
      return done(null, false, {
        message: "Incorrect password."
      });
    }
    // successful login, return the user -- which consists of an object holding the username
    let user = {username};  
    return done(null, user);
  }
));

// In order to help keep authentication state across HTTP requests,
// passport needs methods to serialize and deseralize the user
// this is a simple example, the serialzed user is the username -- which is stored in the session.
passport.serializeUser(function(user, callback) {
  callback(null, user.username);
});

// the deserialized user is an object with a username property -- which is availabe as request.user
passport.deserializeUser(function(username, callback) {
  callback(null, {username});
});

// Routes for pages
// for this example, send requests for the site root to the /home route
app.get("/", (request, response) => {
  response.redirect("/home");
});

// if there is no authenticated user, requests will get sent here and the user will see a login form
app.get("/login", (request, response) => {
  response.sendFile(path.join(__dirname, "./public/login.html"));
})

// this route will logout the current user and redirect to the login page
app.get("/logout", (request, response) => {
  request.logout();
  response.redirect("/login");
});

// Here we are creating a callback function to be used for routes that require authentication
const passportAuthenticationMiddleware = (request, response, next) => {
  if (request.user) {
    return next();
  }
  // If the user isn't logged in, redirect them to the login page
  return response.redirect("/login");
}
// this is an example of a page route that you want secured.
// you pass it the authentication middleware callback as the second parameter
// if there is no authenticated user, it redirects to the login page
app.get("/home", 
  // the .get() method can accecpt more than one callback
  // in this case, we are including a middleware callback that checks to see if the request has a user
  // which means that the user has signed in. 
  passportAuthenticationMiddleware,
  // once the authentication middleware has executed, move on to regular route handling callback
  (request, response) => {
    response.sendFile(path.join(__dirname, "./public/home.html"));
  }
);

// API Routes
// when we submit the login form, it posts a request to this route,
// which uses passport authnetication, in this case the local strategy we defined above
// then it returns the deserialized user
// 401 responses are handled by the local strategy
app.post("/api/login", 
  passport.authenticate("local"), 
  (request, response) => {
    response.json(request.user);
  }
);

// allows us to provide a way for the front end to get the currently logged in user
app.get("/api/user", (request, response) => {
  // send back the request.user -- if there is one
  response.json(request.user);
})

app.listen(PORT, function() {
  console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
});
