const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userData = require('../module/user.module');

const HomePage =  (req, res) => {
  try {
    res.render('index');
  } catch (error) {
    res.status(500).end(error.message);
  }
}

const registerPage= (req, res) => {
  try {
    res.render('register');
  } catch (error) {
    res.status(500).end(error.message);
  }
}

const registetionForm = async (req, res) => {
  try {
    const user = await userData.findOne({ useremail: req.body.useremail });
    if (user) {
      return res.status(400).send('User already exists');
    }

    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = new userData({
      username: req.body.username,
      useremail: req.body.useremail,
      password: hash
    });

    await newUser.save();
    res.status(201).redirect('login');
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
}

const getLogin =(req, res) => {
  try {
    res.render('login');
  } catch (error) {
    res.status(500).end(error.message);
  }
}

const SuccessfullLogin =(req, res, next) => {
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/profile' 
  })(req, res, next);
}

const profile =(req, res) => {
  if (req.isAuthenticated()) {
    res.render('profile');
  } else {
  
    res.redirect('/login');
  }
}

const logOut = (req, res) => {
try {
    req.logout(err => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
} catch (error) {
  res.status(500).send(error.message)
}
}


// middileware setup here 

const checkLogeedIn = (req,res,next)=>{
if(req.isAuthenticated()){
  return res.redirect('/profile')
}
next()
}
const checkProfile = (req,res,next)=>{
  if(req.isAuthenticated()){
    return next()
  }else{
    res.redirect('/login')
  }
}

module.exports = { HomePage, registerPage,getLogin,registetionForm,SuccessfullLogin, profile, logOut,checkLogeedIn ,checkProfile};

