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
    subtotal: {type: Number, required: true},
    cantidad: {type: Number, required: true},
  });
  const missionVisionSchema = new mongoose.Schema({
    mision: { type: String, required: true },
    vision: { type: String, required: true }
  });

  const Producto = mongoose.model('Producto', productoSchema);
  const MissionVision = mongoose.model('MissionVision', missionVisionSchema);

  module.exports = Producto;
// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api', cartRoutes);
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Tienda_Elviejo', {
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
      const { productos } = req.body;
  
      // Guardar los productos en la base de datos
      await Producto.insertMany(productos);
  
      res.status(200).json({ message: 'Productos guardados correctamente' });
    } catch (error) {
      console.error('Error al guardar los productos:', error);
      res.status(500).json({ error: 'Error al guardar los productos' });
    }
  });
  


app.post('/api/update-mission-vision', (req, res) => {
    const { mision, vision } = req.body;
    MissionVision.findOneAndUpdate({}, { mision, vision }, { upsert: true, new: true })
        .then(doc => res.status(200).json(doc))
        .catch(err => {
            console.error('Error al actualizar misión y visión:', err);
            res.status(500).json({ error: 'Error al actualizar misión y visión' });
        });
});
app.get('/api/get-mission-vision', (req, res) => {
    MissionVision.findOne()
        .then(doc => res.status(200).json(doc))
        .catch(err => {
            console.error('Error al obtener misión y visión:', err);
            res.status(500).json({ error: 'Error al obtener misión y visión' });
        });
});
  
// Start server
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
