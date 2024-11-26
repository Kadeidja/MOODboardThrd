const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose')


const BDDFRST = process.env.BDDS_OWNER
const BDDSCND = process.env.BDDS_PSWD
const BDDFRTH = process.env.BDD_CLUSTER
const appExpress = express();
const cookiePrsr = require('cookie-parser');


appExpress.use(express.json());
appExpress.use(cookiePrsr());
appExpress.use(express.urlencoded({extended: false}));
//DB connection

const uri = `mongodb+srv://${BDDFRST}:${BDDSCND}@moodboardcluster.rcntx.mongodb.net/?retryWrites=true&w=majority&appName=${BDDFRTH}`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);





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