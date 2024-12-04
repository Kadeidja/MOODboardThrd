const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const dBconnexion = require('./utils/dbconnect');
const cookiePrsr = require('cookie-parser');
const { corsOption } = require('./utils/corsoption');
const authRoutes = require('./routes/authRoute')
const bodyParser = require('body-parser')

//EXPRESS IITIALIZATION
const appExpress = express();

//MIDDLEWARES
appExpress.use(cors(corsOption));
appExpress.use(bodyParser.json())
appExpress.use(express.json());
appExpress.use(express.urlencoded({extended: false}));
appExpress.use(cookiePrsr());

//IMPORT DB CONNEXION
dBconnexion();

//GRAND ROUTE
appExpress.use('/', authRoutes);


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


const port = normalizePort(process.env.MY_BCK_PORT || 5000);
appExpress.listen( port,() =>{
      console.log(`Server is running on port ${port}`);
  }
);