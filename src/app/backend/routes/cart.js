const express = require('express');
const router = express.Router();

// Ruta para agregar un producto al carrito
router.post('/', (req, res) => {
  // Lógica para agregar el producto al carrito en la base de datos
  res.send({ message: 'Producto agregado al carrito correctamente' });
});

module.exports = router;
