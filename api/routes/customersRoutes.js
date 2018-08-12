/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const CustomerController = require('../controllers/customersController');
const customerController = new CustomerController();

/**
 * Entity routes
 */
router.get('/', function (req, res) {
    customerController.findAll(res);
});

router.get('/count', function (req, res) {
    customerController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    customerController.exists(req, res);
});

router.get('/:id', function (req, res) {
    customerController.findById(req, res);
});

router.put('/:id', function (req, res) {
    customerController.update(req, res);
});

router.post('/', function (req, res) {
    customerController.create(req, res);
});

router.delete('/:id', function (req, res) {
    customerController.deleteById(req, res);
});

module.exports = router;