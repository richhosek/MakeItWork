$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user").then(function(data) {
    console.log("USER",data);
    $(".member-name").text(data.username);
  });
});
