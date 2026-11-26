require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Middleware para leer JSON (reemplaza a body-parser en Express moderno)
app.use(express.json());

// Importar las rutas
const postRoute = require('./routes/post');
app.use('/servicios', postRoute);

// Ruta por defecto
app.get('/', (req, res) => {
  res.send('prueba 1 respuesta del servidor');
});

const PORT = process.env.PORT || 10000;

// Conexión a la base de datos e inicio del servidor
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conexión correcta a MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error de conexión:', error.message);
  });