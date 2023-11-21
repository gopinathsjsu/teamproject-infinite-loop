const express = require('express');
const router = express.Router();
const handler = require('../Helpers/stripeAPI');

router.post('/checkout_sessions',handler);

module.exports = router;