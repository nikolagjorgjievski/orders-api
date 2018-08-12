/* Load entity */
const Order = require('../models/order');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Data Access Object
 */
class OrderDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT id, customer, item, price, currency FROM orders WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Order(row.id, row.customer, row.item, row.price, row.currency));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM orders";
        return this.common.findAll(sqlRequest).then(rows => {
                let orders = [];
                for (const row of rows) {
                    orders.push(new Order(row.id, row.customer, row.item, row.price, row.currency));
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
        let sqlRequest = "UPDATE orders SET " +
            "customer=$customer, " +
            "item=$item, " +
            "price=$price, " +
            "currency=$currency " +
            "WHERE id=$id";

        let sqlParams = {
            $customer: Order.customer,
            $item: Order.item,
            $price: Order.price,
            $currency: Order.currency,
            $id: Order.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Order
     * returns database insertion status
     */
    create(Order) {
        let sqlRequest = "INSERT into orders (customer, item, price, currency) " +
            "VALUES ($customer, $item, $price, $currency)";
        let sqlParams = {
            $customer: Order.customer,
            $item: Order.item,
            $price: Order.price,
            $currency: Order.currency
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Order
     * returns database insertion status
     */
    createWithId(Order) {
        let sqlRequest = "INSERT into orders (id, customer, item, price, currency) " +
            "VALUES ($id, $customer, $item, $price, $currency)";
        let sqlParams = {
            $id: Order.id,
            $customer: Order.customer,
            $item: Order.item,
            $price: Order.price,
            $currency: Order.currency
        };
        return this.common.run(sqlRequest, sqlParams);
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
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = OrderDao;