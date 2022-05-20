var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var cors = require('cors');
var multer = require('multer');
var upload = multer();
const mongoose = require('mongoose');
const fs = require('fs');
var password = fs.readFileSync('./password.txt','utf8');

const authentication = require('./public/javascripts/authentication');
const evento = require('./public/script/evento');
const utente = require('./public/script/utente');


/**
  *Connection DB
*/
mongoose.connect('mongodb+srv://univents_database:${password}@univents.y54y3.mongodb.net/?retryWrites=true&w=majority')
.then ( () => {
  console.log("Connected to Database")
}); 

//instance
var app = express();
module.exports = app;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
const  NODE_ENV = process.env.NODE_ENV || 'development';
app.set('port', PORT);
app.set('env', NODE_ENV);

app.use(cors());
app.use(log('tiny'));

var site = require('./routes/site');
var comunita_studenti = require('./routes/comunita_studenti');
var home = require('./routes/home');
var universita = require('./routes/universita');

//setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.text());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(upload.array()); 
app.use(express.static(path.join(__dirname, 'public')));


//Routes
require('./routes/routes')(app);

// catch 404
app.use((req, res, next) => {
  // log.error(`Error 404 on ${req.url}.`);
  res.status(404).send({ status: 404, error: 'Not found' });
});

// catch errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.error || err.message;
  // log.error(`Error ${status} (${msg}) on ${req.method} ${req.url} with payload ${req.body}.`);
  res.status(status).send({ status, error: msg });
});

//for check on console
app.listen(PORT, () => {
  console.log(
      `Express Server started on Port ${app.get(
          'port'
      )} | Environment : ${app.get('env')}`
  );
});


//Start
// General
app.get('/', site.index);

//login
//app.get('/login', login.login);
app.use('/api/v1/authentication', authentication);

//home
app.get('/home', home.view);


//Comunità Studenti
app.get('/comunita_studenti', comunita_studenti.list_event);
//app.get('/comunita_studenti/crea_evento', comunita_studenti.create_event);
app.use('/api/v1/evento', evento);

//Università
app.get('/universita', universita.list_building);
app.get('/universita/edificio', universita.list_event);

//Impostazioni
//app.get('/impostazioni', impostazioni.view);
app.use('/api/v1/utente', utente);

//crea evento
app.post('/comunita_studenti/crea_evento', comunita_studenti.crea);




