const express = require('express');
const mongoose = require('mongoose');
const {body, validationResult} = require('express-validator')
require('dotenv').config();

const Card = require('./models/Card');
const Order = require('./models/Order');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));



const start = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology: true, 
            useNewUrlParser: true
        });
    
        app.listen(process.env.PORT, () => {
            console.log('Сервер успешно запущен');
        });
    } catch (error) {
      console.log('Что-то пошло не так', error.message);
      process.exit(1);
    }
};

app.get('/api/cards', async(req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards);
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
});

app.post('/api/cards', async(req, res) => {
    try {
        const errors = validationResult(req);
        const {name, price, imageUrl} = req.body;
        if(!errors.isEmpty()) {
            return res.status(404).json({
                success: false,
                errors: errors.array()
            })
        }
        const card = new Card({name, price, imageUrl});
        await card.save();
        res.json(card);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.post('/api/order', body('name').isLength({min: 3}), body('phone').isNumeric(), async(req, res) => {
    try {
        const errors = validationResult(req);
        const {name, phone} = req.body;
        if(!errors.isEmpty()) {
            return res.status(404).json({
                success: false,
                errors: errors.array()
            })
        }
        const order = new Order({name, phone});
        await order.save();
        res.json(order);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

start();