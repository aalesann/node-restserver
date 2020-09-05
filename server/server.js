require('./config/config')

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use ( require('./routes/usuario') )

// mongoose.connect('mongodb://127.0.0.1/cafe', (err, res)=> {
// if( err ) throw err;
// console.log('Base de datos ONLINE');
// })


const conectar = async () => {
  await mongoose.connect(process.env.URLDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
}
conectar()
  .then( resp => {
    console.log('Conectado a la base de datos cafe');
  })
  .catch( err => {
    console.log( "ERROR AL CONECTAR: ", err )
  })


app.listen(process.env.PORT, () => {
  console.log('Escuchando el puerto 3000');
})