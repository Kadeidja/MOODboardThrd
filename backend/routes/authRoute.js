const express = require('express');
const routerExpress = express.Router()
const cors = require('cors')
const {testLogin,signInFunc,logInFunc} = require('../controllers/authController')
const { corsOption } = require('../utils/corsoption');

//MIDDLEWARE
//routerExpress.use(cors(corsOption))

//ROUTES
routerExpress.get('/',testLogin)
routerExpress.post('/signin',signInFunc)
routerExpress.post('/login',logInFunc)

module.exports = routerExpress