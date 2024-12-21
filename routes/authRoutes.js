// routes/authRoutes.js
const express = require('express');
const fs = require('fs');
const router = express.Router();
const UserType = require('../data/usertype.js');
//userdata file path
const userDataFilePath = '../data/userdata.json';


// Sign up route
router.post('/signup', (req, res) => {
    const { firstname, lastname, email, usertype, password,confirm_password } = req.body;
    if (!firstname || !lastname || !email || !usertype || !password) {
        return res.status(400).send('All fields are required');
    }
    if (password !== confirm_password) {
        return res.status(400).send('Passwords do not match');
    }
    const newUser = { firstname, lastname, email, usertype, password };
    let users = {};
    if (fs.existsSync(userDataFilePath)) {
        const data = fs.readFileSync(userDataFilePath);
        users = JSON.parse(data);
    }
    const userKey = email;
    users[userKey] = newUser;
    fs.writeFileSync(userDataFilePath, JSON.stringify(users, null, 2));
    console.log('User successfully added:', newUser);
    res.render('login');
});

// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('All fields are required');
    }
    const users = JSON.parse(fs.readFileSync(userDataFilePath));
    const user = users[email];
    if (!user || user.password !== password) {
        return res.status(401).send('Invalid email or password');
    }
    req.session.user = user;
    res.redirect('/profile');
});

//logout using sessions
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Implementation of the login using sessions
router.get('/profile', (req, res) => {
    const user = req.session.user;
    if (!user) {
        return res.redirect('/signup');
    }
    if (user.usertype === 'Doctor') {
        return res.redirect('/doctors');
    } else if (user.usertype === 'Receptionist') {
        return res.redirect('/receptionist');
    }
    res.render('login', { user });
});


 //this is to ensure when already had an account the can just click to the login page
 router.get('/', (req, res) => {
    res.render('login');
})
//signup page
router.get('/signup', (req, res) => {
    res.render('signup', { UserType });
})

module.exports = router;
