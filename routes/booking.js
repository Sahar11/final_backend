
const router = require('express').Router();


module.exports = (db) => {
  router.post('/booking', async (req, res) => {
    const { location, date, time, firstName, lastName, email, phoneNumber } = req.body;
    console.log(req.body);
    // try {
    //   const results = await db.query('SELECT * FROM patients');
    //   res.json(results);
    // } catch (err) {
    //   console.log(err);
    // }
  });

  return router;
};
