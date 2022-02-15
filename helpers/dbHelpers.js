module.exports = (db) => {

  const getReports = patient_name => {

    const query = {
        text: `SELECT * FROM report WHERE patient_name = $1` ,
        values: [patient_name]
    }

    return db
        .query(query)
        .then(result => result.rows[0])
        .catch((err) => err);
}

  const addReports = (name, health, upload, test, date) => {
    const query = {
        text: `INSERT INTO report (patient_name, patient_healthcard, report, test_type, date) VALUES ($1, $2, $3, $4, $5) RETURNING *` ,
        values: [name, health, upload, test, date]
    }

    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
}
  return {
    addReports,
    getReports
};
};
