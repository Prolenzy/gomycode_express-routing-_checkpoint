const express = require('express');
const app = express();
const PORT = 3000;

//Middleware to check working hours
const checkWorkingHours = (req, res, next) => {
    const currentDay = new Date().getDay();
    const currentHour = new Date().getHours();

    if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour <= 17) {
        next(); // Continue to the next middleware
    } else {
        res.send('The website is only available during working hours (Monday to Friday, from 9 to 17).')
    }
};

app.set('view engine', 'pug'); //Set Pug as the view engine 
app.set('views', './views'); //Set the views directory 

app.use(express.static('public')); // Serve static files from the public directory 
app.use(checkWorkingHours); //Use the custom middleware for working hours check

//Define routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});