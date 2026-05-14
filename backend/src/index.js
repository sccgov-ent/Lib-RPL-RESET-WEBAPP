const app = require('./app');
const https = require('https');
const http = require('http');
const fs = require('fs');

const port = process.env.EXPRESS_PORT || 5001;

pfx = process.env.SSLKEYPATH;
passphrase = process.env.SSLKEYPASS;

if (!pfx || !passphrase) {
  console.error('SSL key path and passphrase must be set in environment variables SSLKEYPATH and SSLKEYPASS');
  process.exit(1);
}

var options = {
  pfx: fs.readFileSync(pfx),
  passphrase: passphrase
};

// Start the server
https.createServer(options, app).listen(port);
//http.createServer(app).listen(port);
console.log(`Backend listening on port ${port}`);
