// express
const debug = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);
 
// pug template
app.set('view engine', 'pug');
app.set('views', './views'); // default

app.use(express.json()); // req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));


if( app.get('env') === 'development') {
    app.use(morgan('tiny'));
    // startupDebugger('Morgan enabled...');
    debug('Morgan enabled...');
}

// Db work...
// dbDebugger('Connected to the database...');

// app.use(bodyParser.json()); //need to parse HTTP request body

// middleware
app.use(logger);

// app.use(function(req, res, next) {
//     console.log('Authenticating...');
//     next();
// });

// app.listen(5020)
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// export PORT=5000 => run node index.js
const port = process.env.PORT || 5000;
var server = app.listen(port, function () {
  
    var host_name = server.address().address;
    var port_nmae = server.address().port;

    console.log("Example app listening at http://%s:%s", host_name, port_nmae);
});