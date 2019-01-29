const express = require('express');

// create the app
const app = express();
app.set('view engine', 'pug');

// routes
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/cards', (req, res) => {
    res.render('card', {
        prompt: "Who is buried in Grant's tomb?",
        hint: "Think about whose tomb it is."
    });
});
app.get('/hello', (req, res) => {
    res.render('hello');
});
// post route
app.post('/hello', (req, res) => {
    res.render('hello');
});

// start the app
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});