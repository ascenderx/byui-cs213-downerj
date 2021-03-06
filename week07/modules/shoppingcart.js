/**
 * SHOPPING CART
 */
class ShoppingCart {
    /**
     * SHOPPING CART : CONSTRUCTOR
     */
    constructor(products) {
        this._products = {};
        if (products !== null && products !== undefined) {
            for (let sku in products) {
                this._products[sku] = products[sku];
            }
        }
    }

    /**
     * SHOPPING CART : PRODUCTS
     * @returns The current product-count map
     */
    get products() {
        return this._products;
    }

    /**
     * SHOPPING CART : PRODUCTS
     * Immutable.
     * @param dummy Unused
     * @throws      Exception when this setter is called
     */
    set products(dummy) { 
        throw 'ShoppingCart:products:set() -> Immutable property';
    }

    /**
     * SHOPPING CART : ADD PRODUCT
     * @param sku      The SKU of the product to add
     * @param quantity (Optional) The amount to add; default is 1
     * @throws         Exception if quantity is not a non-negative number
     */
    addProduct(sku, quantity) {
        if (!(sku in this._products)) {
            this._products[sku] = 0;
        }

        if (quantity === null || quantity === undefined) {
            quantity = 1;
        } else if (isNaN(quantity)) {
            throw `ShoppingCart:addProduct() -> Invalid quantity '${quantity}'`;
        } else {
            quantity = parseInt(quantity);
            if (quantity < 0) {
                throw `ShoppingCart:addProduct() -> Invalid quantity '${quantity}'`;
            }
        }

        this._products[sku] += quantity;
    }

    /**
     * SHOPPING CART : GET PRODUCT COUNT
     * @param sku The SKU of the product whose count to query
     * @returns   The quantity of the product in the cart, or 0 if not present
     */
    getProductCount(sku) {
        if (!(sku in this._products)) {
            return 0;
        }

        return this._products[sku];
    }

    /**
     * SHOPPING CART : GET SIZE
     * Computes the size using the sum of items per SKU in the cart.
     * @returns The total number of items in the cart
     */
    get size() {
        let total = 0;
        for (let sku in this._products) {
            total += this._products[sku];
        }

        return total;
    }

    /**
     * SHOPPING CART : HAS PRODUCT
     * @param sku The SKU of the product to query
     * @returns   A boolean of whether the product is present
     */
    hasProduct(sku) {
        return sku in this._products;
    }

    /**
     * SHOPPING CART : REMOVE PRODUCT
     * @param sku      The SKU of the product to remove
     * @param quantity (Optional) The amount to remove; default is all
     * @returns        Whether or not the item was removed (i.e. whether it was present)
     * @throws         Exception if the quantity is not a non-negative number
     */
    removeProduct(sku, quantity) {
        if (!(sku in this._products)) {
            return false;
        }

        if (quantity === null || quantity === undefined) {
            delete this._products[sku];
            return true;
        } else if (!isNaN(quantity)) {
            throw `ShoppingCart:removeProduct() -> Invalid quantity '${quantity}'`;
        }
        
        let count = this._products[sku];
        quantity = parseInt(quantity);
        if (quantity < 0) {
            throw `ShoppingCart:removeProduct() -> Invalid quantity '${quantity}'`;
        }

        if (count - quantity <= 0) {
            delete this._products[sku];
        } else {
            this._products[sku] -= quantity;
        }
        
        return true;
    }

    /**
     * SHOPPING CART : GET PRODUCT LIST
     * @returns A list of the product SKUs
     */
    getProductList() {
        return Object.keys(this._products);
    }

    /**
     * SHOPPING CART : GET SUBTOTAL
     * @param productList The map of products available in the store
     * @returns           A subtotal of the shopping cart cost sans tax
     * @throws            Exception if the product list is undefined
     */
    getSubtotal(productList) {
        if (productList === undefined || productList === null) {
            throw 'ShoppingCart:getSubtotal() -> Invalid product list';
        }

        let subtotal = 0.00;
        for (let sku in this._products) {
            let product = productList[sku];
            let quantity = this._products[sku];
            let price = product.price;
            subtotal += quantity * price;
        }

        return subtotal;
    }
}