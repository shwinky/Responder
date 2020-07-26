const express = require('express');
const router = express.Router();
const ResponderController = require('../Controllers/ResponderController');

/* GET home page. */
router.get('/resource', ResponderController.handleGetRequest);

module.exports = router;
