/**
 * SHOPPING CART
 */
class ShoppingCart {
    constructor(obj) {
        this._products = {};
    }

    get products() {
        return this._products;
    }

    set products(dummy) { 
        throw "ShoppingCart:products:set() -> Immutable property";
    }

    addProduct(sku, quantity) {
        if (!(sku in this._products)) {
            this._products[sku] = 0;
        }

        if (quantity === null || quantity === undefined) {
            quantity = 1;
        } else if (isNaN(quantity)) {
            throw `ShoppingCart:addProduct() -> Invalid quantity "${quantity}"`;
        } else {
            quantity = parseInt(quantity);
        }

        this._products[sku] += quantity;
    }

    getProductCount(sku) {
        if (!(sku in this._products)) {
            return 0;
        }

        return this._products[sku];
    }

    hasProduct(sku) {
        return sku in this._products;
    }

    removeProduct(sku, quantity) {
        if (!(sku in this._products)) {
            return false;
        }

        if (quantity === null || quantity === undefined) {
            delete this._products[sku];
        } else if (!isNaN(quantity)) {
            throw `ShoppingCart:removeProduct() -> Invalid quantity "${quantity}"`;
        } else {
            let count = this._products[sku];
            let quantity = parseInt(quantity);
            if (count - quantity < 0) {
                this._products[sku] = 0
            } else {
                this._products[sku] -= quantity;
            }
        }
        
        return true;
    }
}