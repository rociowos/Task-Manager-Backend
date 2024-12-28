require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'API para gestionar tareas: crear, leer, actualizar y eliminar tareas',
    },
    servers: [
      {
        url: 'http://localhost:5001/api', // Cambia esto si lo despliegas en un servidor
      },
    ],
  },
  apis: ['./routes/taskRoutes.js'], // Ruta de tu archivo de rutas
};

// Crear la documentación Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.use('/api/tasks', require('./routes/taskRoutes'));

// Manejo de errores
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor',
  });
});

// Inicia el servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
