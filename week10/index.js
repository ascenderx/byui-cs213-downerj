function byID(id) {
    return document.getElementById(id);
}

function constructElement(tagName, props) {
    let elem = document.createElement(tagName);

    if (props) {
        for (let key in props) {
            elem[key] = props[key];
        }
    }

    return elem;
}

function toSentenceCase(text) {
    let result = text.charAt(0).toUpperCase();

    for (let t = 1; t < text.length; t++) {
        result += text.charAt(t);
    }

    return result;
}

let frmMain;
let cityList;

function loadCountryList(fileName) {
    ajaxGet(fileName)
    .then((text) => {
        let countryFiles = JSON.parse(text);
        
        for (let name in countryFiles) {
            loadCityList(name, countryFiles[name]);
        }
    })
    .catch((err) => {
        console.error(err);  
    });
}

function loadCityList(countryName, fileName) {
    let labelOuter = constructElement('label'); 
    let radio = constructElement('radio', {
        name: 'country',
        value: countryName
    });
    let labelInner = constructElement('label', {
        innerText: toSentenceCase(countryName)
    });

    labelOuter.appendChild(radio);
    labelOuter.appendChild(labelInner);

    cityList[countryName] = [];
    ajaxGet(fileName)
    .then((text) => {
        let lines = text.split(/\n/);
        for (let line of lines) {
            let city = line.split(/\s+/)[0];
            cityList[countryName].push(city);
        }
    })
    .catch((err) => {
        console.error(err);  
    });
}

function onWindowLoad() {
    frmMain = byID('frm-main');
    cityList = {};
    
    loadCountryList('countries.json');
}

window.addEventListener('load', onWindowLoad);
