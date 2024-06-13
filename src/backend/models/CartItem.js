const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    cantidad: Number,
    subtotal: Number
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;
