// routes/productos.js

const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');

// Manejar la solicitud POST para crear un nuevo producto
router.post('/', (req, res) => {
  const nuevoProducto = req.body;
  
  // Crear un nuevo documento de producto utilizando el modelo Mongoose
  Producto.create(nuevoProducto)
    .then(productoCreado => {
      console.log('Producto creado:', productoCreado);
      res.status(201).json(productoCreado); // Responder con el producto creado
    })
    .catch(error => {
      console.error('Error al crear el producto:', error);
      res.status(500).json({ error: 'Error al crear el producto' }); // Responder con un error
    });
});

module.exports = router;
