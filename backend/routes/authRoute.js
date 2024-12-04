const express = require('express');
const routerExpress = express.Router();
const {testLogin, signInFunc, logInFunc} = require('../controllers/authController')
const passport = require('passport')
const TheUser = require('../models/authModel')
//FETCHING DATA
//GET all the users
routerExpress.get('http://localhost:5000/users', async (req,res) =>{
  try{
    const getUsers = await TheUser.find();
    res.json(getUsers);
  }catch(error){
    res.status(500).json({message:error.message})
  }
});

//GET one user
routerExpress.get('http://localhost:5000/user',async (req,res) =>{
  try {
    const getOneUser = await TheUser.findById(req.params.id);
    if (!getOneUser) {
      return res.status(404).json({message:'User not found'})
    } 
    res.json(getOneUser);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});




//MIDDLEWARE
//routerExpress.use(cors(corsOption))

//ROUTES
routerExpress.get('/',testLogin);
routerExpress.post('/signin',signInFunc);
routerExpress.post('/login',logInFunc);

routerExpress.get('/login', passport.authenticate('openidconnect'));
routerExpress.get('/oauth2/redirect', passport.authenticate('openidconnect', {
  successRedirect: '/',
  failureRedirect: '/login'
}));




module.exports = routerExpress