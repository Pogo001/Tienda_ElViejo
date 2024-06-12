const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cartRoutes = require('../backend/routes/cartRoutes');
const app = express();
const port = 3000;

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
  });
  const Producto = mongoose.model('Producto', productoSchema);
  module.exports = Producto;
// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api', cartRoutes);
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexión a MongoDB establecida");
}).catch(err => {
    console.error("Error al conectar a MongoDB", err);
});

// Routes
app.get('/', (req, res) => {
    res.send('¡Backend funcionando!');
});

app.post('/api/guardar-productos', async (req, res) => {
    try {
        // Recibir los productos desde el cuerpo de la solicitud
        const productos = req.body;
        // Guardar los productos en la base de datos
        await Producto.insertMany(productos);
        res.status(200).json({ message: 'Productos guardados correctamente' });
    } catch (error) {
        console.error('Error al guardar los productos:', error);
        res.status(500).json({ error: 'Error al guardar los productos' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
