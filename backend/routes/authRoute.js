const express = require('express');
const routerExpress = express.Router();
const {testLogin, signInFunc, logInFunc} = require('../controllers/authController')
//MIDDLEWARE
//routerExpress.use(cors(corsOption))

//ROUTES
routerExpress.get('/',testLogin);
routerExpress.post('/signin',signInFunc);
routerExpress.post('/login',logInFunc);

module.exports = routerExpress