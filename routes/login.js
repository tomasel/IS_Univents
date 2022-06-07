//funzione render
const fs = require("fs");
exports.login = function(req, res){
  fs.writeFileSync("token.txt","","utf8");
    res.render('login', {
      title: 'Login',
    });
  };

