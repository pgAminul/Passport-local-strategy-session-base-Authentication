const express = require('express');
const router = express.Router();

const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { HomePage, registerPage, getLogin, registetionForm, SuccessfullLogin, profile, logOut, checkLogeedIn, checkProfile } = require('../controller/controller');
require('dotenv').config();
require('../config/passport'); 


// Create the Express app
const app = express();

// Middleware
app.set('trust proxy', 1);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: 'sessions'
  }),
  cookie: { secure: false } 
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);



// Routes
router.get('/', HomePage);
router.get('/register', registerPage );
router.post('/register', registetionForm);
router.get('/login', checkLogeedIn, getLogin );
router.post('/login', SuccessfullLogin);
router.get('/profile', checkProfile, profile);
router.get('/logout',logOut);

module.exports = app;
