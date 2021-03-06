const express = require('express');
const router = express.Router();
const ResponderController = require('../Controllers/ResponderController');

/* GET home page. */
router.post('', ResponderController.handlePostRequest);
router.get('/api/resource', ResponderController.handleGetFromAllRequest);

module.exports = router;
