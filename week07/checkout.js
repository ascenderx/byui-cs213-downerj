const session = {
    rsrcMgr: null,
    productList: null,
    formModified: false
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

function updateResetView() {
    byId('bt-reset').disabled = !session.formModified;
}

const REGEX_MAP = {
    'first-name': /^.*$/,
    'last-name': /^.*$/,
    'address-street': /^[0-9a-zA-Z\s()\/\-\.]*$/,
    'address-2': /^.*$/,
    'address-city': /^[\w\s\-\.]*$/,
    'address-zip': /^(\d){5}(\-(\d){4})?$/,
    'phone-number': /^(\+?1)?(((\d{3}[\-\s]?)|(\(\d{3}\)))\d{3}[\-\s]?\d{4})$/,
    'address-email': /^[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~]+([\w\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~\.]?[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~\.]+)?\@{1}[\w\-]+(\.{1}\w+)+$/,
    'card-name': /^[\w\-\s]+$/,
    'card-number': /^((\d{4}[ ]?){4})$/,
    // 'card-expires-month': /^(0?[1-9])|(1{1}[0-2])$/,
    // 'card-expires-year': /^(\d{2})|()$/
};

const US_STATES = [
    'AL', 'AK', 'AR', 'AZ',
    'CA', 'CO', 'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'IA', 'ID', 'IL', 'IN',
    'KS', 'KY',
    'LA',
    'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT',
    'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY',
    'OH', 'OK', 'OR',
    'PA',
    'RI',
    'SC', 'SD',
    'TN', 'TX',
    'UT',
    'VA', 'VT',
    'WA', 'WI', 'WV', 'WY'
];

function validateRegex(key) {

}

function onLoad() {
    session.rsrcMgr = new ResourceManager();
    user.cart = session.rsrcMgr.loadCart();

    loadProducts();
    updateResetView();

    byId('frm-main').reset();

    let selAddressState = byId('sel-address-state');
    for (let state of US_STATES) {
        let option = constructElement('option', {
            'value': state,
            'innerText': state
        });
        selAddressState.appendChild(option);
    }
}

function onUnload(event) {
    if (session.formModified) {
        event.preventDefault();
        event.returnValue = 1;
        return 1;
    }
}

function onReset() {
    session.formModified = false;
    updateResetView();
}

function onInput() {
    session.formModified = true;
    updateResetView();
}

function onResetClick() {
    if (!session.formModified) {
        return;
    }

    let answer = confirm('Are you sure you want to reset the form?');
    if (answer) {
        byId('frm-main').reset();
    }
}

function onSubmitClick() {
    
}

window.addEventListener('beforeunload', onUnload);