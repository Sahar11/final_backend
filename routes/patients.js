
const router = require('express').Router();


module.exports = (db) => {
  // all routes will go here 
  router.get('/', (req, res) => {
    const command = "Select * from patients";
    db.query(command).then((data) => {
      res.json(data.rows);
    })
    
  });

  router.post('/', (req, res) => {
   console.log("SUbmitting...........");
    console.log(req.body);
    const command = "INSERT INTO patients (id,firstname,lastname, healthcard, dob, email, pwd) VALUES (2,'Maria', 'Hi', 12345, 1234567,'maria@gmail.com' ,1234);";
    res.end('Submitted.....');
    
  });
  
  return router;
}
