// funzione list_event

exports.list_event = function(req, res){
  res.render('comunita_studenti', {
    title: 'Comunita Studenti '
  });
  //res.render('users', { title: 'Usersii', users: users });
};
// funzione create_event
exports.create_event = function(req, res){
  res.render('comunita_studenti/crea_evento', {
    title: 'Crea Evento '
  });
};

