/* throws some JS silent errors
fixes mistakes to improve JS optimization
prohobits syntax likely to be defined in future versions of ECMAScript */
'use strict'
// Node.js framework with HTTP utility methods & middleware
const express = require('express');
const app = express();
// server can accept argument specifiying a custom port (e.g. for heroku)
const port = process.env.PORT || 3000;
// utilities for working with file & directory paths
const path = require ('path');
// parse incoming request bodies under req.body property
const bodyParser = require('body-parser');
// file I/O reading & writing synchronously & asynchronously
const fs = require ('fs');
// bypass CORS security
const cors = require('cors');

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// hello world
app.get('/index', function(req, res) {
  console.log('here');
  res.render('index');
});


// if request hasn't been sent by end of app, send a 500 error and end the request
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.end();
});

// listen on the given port
app.listen(port, function() {
  console.log('Listening on port', port);
});
