const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// create the app
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.set('view engine', 'pug');

// routes
app.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render('index', {name});
    } else {
        res.redirect('/hello');
    }
});
app.get('/cards', (req, res) => {
    res.render('card', {
        prompt: "Who is buried in Grant's tomb?",
        hint: "Think about whose tomb it is."
    });
});
app.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});
// post routes
app.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});
app.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

// start the app
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});