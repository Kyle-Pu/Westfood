const util= require('util');
const encoder = new util.TextEncoder('utf-8');
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
require('dotenv').config(); // confidential info
const PORT = process.env.PORT
const app = express()

// specify where routes are written
app.use(require('./routes'))

// allow for JSON data
app.use(bodyParser.urlencoded({ extended: true }));


// connect to mongodb through mongoose
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));

