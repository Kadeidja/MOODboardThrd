const express = require('express');
const routerExpress = express.Router()
const cors = require('cors')
const {testLogin,signInFunc} = require('../controllers/authController')
//MIDDLEWARE

routerExpress.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)

routerExpress.get('/',testLogin)
routerExpress.post('/signin',signInFunc)

module.exports = routerExpress