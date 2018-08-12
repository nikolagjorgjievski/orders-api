/**
 * Order Entity (ES6 Class)
 */

class Order {
    constructor(id, customer, item, price, currency) {
        this.id = id;
        this.customer = customer;
        this.item = item;
        this.price = price;
        this.currency = currency;
    }
}

module.exports = Order;