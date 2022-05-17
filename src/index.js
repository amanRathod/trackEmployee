<<<<<<< HEAD
/* eslint-disable no-console */
=======
>>>>>>> 53a7a5843d75005efec012ab0bb064a548de358a
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const ConnectDB = require('./config/db');

const app = express();

dotenv.config();

ConnectDB();

// middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('common', {
    skip: function(req, res) { return res.statusCode < 400; },
    stream: process.stderr,
  }));
  console.log = () => {};
}

app.use('/', require('./routes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
<<<<<<< HEAD

module.exports = app;
=======
>>>>>>> 53a7a5843d75005efec012ab0bb064a548de358a
