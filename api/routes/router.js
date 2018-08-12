/**
 * Express Router configuration
 */
const express = require('express');
const router = express.Router();

/* API routes */
router.use('/orders', require('./ordersRoutes'));

module.exports = router;