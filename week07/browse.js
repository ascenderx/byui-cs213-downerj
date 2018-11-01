let tblProducts;

function onBodyLoad() {
    tblProducts = byId('table-products');

    loadProducts('./modules/items.json')
    .each((product) => {
        let row = tblProducts.insertRow();
        
        let cell0 = row.insertCell();
        let anchor = document.createElement('a');
        anchor.href = `./assets/images/${product.imageURL}`;
        let image = new Image(100, 100);
        image.src = `./assets/images/${product.imageURL}`;
        anchor.appendChild(image);
        cell0.appendChild(anchor);

        let cell1 = row.insertCell();
        cell1.innerText = product.name;
        // }
    })
    .error(() => {
        alert('Error loading products');
    });
}

window.addEventListener('load', onBodyLoad);