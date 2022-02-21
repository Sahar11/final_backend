// declarations
require('dotenv').config()
// db connection
const connectionString = process.env.CONNECTION_STRING
const pgp = require("pg-promise")()
const db = pgp(connectionString)
const cors = require('cors');
const { ENVIROMENT, PORT } = process.env;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const patientRoutes = require('./routes/patients');
const reportRoutes = require('./routes/report');
const locationRoutes = require('./routes/labLocation');
const bookingRoutes = require('./routes/booking');
//route import
const app = express();
app.use(cors());


// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());
const images = './public/images/';
app.use(express.static('public/images'))
//router
app.use("/patient", patientRoutes());
app.use("/report", reportRoutes(db));
app.use("/location", locationRoutes(db));
// app.use("/booking", bookingRoutes(db));

app.post('/booking', async (req, res) => {
  const { location, date, time, firstName, lastName, email, phoneNumber } = req.body;
  console.log(req.body);
  try {
    const results = await db.query(`INSERT INTO appointments(firstName,lastName,phoneNumber,email,location_id,appointment_date,appointment_time) VALUES($1,$2,$3,$4,$5,$6,$7)`, [firstName, lastName, phoneNumber, email, location, date, time]);
    res.json({status:true});
  } catch (err) {
    console.log(err);
    res.json({status:false});
  }
});

app.get('/', async (req, res) => {
  try {

    const results = await db.query('SELECT * FROM patients');
    res.json(results);
  } catch (err) {
    console.log(err);
  }
});


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

module.exports = app;

