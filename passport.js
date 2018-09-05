var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({_id: id}, function(err, user) {
    done(err, user);
  })
});

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done){
    User.findOne({ email: username}, function(err, user) {
      if(err) return done(err);
      if(!user){
        return done(null, false, {
          message: "Incorrect email or password"
        });
      }
      if(!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect email or passwords'
        });
      }
      return done(null, user);
    })
  }
));