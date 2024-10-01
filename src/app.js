
const express = require('express');
const router = require('./routes/authRoute'); 
const app = express();
const db = require('../src/models/index')

app.use(express.json());

app.use('/api/auth', router);

app.get('/', async(req,res)=>{
  try{
    await db.sequelize.authenticate();
    res.send('server is running');
  }catch(error){
    console.log('unable to conncet', error)
    res.status(500).send('Database connection error');

  }
})


module.exports = app;
