const userQueries = require("../src/db/queries.users.js");
const passport = require("passport");

module.exports = {
  index(req, res, next) {
    userQueries.getUser(req.params.id, (err, user) => {
      if(err) {
        res.send('error');
      } else {
        res.send({user});
      }
    });
  },

  create(req, res, next){
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };

    userQueries.createUser(newUser, (err, user) => {
      if(err){
        res.send("error");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.send({user});
        })
      }
    });
  },

  signIn(req, res, next){
    passport.authenticate("local")(req, res, function () {
      var user = req.user.dataValues;
      if(!req.user){
        res.send("error");
      } else {
        res.send({user});
      }
    })
  }
}
