// declarations
require('dotenv').config()
// db connection
const connectionString = process.env.CONNECTION_STRING
const pgp = require("pg-promise")()
const db = pgp(connectionString)
const cors = require('cors');
const { ENVIROMENT, PORT } = process.env;
const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const patientRoutes = require('./routes/patients');
const reportRoutes = require('./routes/report');
const signUpRoutes = require('./routes/signUp');
const loginRoutes = require('./routes/login');
const labLocationRoutes = require('./routes/labLocation');
const labReportRoute = require('./routes/labReports');
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const app = express();
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

const dbHelpers = require('./helpers/dbHelpers')(db);
const labRoutes = require('./routes/lab');
const bookingRoutes = require('./routes/booking');
const appointmentRoutes = require('./routes/appointment');

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// middleware setup
app.use(morgan(ENVIROMENT));

const images = './public/images/';
app.use(express.static('public/images'))
app.use(bodyParser.urlencoded({ extended: false }));

//router
app.use("/report", reportRoutes(db));
app.use("/patient", patientRoutes(db));
app.use("/lab", labRoutes(db, path));
app.use("/location", labLocationRoutes(db));
app.use("/appointment", appointmentRoutes(db));
app.use('/labReport', labReportRoute(db));

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
//twilio
app.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
})


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

module.exports = app;

