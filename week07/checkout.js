const session = {
    rsrcMgr: null,
    productList: null
}

const user = {
    cart: null
}

function updateCartView() {
    let size = user.cart.size;
    byId('lbl-cart-size').innerText = size;
    byId('lbl-cart-size-s').innerText = (user.cart.size != 1) ? 's' : '';
    if (size > 0) {
        byId('lbl-cart-empty').style.display = 'none';
    } else {
        byId('lbl-cart-empty').style.display = 'initial';
    }
    let subtotal = user.cart.getSubtotal(session.productList);
    byId('lbl-cart-subtotal').innerText = toMoneyString(subtotal);
}

function addProduct(sku) {
    user.cart.addProduct(sku);
    updateCartView();
}

function removeProduct(sku) {
    user.cart.removeProduct(sku);
    updateCartView();
}

function loadProducts() {
    session.rsrcMgr.loadProducts('./modules/items.json')
    .all((products) => {
        session.productList = products;
        updateCartView();
    });
}

function onLoad() {
    session.rsrcMgr = new ResourceManager();
    user.cart = session.rsrcMgr.loadCart();

    loadProducts();
}

function onUnload() {
    session.rsrcMgr.saveCart(user.cart);
}

window.addEventListener('load', onLoad);
window.addEventListener('beforeunload', onUnload);