// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

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
// for purposes of demonstration, this does not use a database or external service, 
// just assumes all users have a password of "password"
passport.use(new LocalStrategy(
  // simple, static login strategy based on the username
  // "baduser" will be rejected and invalid username, everyone else has a password of "password"
  function(username, password, done) {
    // When a user tries to sign in this code runs
    // If there's no user with the given email
    if (!username || username.toLowerCase() === "baduser") {
      return done(null, false, {
        message: "Incorrect username."
      });
    }
    // If there is a user with the given email, but the password the user gives us is incorrect
    else if (password != "password") {
      return done(null, false, {
        message: "Incorrect password."
      });
    }
    // If none of the above, return the user
    return done(null, {username});
  }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Routes for pages
app.get("/", (request, response) => {
  if (request.user) {
    response.redirect("/home");
  }
  res.sendFile(path.join(__dirname, "../public/signup.html"));
});

app.get("/login", (request, response) => {
  if (request.user) {
    response.redirect("/home");
  }
  res.sendFile(path.join(__dirname, "../public/login.html"));
})

app.get("/logout", function(request, response) {
  request.logout();
  response.redirect("/");
});

app.get("/home", 
  // the .get() method can accecpt more than one callback
  // in this case, we are including a middleware callback that checks to see if the request has a user
  // which means that the user has signed in. 
  // normally, this function would be required from a module for easier reuse, 
  // but we're showing you the full function here for convenience
  (request, response, next) => {
    if (request.user) {
      return next();
    }
  
    // If the user isn't logged in, redirect them to the login page
    return response.redirect("/");
  },
  // once the authentication middleware has executed, move on to regular route handling callback
  (request, response) => {
    response.sendFile(path.join(__dirname, "../public/home.html"));
  }
);

app.post("/api/login", 
  passport.authenticate("local"), 
  (request, response) => {
    response.json(request.user);
  }
);

app.post("/api/signup", function(request, response) {
  response.redirect(307, "/api/login");
});
// Requiring our routes
// require("./routes/html-routes.js")(app);
// require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
