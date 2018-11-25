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

function br() {
    return constructElement('br');
}

function hr() {
    return constructElement('hr');
}

function toSentenceCase(text) {
    let result = text.charAt(0).toUpperCase();

    for (let t = 1; t < text.length; t++) {
        result += text.charAt(t);
    }

    return result;
}

let frmCountries;
let frmCities;
let divPopulations;
let countryFiles;
let cityList;

function loadCountryList(fileName) {
    ajaxGet(fileName)
    .then((text) => {
        countryFiles = JSON.parse(text);
        
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
    let radio = constructElement('input', {
        type: 'radio',
        name: 'country',
        value: countryName
    });
    let labelInner = constructElement('label', {
        innerText: toSentenceCase(countryName)
    });

    labelOuter.appendChild(radio);
    labelOuter.appendChild(labelInner);
    labelOuter.appendChild(br());

    frmCountries.appendChild(labelOuter);

    cityList[countryName] = [];
    ajaxGet(fileName)
    .then((text) => {
        let lines = text.split(/\n/);
        for (let line of lines) {
            let city = line.split(/\s\s+/)[0];
            cityList[countryName].push(city);
        }
    })
    .catch((err) => {
        console.error(err);  
    });
}

function onCountryChange() {
    // cleanup
    for (let elem of frmCities.children) {
        elem.remove();
    }
    frmCities.innerHTML = '';

    let country = frmCountries.elements['country'].value;
    let cities = cityList[country];

    for (let city of cities) {
        if (!city) {
            continue;
        }

        let labelOuter = constructElement('label');
        let check = constructElement('input', {
            type: 'checkbox',
            name: 'cities',
            value: city
        });
        let labelInner = constructElement('label', {
            innerText: city
        });

        labelOuter.appendChild(check);
        labelOuter.appendChild(labelInner);
        labelOuter.appendChild(br());

        frmCities.appendChild(labelOuter);
    }

    let btQuery = constructElement('button', {
        type: 'button',
        id: 'bt-query',
        innerText: 'Query'
    });
    btQuery.addEventListener('click', () => {
        onQuery(country);
    });
    frmCities.appendChild(btQuery);
}

function onQuery(country) {
    // cleanup
    for (let elem of divPopulations.children) {
        elem.remove();
    }
    divPopulations.innerText = '';

    let cities = [];
    for (let elem of frmCities.children) {
        if (elem.tagName === 'LABEL') {
            let chkbox = elem.children[0];
            if (chkbox.checked) {
                cities.push(chkbox.value);
            }
        }
    }

    let fileName = countryFiles[country];
    ajaxGet(fileName)
    .then((text) => {
        text = text.trim();
        if (!text) {
            return;
        }
        
        let lines = text.split(/\n/);
        let ul = constructElement('ul');
        for (let line of lines) {
            if (!line) {
                continue;
            }

            let city = line.split(/\s\s+/);
            let name = city[0];
            let pop = city[1];

            if (cities.indexOf(name) < 0) {
                continue;
            }

            let li = constructElement('li', {
                innerText: `${name}: ${pop}`
            });
            ul.appendChild(li);
        }

        divPopulations.appendChild(ul);
    })
    .catch((err) => {
        console.error(err);
    });
}

function onWindowLoad() {
    frmCountries = byID('frm-countries');
    frmCities = byID('frm-cities');
    divPopulations = byID('div-populations');
    cityList = {};
    
    loadCountryList('countries.json');
}

window.addEventListener('load', onWindowLoad);
