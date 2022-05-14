//funzione view

exports.view = function(req, res){
  res.render('home', {
    title: 'Home '
  });
};
