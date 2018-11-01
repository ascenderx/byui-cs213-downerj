function loadProducts(fileName) {
    let promise = ajaxGet(fileName);

    return {
        each: function(callback) {
            promise.then((json) => {
                let products = JSON.parse(json);
                for (let product of products) {
                    callback(product);
                }
            }).catch((status, text) => {
                console.log(`${status}: ${text}`);
                callback(null);
            });
        },
        all: function(callback) {
            promise.then((json) => {
                let products = JSON.parse(json);
                callback(products);
            }).catch((status, text) => {
                console.log(`${status}: ${text}`);
                callback(null);
            });
        }
    }
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