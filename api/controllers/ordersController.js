/* Load Data Access Object */
const OrderDao = require('../dao/orderDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load Order entity */
const Order = require('../models/order');

/**
 * Order Controller
 */
class OrderController {

    constructor() {
        this.orderDao = new OrderDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.orderDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.orderDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.orderDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let order = new Order();
        order.id = req.params.id;

        order.customer = req.body.customer;
        order.item = req.body.item;
        order.price = req.body.price;
        order.currency = req.body.currency;

        return this.orderDao.update(order)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let order = new Order();
        if (req.body.id) {
            order.id = req.body.id;
        }
        order.customer = req.body.customer;
        order.item = req.body.item;
        order.price = req.body.price;
        order.currency = req.body.currency;

        if (req.body.id) {
            return this.orderDao.createWithId(order)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }
        else {
            return this.orderDao.create(order)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }

    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res
     * returns database deletion status
     */
    deleteById(req, res) {
        let id = req.params.id;

        this.orderDao.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let id = req.params.id;

        this.orderDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = OrderController;