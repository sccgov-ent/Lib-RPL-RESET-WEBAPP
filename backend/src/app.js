const express = require('express');
const cors = require('cors');
const path = require('path');

const apiRouter = require('./routes/api');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.json());
// Set up CORS to allow traffic between frontend and backend as well as the MS Cloud instance
allowlist = [process.env.CLOUD_INSTANCE, 'http://localhost:3000', 'http://localhost:3000/'];
var corsOptions = {
  origin: function (origin, callback) {
    if (allowlist.indexOf(origin) !== -1 && !!origin) {
      callback(null, true)
    }
    else if (!origin) {
      // Allow requests with no origin (like mobile apps or curl requests)
      callback(null, true);
    } else {
      callback(new Error(`${origin} Not allowed by CORS`))
    }
  }
};
app.use(cors(corsOptions));

// Mount API routes
app.use('/api', apiRouter);

// Serve frontend build if present
const frontendBuild = path.join(__dirname, '..', '..', 'frontend', 'build');
app.use(express.static(frontendBuild));

// Fallback to index.html for SPA routing
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendBuild, 'index.html'));
});

module.exports = app;
