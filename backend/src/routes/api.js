require('dotenv').config();
require('emailjs')

const { SMTPClient } = require('emailjs');
const express = require('express');
const sql = require('mssql');
const router = express.Router();

console.log("Using ENV:", process.env.NODE_ENV);

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

router.post('/reset', (req, res) => {
  const { location } = req.body;
  console.log(`Reset request received for location: ${location}`);
  (async () => {
    console.log("Resetting RPL for location:", location);
    try {
      console.log('Connecting to database...');
      console.log(process.env.DB_SERVER);
      let config;
      if (process.env.NODE_ENV === 'development') {
        console.log('Using development database');
        config = {
          user: process.env.DB_USER||'',
          password: process.env.DB_PASSWORD||'',
          server: process.env.DB_SERVER||'localhost',
          database: process.env.DB_NAME_DEV||'',
          options: {
            encrypt: true,
            trustServerCertificate: true
          }
        }
      } else {
        console.log('Using production database');
        config = {
          user: process.env.DB_USER||'',
          password: process.env.DB_PASSWORD||'',
          server: process.env.DB_SERVER||'localhost',
          database: process.env.DB_NAME||'',
          options: {
            encrypt: true,
            trustServerCertificate: true
          }
        }
      }
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('location', sql.VarChar, location)
        .query("update request set fill_date = NULL, fill_location = NULL, fill_item# = NULL where fill_date = datediff(dd,'01 jan 1970', getdate()) and fill_location = @location and request_status = 0");
      console.log(`Affected rows: ${result.rowsAffected}`);
      res.json({ status: 'reset initiated', location, affectedRows: result.rowsAffected[0] });
      const client = new SMTPClient({host: process.env.EMAIL_HOST})
      if(process.env.NODE_ENV === 'development'){
        console.log("Using DEV email recipient");
        client.send({
          text:    `RPL reset initiated for location: ${location}\nAffected rows: ${result.rowsAffected}`,
          from:    process.env.EMAIL_FROM,
          to:      process.env.EMAIL_TO_DEV,
          subject: `TEST: RPL Reset Notification for ${location}`
        }, 
        (err, message) => { console.log(err || message); });
      }
      else{
        console.log("Using PROD email recipient");
        client.send({
          text:    `RPL reset initiated for location: ${location}\nAffected rows: ${result.rowsAffected}`,
          from:    process.env.EMAIL_FROM,
          to:      process.env.EMAIL_TO,
          subject: `TEST: RPL Reset Notification for ${location}`
        }, 
        (err, message) => { console.log(err || message); });
      }
    } catch (err) {
      console.error('Database error:', err);
      res.status(500).json({ status: 'error', message: 'Database error' });
    }
  })();
});

module.exports = router;
