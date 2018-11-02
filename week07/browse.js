let tblProducts;

function onBodyLoad() {
    tblProducts = byId('table-products');

    loadProducts('./modules/items.json')
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
        let cell1 = row.insertCell();
        cell1.style.verticalAlign = 'top';
        addChildren(cell1, [
            lblName,
            newBr(),
            lblDescription,
            newBr(),
            newBr(),
            lblSKU, 
            newBr(),
            lblPrice
        ]);
    })
    .error(() => {
        alert('Error loading products');
    });
}

window.addEventListener('load', onBodyLoad);