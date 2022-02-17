// declarations
require('dotenv').config()
// db connection
const connectionString = process.env.CONNECTION_STRING
const pgp = require("pg-promise")()
const db = pgp(connectionString)
const cors = require('cors');
const {ENVIROMENT, PORT} = process.env;
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require("path");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dbHelpers = require('./helpers/dbHelpers')(db);
const patientRoutes = require('./routes/patients');
const labRoutes = require('./routes/lab');
//route import
const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());
app.use(fileUpload());

//router
app.use("/patient", patientRoutes(db));
app.use("/lab", labRoutes(db, path));


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

