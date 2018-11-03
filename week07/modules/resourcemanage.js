class ResourceManager {
    constructor(props) {
        props = props || {};

        let storageType;
        if ('storage' in props) {
            storageType = props.storage;
        } else {
            storageType = 'volatile';
        }
        this.storage = new StorageManager(storageType);
    }

    loadProducts(fileName) {
        let promise = ajaxGet(fileName);
        let handler = {
            each: function(callback) {
                promise
                .then((json) => {
                    let products = JSON.parse(json);
                    for (let sku in products) {
                        callback(products[sku]);
                    }
                });
                return handler;
            },
            all: function(callback) {
                promise
                .then((json) => {
                    let products = JSON.parse(json);
                    callback(products);
                });
                return handler;
            },
            error: function(callback) {
                promise
                .catch((status, text) => {
                    console.log(`${status}: ${text}`);
                    callback();
                });
                return handler;
            }
        }

        return handler;
    }

    loadCart() {
        let items = this.storage.getItem('cart-items');
        if (items === null) {
            return new ShoppingCart();
        }

        let cart = new ShoppingCart(items);
        return cart;
    }

    saveCart(cart) {
        if (cart) {
            this.storage.setItem('cart-items', cart.products);
        }
    }

    removeCartItemsFromStorage() {
        this.storage.removeItem('cart-items');
    }
}