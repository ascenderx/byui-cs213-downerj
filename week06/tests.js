let MIN = 0;
let MAX = 118;
let v = MIN;
let tick = 250;
let intervalNum;
let input = document.getElementsByClassName('u-age u-input')[0];

function isDefined(val) {
    return (val === null) || (val === undefined);
}

function callback() {
    // do nothing if setInterval wasn't called
    if (!isDefined(intervalNum)) {
        return;
    }

    // otherwise, increment the counter and check
    input.value = v++;
    onInputChange('u-age', 0);
    
    // stop the loop if we've exceed the maximum
    if (v > MAX) {
        clearInterval(intervalNum);
    }
}

setInterval(callback, tick);