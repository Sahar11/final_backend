const router = require('express').Router();


module.exports = (db) => {
  // all routes will go here 
  router.get('/', async (req, res) => {
    try {
  
        const results = await db.query('SELECT * FROM patients');
        res.json(results);
    } catch (err) {
        console.log(err);
    }
  });

  router.post('/', (req, res) => {
   console.log("Submitting...........");
    console.log(req.body);
    const command = "INSERT INTO patients (id,firstname,lastname, healthcard, dob, email, pwd) VALUES (2,'Maria', 'Hi', 12345, 1234567,'maria@gmail.com' ,1234);";
    res.end('Submitted.....');
    
  });
  
  return router;
}
