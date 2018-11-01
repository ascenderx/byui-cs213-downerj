function byId(id) {
    return document.getElementById(id);
}

function byClass(className) {
    return document.getElementsByClassName(className);
}

function byTag(tagName) {
    return document.getElementsByTagName(tagName);
}

function byName(name) {
    return document.getElementsByName(name);
}

function toMoneyString(amount) {
    if (isNaN(amount)) {
        throw `toMoneyString() -> Invalid amount "${amount}"`;
    }
    amount = Number(amount);

    let units = Math.floor(amount).toString();
    // add commas to the units
    let unitsString = '';
    let patternOffset = 2 - (units.length - 1) % 3;
    for (let u = 0; u < units.length; u++) {
        unitsString += units.charAt(u);
        if ((u + patternOffset) % 3 === 0) {
            unitsString += ',';
        }
    }

    let centsString = (amount % 1.00).toString().substr(0, 2);
    if (centsString.length == 1) {
        centsString += '0';
    }

    return `\$${unitsString}.${centsString}`;
}