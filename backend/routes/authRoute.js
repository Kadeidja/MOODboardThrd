const express = require('express');
const routerExpress = express.Router();
const {testLogin, signInFunc, logInFunc} = require('../controllers/authController')
const passport = require('passport')
//MIDDLEWARE
//routerExpress.use(cors(corsOption))

//ROUTES
routerExpress.get('/',testLogin);
//routerExpress.post('/signin',signInFunc);
//routerExpress.post('/login',logInFunc);

routerExpress.get('/login', passport.authenticate('openidconnect'));
routerExpress.get('/oauth2/redirect', passport.authenticate('openidconnect', {
  successRedirect: '/',
  failureRedirect: '/login'
}));




module.exports = routerExpress