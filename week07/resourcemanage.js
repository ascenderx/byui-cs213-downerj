function loadProducts(fileName) {
    let promise = ajaxGet(fileName);

    return {
        forEach: function(callback) {
            promise.then((json) => {
                let products = JSON.parse(json);
                for (let product of products) {
                    callback(product);
                }
            }).catch((status, text) => {
                console.log(`${status}: ${text}`);
                callback(null);
            });
        }
    }
}

function loadCart() {
    
}