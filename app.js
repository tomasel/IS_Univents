var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');


var app = express();

var site = require('./routes/site');
var comunita_studenti = require('./routes/comunita_studenti');
var home = require('./routes/home');
var impostazioni = require('./routes/impostazioni');
var login = require('./routes/login');
var universita = require('./routes/universita');

module.exports = app;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


/* istanbul ignore next */
if (!module.parent) {
  app.use(logger('dev'));
}

app.use(logger('dev'));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Pagine di visualizzazione
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

