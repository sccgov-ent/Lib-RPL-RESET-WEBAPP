const app = require('./app');
const config = require('../config') || {};
const https = require('https');
const fs = require('fs');

const port = process.env.PORT || config.port || 5001;

pfx = process.env.SSLKEYPATH;
passphrase = process.env.SSLKEYPASS;

var options = {
  pfx: fs.readFileSync(pfx),
  passphrase: passphrase
};

// Start the server
https.createServer(options, app).listen(port);
console.log(`Backend listening on port ${port}`);
