module.exports = function (app) {
  /*
  * Routes
  */
  app.use('/evento', require('./routes/evento'));

};
