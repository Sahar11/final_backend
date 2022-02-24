const router = require('express').Router();
const path = require('path')

module.exports = (db) => {
  // all routes will go here 
  router.get('/', async (req, res) => {

    //console.log("YESSSSSSS")
    try {

      const results = await db.query("SELECT * FROM reports");
      const siteUrl = `${req.protocol}://${req.headers.host}`;
      res.json(results.map((item) => {
        return {
          ...item,
          download_url: `${siteUrl}/report/download/${item.id}`,
          report_url: `${siteUrl}/${item.report}`
        };
      }));
    } catch (err) {
      console.log(err);
    }
  });
  router.get('/download/:id', async (req, res) => {

    try {

      const results = await db.query("SELECT * FROM reports WHERE id = $1 LIMIT 1 ", [req.params.id]);
      let filePath = "public/images/" + results[0].report;
      console.log(filePath);
      res.download(filePath, "Patient Report");
    } catch (err) {
      console.log(err);
    }
  });
  return router;
}
