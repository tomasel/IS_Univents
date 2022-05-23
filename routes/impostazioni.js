// funzione view

exports.view = function(req, res){
  res.render('impostazioni', {
    title: 'Impostazioni '
  });
  //res.render('users', { title: 'Usersii', users: users });
};
