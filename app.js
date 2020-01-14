// Required modules
const express = require('express');
const logger = require('morgan');
const path = require('path');


// Create and setup app
const app = express();
app.use(logger('dev'));


// Files and routes
app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Error 404 detection
app.use(function(req, res, next) {
    let err = new Error('Not found');
    err.status = 404;
    next(err);
});

// Error handler
app.use(function(err, req, res, next) {
    if (err.status != 404) console.error(err);
    res.redirect('/');
});


// Server listening
const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Server listening on port ' + port);
});
