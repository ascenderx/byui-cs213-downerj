/**
 * SHOPPING CART
 */
class ShoppingCart {
    constructor(obj) {
        this.products = {};
    }

    get products() {
        return this.products;
    }

    set products(dummy) { /* immutable */ }

    addProduct(sku, quantity) {
        if (!(sku in this.products)) {
            this.products[sku] = 0;
        }

        if (quantity === null || quantity === undefined) {
            quantity = 1;
        } else if (isNaN(quantity)) {
            throw `Invalid quantity "${quantity}"`;
        } else {
            quantity = Number(quantity);
        }

        this.products[sku] += quantity;
    }

    hasProduct(sku) {
        return sku in this.products;
    }

    removeProduct(sku, quantity) {

    }
}