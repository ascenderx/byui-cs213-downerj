let tblProducts;

function onBodyLoad() {
    tblProducts = byId('table-products');

    loadProducts('./modules/items.json')
    .each((product) => {
        const LOCAL_URL = `./assets/images/${product.imageURL}`
        const IMAGE_WIDTH = 100;
        const IMAGE_HEIGHT = 100;

        let row = tblProducts.insertRow();
        
        let cell0 = row.insertCell();
        let anchor = document.createElement('a');
        anchor.href = LOCAL_URL;
        let image = new Image(IMAGE_WIDTH, IMAGE_HEIGHT);
        image.src = LOCAL_URL;

        anchor.appendChild(image);
        cell0.appendChild(anchor);

        let cell1 = row.insertCell();
        cell1.style.verticalAlign = 'top';
        let lblName = document.createElement('strong');
        lblName.innerText = product.name;
        let lblDescription = document.createElement('span');
        lblDescription.innerText = product.description || 'Description unavailable';
        let lblSKU = document.createElement('sku');
        lblSKU.innerHTML = `SKU&ndash;${product.sku}`;
        let lblPrice = document.createElement('span');
        lblPrice.innerText = toMoneyString(product.price);

        cell1.appendChild(lblName);
        cell1.appendChild(document.createElement('br'));
        cell1.appendChild(lblDescription);
        cell1.appendChild(document.createElement('br'));
        cell1.appendChild(document.createElement('br'));
        cell1.appendChild(lblSKU);
        cell1.appendChild(document.createElement('br'));
        cell1.appendChild(lblPrice);
    })
    .error(() => {
        alert('Error loading products');
    });
}

window.addEventListener('load', onBodyLoad);