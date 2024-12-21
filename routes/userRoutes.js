// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const fs = require('fs')
//path for patient data
const patientDataPath = '../data/patientdata.json';

//go to the receptionis page
router.get('/receptionist', (req, res) => {
    const user = req.session.user;
    username = user.firstname + " " + user.lastname;
    let patients = {};
    if (fs.existsSync(patientDataPath)) {
        const data = fs.readFileSync(patientDataPath);
        patients = JSON.parse(data);
    }
    res.render('receptionistPage', { patientdata: patients, username });
});

//go to the doctor page
router.get('/doctors', (req, res) => {
    const user = req.session.user;
    username = user.firstname + " " + user.lastname;
    let patients = {};
    if (fs.existsSync(patientDataPath)) {
        const data = fs.readFileSync(patientDataPath);
        patients = JSON.parse(data);
    }
    // Filter out patients where queue is true and store in a new object
    const patientsInQueue = Object.fromEntries(
        Object.entries(patients).filter(([key, patient]) => patient.queue === true)
    );
    //filter out patients where queue is false and store in a new object
    const patientsNotInQueue = Object.fromEntries(
        Object.entries(patients).filter(([key, patient]) => patient.queue === false)
    );
    const patientInattendance = Object.fromEntries(
        Object.entries(patients).filter(([key, patient]) => patient.inattendance === true)
    );

    //patients in focus on the doctor page
    const patientInFocus = Object.fromEntries(
        Object.entries(patients).filter(([key, patient]) => patient.infocus === true)
    );

    
    
    res.render('doctorsPage', { patientdata: patients, patientsInQueue, patientInattendance, patientsNotInQueue, username,patientInFocus});
});

//this is to take the receptionist to the edit patient page
router.get('/editPatient', (req, res) => {
    res.render('editPatient');
})
//to go to the sign up page 
router.get('/signup', (req, res) => {
    res.render('signup');
})
module.exports = router;
