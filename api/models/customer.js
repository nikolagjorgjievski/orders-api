/**
 * Customer Entity (ES6 Class)
 */

class Customer {
    constructor(id, name, address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }
}

module.exports = Customer;