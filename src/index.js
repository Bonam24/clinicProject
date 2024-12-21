const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const userRoutes = require('../routes/userRoutes');
const patientRoutes = require('../routes/patientRoutes');
const authRoutes = require('../routes/authRoutes');
const doctorActionRoutes = require('../routes/doctorActionRoutes');


const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', '../views');
app.set('view engine', 'hbs');
app.use(express.static('../public'));


// Session configuration
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 900000 },
    saveUninitialized: false
}));

// Use the route modules
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', patientRoutes);
app.use('/', doctorActionRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
