const session = {
    rsrcMgr: null,
    productList: null,
    formModified: false,
    submitting: false,
    fieldsValid: {},
    initialColors: {
        text: '#0af',
        border: '#0af',
        background: '#000'
    },
    inputColors: {
        text: '#0f0',
        border: '#0f0',
        background: '#000'
    },
    invalidColors: {
        text: '#f00',
        border: '#f00',
        background: '#300'
    }
};

const user = {
    cart: null
};

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

function updateSubmitView() {
    let complete = true;
    for (let key in session.fieldsValid) {
        if (!session.fieldsValid[key]) {
            complete = false;
            break;
        }
    }

    let btSubmit = byId('bt-submit');
    if (!complete) {
        btSubmit.disabled = true;
    } else {
        btSubmit.disabled = false;
    }
}

const REGEX_MAP = {
    'first-name': /^.+$/,
    'last-name': /^.+$/,
    'address-street': /^[\w\s\/\-\.]+$/,
    'address-2': /^.*$/,
    'address-city': /^[\w\s\-\.]+$/,
    'address-state': /^[A-Z]{2}$/,
    'address-zip': /^(\d){5}(\-(\d){4})?$/,
    'phone-number': /^(\+?1[\-\s]?)?(((\d{3}[\-\s]?)|(\(\d{3}\)[\s]?))\d{3}[\-\s]?\d{4})$/,
    'address-email': /(^$)|(^[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~]+([\w\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~\.]?[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\_\`\{\|\}\~\.]+)?\@{1}[\w\-]+(\.{1}\w+)+$)/,
    'card-name': /^[\w\-\s]+$/,
    'card-number': /^((\d{4}[ ]?){4})$/,
    'card-expires-month': /^\d+$/,
    'card-expires-year': /^\d+$/
};

const US_STATES = [
    ' ',
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

function validateRegex(key, skipUpdateView) {
    let elem = byName(key)[0];

    // strip padding spaces
    elem.value = elem.value.trim();

    let value = elem.value;
    let regex = REGEX_MAP[key];
    let valid = value.search(regex) >= 0;

    if (!skipUpdateView) {
        if (!valid) {
            elem.style.color = session.invalidColors.text;
            elem.style.borderColor = session.invalidColors.border;
            elem.style.backgroundColor = session.invalidColors.background;
        } else {
            elem.style.color = session.inputColors.text;
            elem.style.borderColor = session.inputColors.border;
            elem.style.backgroundColor = session.inputColors.background;
        }
    } else {
        elem.style.color = session.initialColors.text;
        elem.style.borderColor = session.initialColors.border;
        elem.style.backgroundColor = session.initialColors.background;
    }

    session.fieldsValid[key] = valid;
}

function onLoad() {
    session.rsrcMgr = new ResourceManager();
    user.cart = session.rsrcMgr.loadCart();

    let frmMain = byId('frm-main');
    frmMain.reset();

    for (let elem of frmMain.elements) {
        switch (elem.tagName) {
            case 'INPUT':
            case 'SELECT':
            case 'TEXTAREA':
                break;
            
            default:
                continue;       
        }

        elem.addEventListener('change', () => {
            validateRegex(elem.name, false);
        });

        session.fieldsValid[elem.name] = false;
        validateRegex(elem.name, true);
    }

    let selAddressState = byId('sel-address-state');
    for (let state of US_STATES) {
        let option = constructElement('option', {
            value: state,
            innerText: state
        });
        selAddressState.appendChild(option);
    }

    let selCardExpiresMonth = byId('sel-card-expires-month');
    let blankOption = constructElement('option', {
        value: ' ',
        innerText: ' '
    });
    selCardExpiresMonth.appendChild(blankOption);
    for (let m = 1; m <= 12; m++) {
        let option = constructElement('option', {
            value: m,
            innerText: m
        });
        selCardExpiresMonth.appendChild(option);
    }

    let selCardExpiresYear = byId('sel-card-expires-year');
    let blankOption2 = constructElement('option', {
        value: ' ',
        innerText: ' '
    });
    selCardExpiresYear.appendChild(blankOption2);
    let thisYear = new Date().getFullYear() % 100;
    for (let y = 0; y < 10; y++) {
        let option = constructElement('option', {
            value: thisYear + y,
            innerText: thisYear + y
        });
        selCardExpiresYear.appendChild(option);
    }

    loadProducts();
    updateResetView();
    updateSubmitView();
}

function onUnload(event) {
    if (session.submitting) {
        return;
    } else if (session.formModified) {
        event.preventDefault();
        event.returnValue = 1;
        return 1;
    }
}

function onReset() {
    session.formModified = false;

    let frmMain = byId('frm-main');
    for (let elem of frmMain.elements) {
        switch (elem.tagName) {
            case 'INPUT':
            case 'SELECT':
            case 'TEXTAREA':
                break;
            
            default:
                continue;       
        }

        session.fieldsValid[elem.name] = false;
        validateRegex(elem.name, true);
    }

    updateResetView();
    updateSubmitView();
}

function onChange() {
    session.formModified = true;
    updateResetView();
    updateSubmitView();
}

function onResetClick() {
    if (!session.formModified) {
        return;
    }

    let answer = confirm('Are you sure you want to reset the form?');
    if (answer) {
        session.submitting = true;
        
        byId('frm-main').reset();
    }
}

function onSubmitClick() {
    let amount = toMoneyString(user.cart.getSubtotal(session.productList));
    let answer = confirm(`Finalize purchase of ${amount}?`);
    if (answer) {
        user.cart = {};
        session.rsrcMgr.removeCartItemsFromStorage();
        session.submitting = true;
        byId('frm-main').submit();
    }
}

window.addEventListener('beforeunload', onUnload);