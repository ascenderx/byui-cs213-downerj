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

function constructElement(tagName, props) {
  if (!tagName) {
    throw 'constructElement() -> Undefined tag name';
  }

  let elem = document.createElement(tagName);

  if (!props) {
    return elem;
  }

  for (let key in props) {
    elem[key] = props[key];
  }

  return elem;
}

function newBr() {
  return document.createElement('br');
}

function newHr() {
  return document.createElement('hr');
}

function addChildren(elem, nodes) {
  for (let node of nodes) {
    elem.appendChild(node);
  }
}

function setStyles(elem, styles) {
  for (let key of styles) {
    elem.style[key] = styles[key];
  }
}