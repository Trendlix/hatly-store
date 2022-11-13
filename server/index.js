const express  = require('express');

const config = require('./src/config');
const api = require('./src/routes/index');

//initialize server
const app = express();

// set port
const port  = config.port || 3001;

// middleware to parse incoming request
app.use(express.json());

//default getaway
app.get('/', (_,res)=>{
  res.send('Waves Seasons');
});

app.use('/api/v1' , api);

//make server listen on the port
app.listen(port , ()=>{
  console.log('app running on port '+ port);
});