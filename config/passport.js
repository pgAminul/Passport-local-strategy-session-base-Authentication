const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../module/user.module');
const bcrypt = require('bcrypt');

// Define the LocalStrategy
passport.use(new LocalStrategy({
  usernameField: 'useremail',
  passwordField: 'password'
}, async (useremail, password, done) => {
  try {
    const user = await User.findOne({ useremail: useremail });
    if (!user) {
      return done(null, false, { message: 'Incorrect user email.' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});
