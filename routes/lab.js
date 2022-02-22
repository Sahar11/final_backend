const router = require('express').Router();

module.exports = (db, path) => {

  router.post('/', async (req, res) => {

    const {
      fullname, health, file, test, date
    } = req.body;
    console.log("Req.Body: ", req.body);

    const fileupload = req.files.file;
    //console.log("File object ",fileupload);

    const fileName = fileupload.name;
    console.log(fileName);
    fileupload.mv(path.join(__dirname + '/../public', 'images/') + fileName, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
    });

    try {
      const results = await db.query(
        `INSERT INTO reports (patient_name, patient_healthcard, report, test_type, date) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [fullname, health, fileName, test, date]
      );

      res.json(results);
    } catch (err) {
      console.log(err);
    }

  });

  return router;
};