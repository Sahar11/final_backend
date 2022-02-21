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
const path = require("path");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const patientRoutes = require('./routes/patients');
const reportRoutes = require('./routes/report')

const dbHelpers = require('./helpers/dbHelpers')(db);
const labRoutes = require('./routes/lab');
//route import
const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());
const images = './public/images/';
app.use(express.static('public/images'))
//router
app.use("/report", reportRoutes(db));
app.use("/patient", patientRoutes(db));
app.use("/lab", labRoutes(db, path));
// app.get('/', (req, res) => {
// 	res.json({greetings: 'hello world'});
// });
app.use(fileUpload());




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

