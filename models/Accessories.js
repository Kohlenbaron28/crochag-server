const { Schema, model } = require('mongoose');

const accessories = new Schema({
    imageUrl: String,  
    name: {type: String, required: true},
    price: {type: Number, required: true},
});

module.exports = model('Accessories', accessories);