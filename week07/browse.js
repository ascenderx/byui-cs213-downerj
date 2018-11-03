const session = {
    rsrcMgr: null,
    productList: null
}

const user = {
    cart: null
}

function updateCartView() {
    let size = user.cart.size;
    byId('lblCartSize').innerText = size;
    byId('lblCartSizeS').innerText = (user.cart.size != 1) ? 's' : '';
}

function goToCart() {
    window.location.href = './cart.html';
}

function addProduct(sku) {
    user.cart.addProduct(sku);
    updateCartView();
}

function removeProduct(sku) {
    user.cart.removeProduct(sku);
    updateCartView();
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
            'innerText': toMoneyString(product.price),
            'class': 'u-price',
        });
        
        let btAdd;
        let btRemove;
        let itemInCart = user.cart.hasProduct(product.sku);

        btAdd = constructElement('button', {
            'type': 'button',
            'innerText': (itemInCart) ? 'Item In Cart' : 'Add To Cart',
            'disabled': itemInCart
        });
        btAdd.addEventListener('click', () => { 
            addProduct(product.sku);
            btAdd.disabled = true;
            btAdd.innerText = 'Item In Cart';
            btRemove.style.display = 'initial';
            btRemove.disabled = false;
        });
        btRemove = constructElement('button', {
            'type': 'button',
            'innerText': 'Remove From Cart',
            'disabled': !itemInCart
        });
        if (!itemInCart) {
            btRemove.style.display = 'none';
        } else {
            btRemove.style.display = 'initial';
        }
        btRemove.addEventListener('click', () => {
            removeProduct(product.sku);
            btRemove.disabled = true;
            btRemove.style.display = 'none';
            btAdd.disabled = false;
            btAdd.innerText = 'Add To Cart';
        });
        
        let cell1 = row.insertCell();
        cell1.style.verticalAlign = 'top';
        addChildren(cell1, [
            lblName, newBr(),
            lblDescription, newBr(), newBr(),
            lblSKU, newBr(),
            lblPrice, newBr(), newBr(),
            btAdd, btRemove
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
    updateCartView();
}

function onUnload() {
    session.rsrcMgr.saveCart(user.cart);
}

window.addEventListener('load', onLoad);
window.addEventListener('beforeunload', onUnload);