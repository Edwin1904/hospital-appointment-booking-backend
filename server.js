const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const DB = require('./config/postgres.config');

const app = express();
console.log(DB.select().table('books'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.json("Hello");
})

const hospitals = require('./controllers/hospitals');
const doctors = require('./controllers/doctors');
const appointmentBooking = require('./controllers/appointmentBooking');

app.get( '/hospitals', (req, res) => { hospitals.allHospitalDetailsHandler(req, res, DB)});
app.get( '/hospitalPage/:hospitalId', (req, res) => { hospitalDetails.hospitalDetailsByIdHandler(req, res, DB)});
app.get( '/doctors/:hospitalId', (req, res) => { doctors.doctorDetailsHandler(req, res, DB)});
app.post( '/booking-appointment/:hospitalId/:doctorId', (req, res) => { appointmentBooking.appointmentHandler(req, res, DB)});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("The server is listening on port", PORT);
});