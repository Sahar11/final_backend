const router = require('express').Router();
// const {
//   getReports
// } = require('../helpers/dbHelpers');

module.exports = (db) => {

  router.post('/', async (req, res) => {

  const {
    patient_id, fullname, health, filename, test, date
  } = req.body;
  console.log("Req.Body: ",req.body);
  const file = req.files.file;
  //console.log("File object ",file)
  // file.mv(`${__dirname}/public/images/${req.files.file.name}.pdf`, function(err) {
  //   if (err) {
  //     return res.status(500).send(err);
  //   }
  // })

try {
  const results = await db.query(
      `INSERT INTO reports (patient_id, patient_name, patient_healthcard, report, test_type, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *` ,
      [patient_id, fullname, health, filename, test, date]
    );
    res.json(results)
  } catch (err) {
      console.log(err);
  }
 // }
  //res.end("Submitted the data");
});

//   router.post('/', (req, res) => {

//     const {
//       name, health, upload, test, date
//     } = req.body;
//     console.log(req.body);
//     const query = {
//       text: `INSERT INTO reports (patient_name, patient_healthcard, report, test_type, date) VALUES ($1, $2, $3, $4, $5) RETURNING *` ,
//       values: [name, health, upload, test, date]
//   }
//     db.query(query)
//           .then(result => {
//             console.log("RESULT",result)
//             return result.rows[0]
//           }
//             )
//           .catch(err => err);
   
// })
  return router;
}