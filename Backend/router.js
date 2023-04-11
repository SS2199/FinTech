const express = require('express');
const router = express.Router();

const priceController = require('./priceController');

router.get('/prices', priceController.getPrices);

module.exports = router ;
