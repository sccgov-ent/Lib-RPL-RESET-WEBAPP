const app = require('./app');
const config = require('../config') || {};
const https = require('https');
const fs = require('fs');

const port = process.env.PORT || config.port || 5000;

var options = {
  pfx: fs.readFileSync(process.env.SSLKEYPATH),
  passphrase: process.env.SSLKEYPASS
};

// Start the server
https.createServer(options, app).listen(443);
console.log(`Backend listening on port 443`);
