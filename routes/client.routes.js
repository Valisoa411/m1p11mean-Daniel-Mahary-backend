const express = require('express');

const router = express.Router();

const clientController = require('../controllers/clientController');

router.post('/signup', clientController.signUpClient);

module.exports = router;