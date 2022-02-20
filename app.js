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
const patientRoutes = require('./routes/patients');
//const loginRoutes = require('./routes/login');
const signUpRoutes = require('./routes/signUp');
const loginRoutes = require('./routes/login');
//const pino = require('express-pino-logger')();
const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);


//route import
const app = express();
app.use(cors());


// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(pino);

//router
app.use("/patient", patientRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/SignUp", signUpRoutes(db));

// app.get('/', (req, res) => {
// 	res.json({greetings: 'hello world'});
// });

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

