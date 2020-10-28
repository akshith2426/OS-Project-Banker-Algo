const LocalStrategy1 = require('passport-local').Strategy;
const bcrypt1 = require('bcryptjs');

// Load Client model
const Client = require('../models/Client');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy1({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      Client.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt1.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Client.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
