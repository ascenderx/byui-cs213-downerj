function loadProducts(fileName) {
    let promise = ajaxGet(fileName);
    let handler = {
        each: function(callback) {
            promise
            .then((json) => {
                let products = JSON.parse(json);
                for (let product of products) {
                    callback(product);
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

function loadCart() {
    let storage = new StorageManager();
    let itemsJSON = storage.getItem('cart-items');
    if (itemsJSON === null) {
        return new ShoppingCart();
    }

    let items = JSON.parse(itemsJSON);
    let cart = new ShoppingCart(items);
    return cart;
}

function saveCart(cart) {
    let storage = new StorageManager();
    storage.addItem('cart-items', cart.products);
}

function removeCartItemsFromStorage() {
    let storage = new StorageManager();
    storage.removeItem('cart-items');
}