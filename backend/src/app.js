const express = require('express');
const cors = require('cors');
const path = require('path');

const apiRouter = require('./routes/api');

const app = express();

app.use(express.json());
app.use(cors());

// Mount API routes
app.use('/api', apiRouter);

// Serve frontend build if present
const frontendBuild = path.join(__dirname, '..', '..', 'frontend', 'build');
app.use(express.static(frontendBuild));

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendBuild, 'index.html'));
});

module.exports = app;
