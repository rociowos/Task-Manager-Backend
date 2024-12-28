const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((error) => console.error('Error al conectar a MongoDB:', error));
