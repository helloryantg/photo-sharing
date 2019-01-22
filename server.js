const express = require('express');
const path = require('path');
const http = require('http');
const favicon = require('serve-favicon');
const passport = require('passport');
const logger = require('morgan');

const app = express();
const httpServer = http.Server(app);

require('dotenv').config();
require('./config/database');

app.use(logger('dev'));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(passport.initialize());

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use(require('./config/auth'));

// Catch all route 
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var port = process.env.PORT || 3001;

httpServer.listen(port, function () {
    console.log(`Express app running on port ${port}`)
});