var mysql = require("mysql");
var express = require("express");
var path = require("path");


/** MySQL Connection Boilerplate -- assumes MySQL is installed locally
 * Replace the user and password with your credentials
 * Run the schema.sql script in this folder to set up the Database
 */
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "MIW"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log(`connection ID: ${connection.threadId}`);
});

/** Express Setup */
var app = express();
var PORT = 8080;
// include middlewre for static files
app.use(express.static("public"));
// include middleware for parsing json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/** DATA Routes
 * We're doing the routing in this main server.js file for simplicity
 * Your routes will likely be in another module
 * These are api data routes that return data extracted from the database as JSON
 */

// READ all books
app.get("/api/book", (request, response) => {
    // once we get the request, make the call to the database
    connection.query("SELECT * FROM books", (error, books) => {
        // our callback to the database is going to return a coollection of books
        // so instead of giving the paramter a generic name like "result", I called it books
        // check for an error condition
        if (error) { throw error }
        // return the results from the query as JSON
        response.json(books);
    });
});

// READ a book by its ID
app.get("/api/book/:id", (request, response) => {
    // using a route parameter to get the id for a specific book
    connection.query("SELECT * FROM books WHERE ?", 
        // using parameterization where the ?'s above are replaced with objects below
        [{"id": request.params.id}],
        (error, books) => {
            // Wait, why is the parameter called "books,"" and not "book"?
            // Because MySQL SELECT queries return an array, naming it books reminds us of this
            if (error) { throw error }
            // return the book from the result, which should be the first (and only)
            // item in the array of "books."
            response.json(books[0]);
        });
});

// CREATE a new book
app.post("/api/book", (request, response) => {
    // we're going to assume the book has been propery encoded in the body of the request
    let newBook = request.body;
    // we're further going to assume the book properties match the DB table column names
    // this way, we can pass the "newBook" object to our parameterized query 
    connection.query("INSERT INTO books SET ?",
        [newBook],
        (error, result) => {
            // The INSERT command does not return book data, 
            // just information about what the command did with the database
            if (error) { throw error }
            // a successful CREATE returns 201 - Created
            // also sending back the ID of the newly created object available in the result
            // this way, our client and use that information if it needs it
            response.status(201).send();
        });
});

// UPDATE an existing book
app.put("/api/book/:id", (request, resposne) => {
    // with this request, we're getting information from 2 sourcs
    // the ID of the book comes from the route parameter
    let bookId = request.params.id;
    // and the updated book object comes from the body
    let updatedBook = request.body;
    // again, we're assuming the incoming book object properties
    // match up with the database table column names
    connection.query("UPDATE books SET ? WHERE ?",
        [updatedBook, {"id": bookId}],
        (error, result) => {
            // Like the INSERT command, UDPATE does not return book data
            // just information about what the command did with the database
            if (error) { throw error }
            // Assume if there was no error, everything was OK
            response.status(200).end();
        });
});

// DELETE an existing book - this method will be called by the front end
app.delete("/api/book/:id", (request, response) => {
    // with this request, we just need the route parameter to identify the book
    connection.query("DELETE FROM books WHERE ?",
        [{"id": request.params.id}],
        (error, result) => {
            // The DELETE command does not return book data
            // just information about what the command did with the database
            if (error) { throw error }
            response.status(200).end();
        });
});

/** PAGE (HTML) Routes
 * I'm going to include a single page route, "/"
 * so that the home page, index.html will appear without being explicitly addressed
 */

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "public/index.html"));
});


// start listening for requests
app.listen(PORT, () => {
    console.log(`listing at localhost:${PORT}`);
});