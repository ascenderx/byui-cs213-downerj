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
    .all((products) => { 
        session.productList = products;

        for (let sku in user.cart.products) {
            let product = products[sku];

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
            let lblSKU = constructElement('span', {
                'innerHTML': `SKU&mdash;${product.sku}`
            });
            let lblPrice = constructElement('span', {
                'innerText': toMoneyString(product.price),
            });
            lblPrice.style.color = '#ff0';
            
            let btRemove = constructElement('button', {
                'type': 'button',
                'innerText': 'Remove From Cart',
            });

            btRemove.addEventListener('click', () => {
                let answer = confirm(`Are you sure you want to delete item SKU-${sku}?`);
                if (answer) {
                    removeProduct(product.sku);
                    tblProducts.deleteRow(row.rowIndex);
                }
            });
            
            let cell1 = row.insertCell();
            cell1.style.verticalAlign = 'top';
            addChildren(cell1, [
                lblName, newBr(),
                lblPrice, newBr(), newBr(),
                btRemove
            ]);
        }
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