const REGEX_MAP = {
    'u-age': /^(((\d)?(\d))|([1](([0]\d)|([1][0-8]))))$/,
    'u-ssn': /./,
    'u-card': /./,
    'u-date': /./,
    'u-state': /./,
    'u-money': /./,
};

function getByClass(className) {
    return document.getElementsByClassName(className);
}

function onInputChange(className, index) {
    if (!(className in REGEX_MAP)) {
        throw `Invalid class name "${className}"`;
    }

    let regex = REGEX_MAP[className];
    let lblError = getByClass(`${className} u-invalid`)[index];
    let txtInput = getByClass(`${className} u-input`)[index];
    if (!txtInput) {
        throw `No input of class "${className}" found at index ${index}`;
    }
    let text = txtInput.value;
    if (!text.match(regex)) {
        lblError.style.display = 'initial';
    } else {
        lblError.style.display = 'none';
    }
}

window.addEventListener('load', () => {
    for (let className in REGEX_MAP) {
        for (let i = 0; i < 2; i++) {
            getByClass(`${className} u-input`)[i].addEventListener('change', () => {
                onInputChange(className, i);
            });
        }
    }
});