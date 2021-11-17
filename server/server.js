// const util = require('util');
// const encoder = new util.TextEncoder('utf-8');

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config(); // confidential info
const PORT = process.env.PORT
let app = express()

// allow cross origin
app.use(cors())

// allow for JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// specify where routes are written
app.use(require('./routes'))

// connect to mongodb through mongoose
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));

