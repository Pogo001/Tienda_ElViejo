const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');

// GET all items
router.get('/cart', async (req, res) => {
    try {
        const items = await CartItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new item
router.post('/cart', async (req, res) => {
    const item = new CartItem({
        nombre: req.body.nombre,
        precio: req.body.precio,
        cantidad: req.body.cantidad
    });

    try {
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
