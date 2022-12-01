const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {body, validationResult} = require('express-validator')
require('dotenv').config();

const Accessories = require('./models/Accessories');
const Switer = require('./models/Switer');
const Cardigans = require('./models/Cardigans');
const Order = require('./models/Order');

const app = express();
app.set('view engine', 'ejs');
mongoose.connect('mongodb+srv://admin:edinorog28@cluster0.iu3cz22.mongodb.net/?retryWrites=true&w=majority')
const ejs = require('ejs');
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use('/accessories', require("./routes/accessoriesRoute"));
app.use('/switers', require("./routes/switerRoute"));
app.use('/cardigans', require("./routes/cardiganRoute"));

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
        filename: (_, file, cb) => {
            cb(null, file.originalname);
    }
});

const upload = multer({storage});
app.use('/uploads', express.static('uploads'));

app.post('/accessories', upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
});
// Step 7 - the GET request handler that provides the HTML UI




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

app.get('/api/accessories', async(req, res) => {
    try {
        const accessories = await Accessories.find();
        res.json(accessories);
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
});

app.post('/api/accessories', async(req, res) => {
    try {
        const errors = validationResult(req);
        const {name, price, imageUrl} = req.body;
        if(!errors.isEmpty()) {
            return res.status(404).json({
                success: false,
                errors: errors.array()
            })
        }
        const accessories = new Accessories({name, price, imageUrl});
        await accessories.save();
        res.json(accessories);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
app.get('/api/switers', async(req, res) => {
    try {
        const switer = await Switer.find();
        res.json(switer);
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
});

app.post('/api/switers', async(req, res) => {
    try {
        const errors = validationResult(req);
        const {name, price, imageUrl} = req.body;
        if(!errors.isEmpty()) {
            return res.status(404).json({
                success: false,
                errors: errors.array()
            })
        }
        const switer = new Switer({name, price, imageUrl});
        await switer.save();
        res.json(switer);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.get('/api/cardigans', async(req, res) => {
    try {
        const cardigans = await Cardigans.find();
        res.json(cardigans);
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
});

app.post('/api/cardigans', async(req, res) => {
    try {
        const errors = validationResult(req);
        const {name, price, imageUrl} = req.body;
        if(!errors.isEmpty()) {
            return res.status(404).json({
                success: false,
                errors: errors.array()
            })
        }
        const cardigans = new Cardigans({name, price, imageUrl});
        await cardigans.save();
        res.json(cardigans);
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