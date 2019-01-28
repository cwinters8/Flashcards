const express = require('express');
// create the app
const app = express();

// set up a route
app.get('/', (request, response) => {
    response.send("I love treehouse!");
});

// start the app
app.listen(3000);