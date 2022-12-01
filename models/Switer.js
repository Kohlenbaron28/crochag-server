const { Schema, model } = require('mongoose');

const switer = new Schema({
    imageUrl: String,  
    name: {type: String, required: true},
    price: {type: Number, required: true},
});

module.exports = model('Switer', switer);