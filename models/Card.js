const { Schema, model } = require('mongoose');

const card = new Schema({
    imageUrl: String,  
    name: {type: String, required: true},
    price: {type: Number, required: true},
});

module.exports = model('Card', card);