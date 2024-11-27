const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors')
const dBconnexion = require('./utils/dbconnect');
const cookiePrsr = require('cookie-parser');
const { corsOptions } = require('./utils/corsoption');

//EXPRESS IITIALIZATION
const appExpress = express();

//MIDDLEWARES
appExpress.use(cors(corsOptions));
appExpress.use(express.json());
appExpress.use(express.urlencoded({extended: false}));
appExpress.use(cookiePrsr());

//IMPORT DB CONNEXION
dBconnexion();

//GRAND ROUTE
appExpress.use('/', require('./routes/authRoute'));

//PORT CONNEXION-------------------------------------------------------------------------------------
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
const port = normalizePort(process.env.MY_BCK_PORT || 4000)
 
appExpress.listen(
  port,() =>{
      console.log(`Server is running on port ${port}`);
  }
);