require('./config/config')

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Configuración global de rutas
app.use ( require('./routes/index'));

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