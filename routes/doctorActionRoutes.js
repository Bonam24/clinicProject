const express = require('express');
const fs = require('fs');
const router = express.Router();
//file path for patient data
const patientDataFilePath = '../data/patientdata.json';

//update the diagnosis and prescription
router.post('/updateDiagnosis', (req, res) => {
    const { id, diagnosis, prescription } = req.body;
    let patients = {};
    if (fs.existsSync(patientDataFilePath)) {
        const data = fs.readFileSync(patientDataFilePath);
        patients = JSON.parse(data);
    }
    console.log( " "+ diagnosis +" " +prescription+" "+id);
    
    patients[id].diagnosis = diagnosis;
    patients[id].prescription = prescription;
    patients[id].inattendance = false;
    //change the value of infocus to false for all patients
    for (const [key, patient] of Object.entries(patients)) {
        patient.infocus = false;
    }
    fs.writeFileSync(patientDataFilePath, JSON.stringify(patients, null, 2));
    res.redirect('/doctors')
});

//remove patient from queue
router.post('/removeFromQueue', (req, res) => {
    const { id } = req.body;
    let patients = {};
    if (fs.existsSync(patientDataFilePath)) {
        const data = fs.readFileSync(patientDataFilePath);
        patients = JSON.parse(data);
    }
    for (const [key, patient] of Object.entries(patients)) {
      patient.inattendance = key === id; // Set true for selected, false for others
    }
    console.log(id);
    patients[id].queue = false;
    fs.writeFileSync(patientDataFilePath, JSON.stringify(patients, null, 2));
    res.redirect('/doctors')
});

//code to edit patient diagnosis and prescription by the doctor
router.post('/editDiagnosis', (req, res) => {
    const { id, diagnosis, prescription } = req.body;
    let patients = {};
    //check if the id, diagnosis and prescriotions are valid
    if (!id || !diagnosis || !prescription) {
        return res.status(400).send('No record found');
    }
    if (fs.existsSync(patientDataFilePath)) {
        const data = fs.readFileSync(patientDataFilePath);
        patients = JSON.parse(data);
    }
    patients[id].diagnosis = diagnosis;
    patients[id].prescription = prescription;
    patients[id].queue=false;
    patients[id].inattendance=false
    //change every patients infocus vakue to false
    for (const [key, patient] of Object.entries(patients)) {
        patient.infocus = false;
    }
    fs.writeFileSync(patientDataFilePath, JSON.stringify(patients, null, 2));
    res.redirect('/doctors')
});

//code to change the value of patientinattendance for a patient record and put the patients record in focus
router.post('/putbackinattendance', (req, res) => {
    const {id} = req.body;
    let patients = {};
    if (fs.existsSync(patientDataFilePath)) {
        const data = fs.readFileSync(patientDataFilePath);
        patients = JSON.parse(data);
    }
    for (const [key, patient] of Object.entries(patients)) {
        patient.inattendance = key === id; // Set true for selected, false for others
      }
    fs.writeFileSync(patientDataFilePath, JSON.stringify(patients, null, 2));
    res.redirect('/doctors')
});

router.post('/selectedrecord', (req, res) => {
    const {id} = req.body;
  
    if (!id) {
      return res.status(400).json({ error: 'Selected key is required.' });
    }
    fs.readFile(patientDataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return res.status(500).json({ error: 'Error reading the file.' });
    }

    // Parse the JSON data
    const patients = JSON.parse(data);
    const checkEmail = patients[id].pemail;

    // Update the inattendance field for all patients
    for (const [key, patient] of Object.entries(patients)) {
      patient.inattendance = key === id; // Set true for selected, false for others
    }
    //remove every patient from infocus and put the selected patient in focus
    for (const [key, patient] of Object.entries(patients)) {
        patient.infocus = false;
    }
    //update all which have the same email
    for (const [key, patient] of Object.entries(patients)) {
        if(patient.pemail === checkEmail){
            patient.infocus = true;
        }
    }

    // Save the updated data back to the JSON file
    fs.writeFile(patientDataFilePath, JSON.stringify(patients, null, 2), (err) => {
      if (err) {
        console.error('Error writing the file:', err);
        return res.status(500).json({ error: 'Error writing the file.' });
      }
      res.redirect('/doctors');
    });
  });
});

//filter the patient 
router.post('/filterPatientsDoctor', (req, res) => {
  const { search } = req.body;
  let patients = {};
  if (fs.existsSync(patientDataFilePath)) {
      const data = fs.readFileSync(patientDataFilePath);
      patients = JSON.parse(data);
  }
  const filteredPatients = Object.values(patients).filter((patient) => {
      return patient.pfirstname.includes(search) || patient.plastname.includes(search);
  });
  patients= filteredPatients
  res.render('doctorsPage', { patientdata:patients });
});

module.exports = router;