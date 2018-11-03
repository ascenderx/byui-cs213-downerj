const session = {
    rsrcMgr: null,
    productList: null
}

const user = {
    cart: null
}

function addProduct(sku) {
    user.cart.addProduct(sku);
}

function populateTable() {
    let tblProducts = byId('table-products');
    session.rsrcMgr.loadProducts('./modules/items.json')
    .all((products) => { session.productList = products; })
    .each((product) => {
        const LOCAL_URL = `./assets/images/${product.imageURL}`
        const IMAGE_WIDTH = 150;
        const IMAGE_HEIGHT = 150;

        let row = tblProducts.insertRow();
        
        let anchor = constructElement('a', {
            'href': LOCAL_URL
        });
        let image = constructElement('img', {
            'src': LOCAL_URL,
            'width': IMAGE_WIDTH,
            'height': IMAGE_HEIGHT
        });
        let cell0 = row.insertCell();
        anchor.appendChild(image);
        cell0.appendChild(anchor);

        let lblName = constructElement('strong', {
            'innerText': product.name
        });
        let lblDescription = constructElement('span', {
            'innerText': product.description || 'Description unavailable'
        });
        let lblSKU = constructElement('span', {
            'innerHTML': `SKU&ndash;${product.sku}`
        });
        let lblPrice = constructElement('span', {
            'innerText': toMoneyString(product.price)
        });
        let itemInCart = user.cart.hasProduct(product.sku);
        let btAdd = constructElement('button', {
            'type': 'button',
            'innerText': (itemInCart) ? 'Item in Cart' : 'Add to Cart',
            'disabled': itemInCart
        });
        btAdd.addEventListener('click', () => { 
            addProduct(product.sku);
            btAdd.disabled = true;
            btAdd.innerText = "Item in Cart";
        });

        let cell1 = row.insertCell();
        cell1.style.verticalAlign = 'top';
        addChildren(cell1, [
            lblName, newBr(),
            lblDescription, newBr(), newBr(),
            lblSKU, newBr(),
            lblPrice, newBr(), newBr(),
            btAdd
        ]);
    })
    .error(() => {
        alert('Error loading products');
    });
}

function onLoad() {
    session.rsrcMgr = new ResourceManager();
    user.cart = session.rsrcMgr.loadCart();

    populateTable();
}

function onUnload() {
    session.rsrcMgr.saveCart(user.cart);
}

window.addEventListener('load', onLoad);
window.addEventListener('beforeunload', onUnload);