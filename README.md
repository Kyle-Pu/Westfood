# Westfood

To run, clone repo and run `npm install` in both the `client` and `server` directories.

Adding the following to Westfood/server/node_modules/whatwg-url/lib/encoding.js may be needed

'"use strict";
var util= require('util');
var utf8Encoder = new util.TextEncoder('utf-8');
const utf8Decoder = new util.TextDecoder("utf-8");

Then enter 'npm start' in both the 'client' and 'server' directories.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
