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

    let negativeString = (amount < 0) ? '-' : '';

    // add commas to the units
    let units = Math.abs(Math.floor(amount)).toString();
    let unitsString = '';
    let patternOffset = 3 - (units.length - 1) % 3;
    for (let u = 0; u < units.length; u++) {
        unitsString += units.charAt(u);
        if ((u + patternOffset) % 3 === 0 && u < units.length - 1) {
            unitsString += ',';
        }
    }

    // let centsString = (amount % 1.00).toString().substr(1, 3);
    // console.log(centsString);
    // if (centsString.length == 1) {
    //     centsString += '0';
    // }

    // force 2 decimal places
    let cents = Math.abs(amount % 1.00);
    let centsString;
    centsHundred = Math.floor(cents * 100);
    if (centsHundred < 10) {
        centsString = `0${centsHundred}`;
    } else {
        centsString = `${centsHundred}`;
    }
    
    return `${negativeString}\$${unitsString}.${centsString}`;
}