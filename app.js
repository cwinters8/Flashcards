const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// create the app
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/static', express.static('public'));

app.set('view engine', 'pug');

// import routes
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');
// use routes
app.use(mainRoutes);
app.use('/cards', cardRoutes);

// 404 handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error middleware
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

// start the app
app.listen(3000, () => {
    console.log('The application is running on localhost:3000!');
});