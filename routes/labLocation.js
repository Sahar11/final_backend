const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here 
  router.get('/', async (req, res) => {
    try {
  
        const results = await db.query("SELECT addres, phone_number FROM locations");
        res.json(results);
      } catch (err) {
          console.log(err);
      }
      });
      return router;
    }
