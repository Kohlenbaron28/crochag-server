const express = require('express');
const router = express.Router();
const Accessories = require('../models/Accessories');

router.route('/').get((req, res) => {
    Accessories.find()
    .then(foundCards => res.json(foundCards))
});

module.exports = router;