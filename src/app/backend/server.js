// Importar las dependencias
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Configurar Express
const app = express();
app.use(bodyParser.json());

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/Tienda_Elviejo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conexión a la base de datos establecida'))
  .catch(err => console.error('Error al conectar con la base de datos:', err));

// Definir el esquema de Producto en el Carrito
const productoCarritoSchema = new mongoose.Schema({
  producto: {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true }
  },
  cantidad: { type: Number, required: true },
  subtotal: { type: Number, required: true }
});

// Definir el modelo de ProductoCarrito
const ProductoCarrito = mongoose.model('ProductoCarrito', productoCarritoSchema);

// Ruta para agregar un producto al carrito
app.post('/api/cart', (req, res) => {
  const { producto, cantidad, subtotal } = req.body;

  // Validar que 'producto' tenga la estructura correcta
  if (!producto || typeof producto.nombre !== 'string' || typeof producto.descripcion !== 'string' || typeof producto.imagen !== 'string' || typeof producto.precio !== 'number') {
    return res.status(400).json({ error: 'Datos de producto inválidos' });
  }

  // Crear una instancia del modelo ProductoCarrito con los datos recibidos
  const productoCarrito = new ProductoCarrito({
    producto,
    cantidad,
    subtotal
  });

  // Guardar el producto en la base de datos
  productoCarrito.save()
    .then(() => {
      res.status(201).json({ message: 'Producto agregado al carrito correctamente', producto: productoCarrito });
    })
    .catch(err => {
      console.error('Error al guardar el producto en la base de datos:', err);
      res.status(500).send('Error al guardar el producto en la base de datos');
    });
});

// Iniciar el servidor
const port = 5000;
app.listen(port, () => {
  console.log(`Servidor backend escuchando en el puerto ${port}`);
});
