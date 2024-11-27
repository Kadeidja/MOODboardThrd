const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const BDDFRST = process.env.BDDS_OWNER
const BDDSCND = process.env.BDDS_PSWD
const BDDFRTH = process.env.BDD_CLUSTER
const uri = `mongodb+srv://${BDDFRST}:${BDDSCND}@moodboardcluster.rcntx.mongodb.net/?retryWrites=true&w=majority&appName=${BDDFRTH}`;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const dBconnexion = async ()  =>{
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


module.exports = dBconnexion;