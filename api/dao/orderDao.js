/* Load entity */
const Order = require('../models/order');
const Customer = require('../models/customer');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

const CustomerDao = require('./customerDao');

/**
 * Data Access Object
 */
class OrderDao {

    constructor() {
        this.customerDao = new CustomerDao();
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT o.id, c.name as customerName, c.address as customerAddress, o.item, o.price, o.currency" +
            " FROM orders o" +
            " LEFT OUTER JOIN customers c on o.customerId = c.id" +
            " WHERE o.id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Order(row.id, row.customerName, row.customerAddress, row.item, row.price, row.currency));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT o.id, c.name as customerName, c.address as customerAddress, o.item, o.price, o.currency" +
            " FROM orders o" +
            " LEFT OUTER JOIN customers c on o.customerId = c.id";
        return this.common.findAll(sqlRequest).then(rows => {
                let orders = [];
                for (const row of rows) {
                    orders.push(new Order(row.id, row.customerName, row.customerAddress, row.item, row.price, row.currency));
                }
                return orders;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM orders";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Order
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Order) {
        let customer = new Customer();
        customer.name = Order.customerName;
        customer.address = Order.customerAddress;
        return this.customerDao.findByNameOrCreate(customer)
            .then(customer => {
                let sqlRequest = "UPDATE orders SET " +
                    "customerId=$customerId, " +
                    "item=$item, " +
                    "price=$price, " +
                    "currency=$currency " +
                    "WHERE id=$id";
                let sqlParams = {
                    $customerId: customer.id,
                    $item: Order.item,
                    $price: Order.price,
                    $currency: Order.currency,
                    $id: Order.id
                };
                return this.common.run(sqlRequest, sqlParams);
            });
    };

    /**
     * Creates the given entity in the database
     * @params Order
     * returns database insertion status
     */
    create(Order) {
        let customer = new Customer();
        customer.name = Order.customerName;
        customer.address = Order.customerAddress;
        return this.customerDao.findByNameOrCreate(customer)
            .then(customer => {
                let sqlRequest = "INSERT into orders (customerId, item, price, currency) " +
                    "VALUES ($customerId, $item, $price, $currency)";
                let sqlParams = {
                    $customerId: customer.id,
                    $item: Order.item,
                    $price: Order.price,
                    $currency: Order.currency
                };
                return this.common.run(sqlRequest, sqlParams);
            });
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM orders WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM orders WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}

module.exports = OrderDao;