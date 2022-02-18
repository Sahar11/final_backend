const router = require('express').Router();
// const {
//   getReports
// } = require('../helpers/dbHelpers');

module.exports = (db, path) => {

  router.post('/', async (req, res) => {

  const {
    patient_id, fullname, health, file, test, date
  } = req.body;
  console.log("Req.Body: ",req.body);

  const fileupload = req.files.file;
  //console.log("File object ",fileupload);

  fileName = fileupload.name;
 console.log(fileName);
  const way = fileupload.mv(path.join(__dirname+ '/../public', 'images/')+fileName, function(err) {
    if (err) {
      return res.status(500).send(err);
    }
  })
const filePath = path.join(__dirname+ '/../public', 'images/')+fileName;
try {
  const results = await db.query(
      `INSERT INTO reports (patient_id, patient_name, patient_healthcard, report, test_type, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *` ,
      [patient_id, fullname, health, fileName, test, date]
    );
    res.json(results)
  } catch (err) {
      console.log(err);
  }
 // }
  //res.end("Submitted the data");
});

  return router;
}