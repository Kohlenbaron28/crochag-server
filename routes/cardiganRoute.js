const express = require('express');
const router = express.Router();
const Cardigans = require('../models/Cardigans');

router.route('/').get((req, res) => {
    Cardigans.find()
    .then(foundCards => res.json(foundCards))
});

module.exports = router;