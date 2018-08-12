/**
 * Order Entity (ES6 Class)
 */

class Order {
    constructor(id, customerName, customerAddress, item, price, currency) {
        this.id = id;
        this.customerName = customerName;
        this.customerAddress = customerAddress;
        this.item = item;
        this.price = price;
        this.currency = currency;
    }
}

module.exports = Order;