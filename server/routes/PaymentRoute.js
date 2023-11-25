const express = require('express');
const router = express.Router();
const handler = require('../Helpers/stripeAPI');

router.post('/checkout_sessions', handler);


router.post('/buyTickets', async (req, res) => {

})
module.exports = router;