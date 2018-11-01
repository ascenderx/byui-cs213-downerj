let tblProducts;

function onBodyLoad() {
    tblProducts = byId('table-products');

    loadProducts('./modules/items.json')
    .each((product) => {
        let row = tblProducts.insertRow();
        // let cell0 = row.insertCell();
        // let cell1 = row.insertCell();
        // let cell2 = row.insertCell();

        // cell0.innerText = product;
        for (key in product) {
            let cell = row.insertCell();
            let label = document.createElement('label');
            let value = product[key] || 'N/A';
            if (key == 'price') {
                value = toMoneyString(value);
            }
            label.innerText = `${key}: ${value}`;
            cell.appendChild(label);
        }
    })
    .error(() => {
        alert('Error loading products');
    });
}

window.addEventListener('load', onBodyLoad);