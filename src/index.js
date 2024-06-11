// index.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productosRouter = require('./routes/productos');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/tu_basededatos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Conexión a MongoDB establecida'))
    .catch(err => console.error('Error al conectar a MongoDB', err));

app.use('/productos', productosRouter); // Usar el enrutador de productos

app.get('/', (req, res) => {
    res.send('¡Hola desde el servidor backend!');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
