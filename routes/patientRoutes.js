// routes/patientRoutes.js
const express = require('express');
const fs = require('fs');
const router = express.Router();
//patient data file path
const patientDataPath = '../data/patientdata.json';

// Add patient route
router.post('/addPatient', (req, res) => {
    const user = req.session.user;
    const { pfirstname, plastname, pgender, pemail, pphone, pdob, paddress } = req.body;
    let patients = {};
    if (!user) {
        return res.status(401).send('Unauthorized');
    }
    const queue = false
    const infocus = false
    const inattendance = false
    const diagnosis = "No Diagnosis Yet"
    const prescription = "No Prescription Yet"
    const patient = { pfirstname, plastname, pgender, pemail, pphone, pdob, paddress, useremail: user.email,queue,inattendance
    ,diagnosis,prescription, infocus
     };
    if (fs.existsSync(patientDataPath)) {
        const data = fs.readFileSync(patientDataPath);
        patients = JSON.parse(data);
    }
    const patientKey = `${pemail}${pdob}`;
    patients[patientKey] = patient;
    fs.writeFileSync(patientDataPath, JSON.stringify(patients, null, 2));
    res.redirect('/receptionist')
});

//delete patient records
router.post('/deletePatient', (req, res) => {
    const { id } = req.body;
    let patients = {};
    if (fs.existsSync(patientDataPath)) {
        const data = fs.readFileSync(patientDataPath);
        patients = JSON.parse(data);
    }
    delete patients[id];
    fs.writeFileSync(patientDataPath, JSON.stringify(patients, null, 2));
    res.redirect('/receptionist')
});

//take you to the page where all the dtails of the patient are displayed in a form
router.post('/editPatient', (req, res) => {
    const { id } = req.body;
    let patients = {};
    if (fs.existsSync(patientDataPath)) {
        const data = fs.readFileSync(patientDataPath);
        patients = JSON.parse(data);
    }
    const patient = patients[id];
    res.render('editpatientPage', { patient});
});

//edit patient records
router.post('/finaleditPatient', (req, res) => {
    const user = req.session.user;
    const { pfirstname, plastname, pgender, pemail, pphone, pdob, paddress } = req.body;
    let patients = {};
    if (fs.existsSync(patientDataPath)) {
        const data = fs.readFileSync(patientDataPath);
        patients = JSON.parse(data);
    }
    id = `${pemail}${pdob}`;
    const queue = true
    const infocus = false
    const inattendance = false
    const diagnosis = "No Diagnosis Yet"
    const prescription = "No Prescription Yet"
    const patient = { pfirstname, plastname, pgender, pemail, pphone, pdob, useremail:user.email, queue, inattendance, diagnosis, prescription, infocus };
    patients[id] = patient;
    fs.writeFileSync(patientDataPath, JSON.stringify(patients, null, 2));
    res.redirect('/receptionist')
});

// filter patients on receptionist page using either firstname or lastname
router.post('/filterPatients', (req, res) => {
    const { search } = req.body;
    let patients = {};
    if (fs.existsSync(patientDataPath)) {
        const data = fs.readFileSync(patientDataPath);
        patients = JSON.parse(data);
    }
    const filteredPatients = Object.values(patients).filter((patient) => {
        return patient.pfirstname.includes(search) || patient.plastname.includes(search);
    });
    patients= filteredPatients
    res.render('receptionistPage', { patientdata:patients });
});

//filter only patients whose data was inputted today
router.get('/filterTodayPatients', (req, res) => {
    let patients = {};
    if (fs.existsSync(patientDataPath)) {
        const data = fs.readFileSync(patientDataPath);
        patients = JSON.parse(data);
    }
    const filteredPatients = Object.values(patients).filter((patient) => {
        return patient.queue === true;
    });
    patients= filteredPatients
    res.render('receptionistPage', { patientdata:patients });
});

module.exports = router;
