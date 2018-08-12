/* Load entity */
const Customer = require('../models/customer');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Data Access Object
 */
class CustomerDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT id, name, address FROM customers WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Customer(row.id, row.name, row.address));
    };

    /**
     * Tries to find an entity using name
     * @params name
     * @return entity
     */
    findByName(name) {
        let sqlRequest = "SELECT id, name, address FROM customers WHERE lower(name)=$name";
        let sqlParams = {$name: name.toLowerCase()};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Customer(row.id, row.name, row.address));
    };

    /**
     * Tries to find an entity using name, otherwise creates new entity
     * @params customer
     * @return entity
     */
    findByNameOrCreate(customer) {
        return this.findByName(customer.name)
            .then(entity => {
                if (entity.id) {
                    return entity;
                } else {
                    return this.create(customer)
                        .then(customerId => this.findById(customerId))
                }
            });
    };

    /**
     * Tries to find an entity using address
     * @params name
     * @return entity
     */
    findByAddress(address) {
        let sqlRequest = "SELECT id, name, address FROM customers WHERE lower(address)=$address";
        let sqlParams = {$address: address.toLowerCase()};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Customer(row.id, row.name, row.address));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT id, name, address FROM customers";
        return this.common.findAll(sqlRequest).then(rows => {
                let customers = [];
                for (const row of rows) {
                    customers.push(new Customer(row.id, row.name, row.address));
                }
                return customers;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM customers";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Customer
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Customer) {
        let sqlRequest = "UPDATE customers SET " +
            "name=$name, " +
            "address=$address " +
            "WHERE id=$id";
        let sqlParams = {
            $id: Customer.id,
            $name: Customer.name,
            $address: Customer.address
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Customer
     * returns database insertion status
     */
    create(Customer) {
        let sqlRequest = "INSERT into customers (name, address) " +
            "VALUES ($name, $address)";
        let sqlParams = {
            $name: Customer.name,
            $address: Customer.address
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM customers WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM customers WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.existsOne(sqlRequest, sqlParams);
    };
}

module.exports = CustomerDao;