require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const http = require('http').Server(app);
// const io = require('socket.io')(http);
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const { json } = require('body-parser');

// const routes = require('./routes');
const httpsRedirect = require('./middlewares/https-redirect.middleware');

// Trust the headers that Heroku gives
app.enable('trust proxy');

app.use(httpsRedirect());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// app.use('/', routes);

// module.exports.io = io;
// module.exports = app;

http.listen(process.env.PORT, () => {
  console.log(`Up on port ${process.env.PORT}.`);

  // // start chron jobs
  // require('./chron-jobs/index')(io);
});
