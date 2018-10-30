/**
 * AJAX : READY-STATE CONSTANTS
 */
const STATE_DONE = 4;

/**
 * AJAX : STATUS CONSTANTS
 */
const STATUS_SUCCESS = 200;
const STATUS_EMPTY = 204;
const STATUS_MISSING = 404;
const STATUS_INVALID = 406;

/**
 * AJAX : GENERIC HANDLER
 */
function ajax(method, resource, data) {
    let xhr = new XMLHttpRequest();

    let promise = new Promise((resolve, reject) => {
        xhr.onreadystatechange = function() {
            if (xhr.readyState == STATE_DONE) {
                if (xhr.status == STATUS_SUCCESS) {
                    resolve(xhr);
                } else {
                    reject(xhr);
                }
            }
        };
    });

    xhr.open(method, resource, true);
    xhr.send(data);
    
    return promise;
}

/**
 * AJAX : GET
 */
function ajaxGet(resource, data) {
    // construct GET URI parameters from data
    let params = '';
    let count = 0;
    for (let datum of data) {
        let key = encodeURIComponent(datum[0]);
        let value = encodeURIComponent(datum[1]);
        params += `${key}=${value}`;
        if (count++ > 0) {
            params += '&';
        }
    }
    let url = `${resource}?${params}`;

    // return the call to ajax()
    return new Promise((resolve, reject) => {
        ajax('GET', url, null)
        .then((xhr) => {
            resolve(xhr.responseText);
        })
        .catch((xhr) => {
            reject(xhr.status, xhr.responseText);
        });
    });
}

/**
 * AJAX : POST
 */
function ajaxPost(resource, data) {
    // return the call to ajax()
    return new Promise((resolve, reject) => {
        ajax('POST', resource, data)
        .then((xhr) => {
            resolve(xhr.responseText);
        })
        .catch((xhr) => {
            reject(xhr.status, xhr.responseText);
        });
    });
}