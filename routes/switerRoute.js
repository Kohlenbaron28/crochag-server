const express = require('express');
const router = express.Router();
const Switer = require('../models/Switer');

router.route('/').get((req, res) => {
    Switer.find()
    .then(foundCards => res.json(foundCards))
});

module.exports = router;