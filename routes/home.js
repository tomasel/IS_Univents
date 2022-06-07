//funzione view

exports.view = function(req, res){
  console.group("rederizzo la home");
  res.render('home', {
    title: 'Home '
  });
};
