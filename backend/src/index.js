const app = require('./app');
const config = require('../config') || {};

const port = process.env.PORT || config.port || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
