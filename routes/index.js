'use strict'

/**
 * Module dependencies.
 */

var express = require('../..');
var path = require('path');
var app = express();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');

var site = require('./site');
var comunita_studenti = require('./comunita_studenti');
var home = require('./home');
var impostazioni = require('./impostazioni');
var login = require('./login');
var universita = require('./universita');

module.exports = app;

// Config
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views'));

/* istanbul ignore next */
if (!module.parent) {
  app.use(logger('dev'));
}

app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));


// General
app.get('/', site.index);

//login
app.get('/login', login.login);

//home
app.get('/home', home.view);

//Comunità Studenti
app.get('/comunita_studenti', comunita_studenti.list_event);

app.get('/comunita_studenti/crea_evento', comunita_studenti.create_event);

//Università
app.get('/universita', universita.list_building);
app.get('/universita/edificio', universita.list_event);

//Impostazioni
app.get('/impostazioni', impostazioni.view);


/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
