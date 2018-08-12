/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const OrdersController = require('../controllers/ordersController');
const ordersController = new OrdersController();

/**
 * Entity routes
 */
router.get('/count', function (req, res) {
    ordersController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    ordersController.exists(req, res);
});

router.get('/:id', function (req, res) {
    ordersController.findById(req, res);
});

router.get('/', function (req, res) {
    ordersController.findAll(res);
});

router.put('/:id', function (req, res) {
    ordersController.update(req, res);
});

router.post('/', function (req, res) {
    ordersController.create(req, res);
});

router.delete('/:id', function (req, res) {
    ordersController.deleteById(req, res);
});

module.exports = router;