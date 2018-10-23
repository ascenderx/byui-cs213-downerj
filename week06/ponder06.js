/**
 * WEEK 05 PONDER
 * This program tests regular expression matching on input fields
 * in multiple HTML forms.
 * @author James D. Downer
 * @since October 22, 2018
 * @version 1.0
 */

/**
 * REGULAR EXPRESSION MAP
 * This map is organized by (CSS) class name; as such, this map's keys are
 * also used in window.onload() to set the individual callbacks.
 */
const REGEX_MAP = {
    'u-age': /^(((\d)?(\d))|([1](([0]\d)|([1][0-8]))))$/,
    'u-ssn': /^(\d{3}\-\d{2}\-\d{4})$/,
    'u-card': /^((\d{4}[ ]?){4})$/,
    'u-date': /^(([1-9]|([1][0-2]))\/([1-9]|([1-2]\d)|([3][0-1]))\/((175[3-9])|(17[6-9]\d)|(1[8-9]\d\d)|(20\d\d)|(2100)))$/,
    'u-state': /^((A[L,K,R,Z])|(C[A,O,T])|DE|FL|GA|HI|(I[A,D,L,N])|(K[S,Y])|LA|(M[A,D,E,I,N,O,S,T])|(N[C,D,E,H,J,M,V,Y])|(O[H,K,R])|PA|RI|(S[C,D])|(T[N,X])|UT|(V[A,T])|(W[A,I,V,Y]))$/,
    'u-money': /^(\$?\d{0,2}\d(\,?\d{3})*(\.\d{2})?)$/,
};

/**
 * IS DEFINED
 * Checks to see if a value is defined and not null.
 * @param val The value to check
 * @returns A boolean
 */
function isDefined(val) {
   return (val !== undefined) && (val !== null);
}

/**
 * GET ELEMENTS BY CLASS NAME
 * @param className The (CSS) class selector
 * @returns A DOM NodeList
 */
function getByClass(className) {
    return document.getElementsByClassName(className);
}

/**
 * SHOW LABEL
 * Sets the DOM element's `display` style to its initial state.
 * @param label The DOM element (assumes its <label>-like)
 * @throws An error if the element is undefined or null
 */
function showLabel(label) {
    if (!label) {
        throw 'Undefined label';
    }

    label.style.display = 'initial';
}

/**
 * HIDE LABEL
 * Sets the DOM element's `display` style to `none`.
 * @param label The DOM element (assumes its <label>-like)
 * @throws An error if the element is undefined or null
 */
function hideLabel(label) {
    if (!label) {
        throw 'Undefined label';
    }

    label.style.display = 'none';
}

/**
 * ON INPUT ELEMENT CHANGE
 * This function serves as a callback for <input>.onchange(). It gets the
 * value in the input field, trims it of extra whitespace, and checks it
 * against the corresponding regular expression.
 * If the value is valid, then the corresponding error message disappears;
 * otherwise, the error message is shown.
 * @param className The (CSS) class selector
 * @param index The index of the input box in the containing <form> element
 * @throws An error message if either the input box or class name was invalid
 */
function onInputChange(className, index) {
    // check if the class selector if valid
    if (!(className in REGEX_MAP)) {
        throw `Invalid class name "${className}"`;
    }

    // get the text box and corresponding error label
    let txtInput = getByClass(`${className} u-input`)[index];
    let lblError = getByClass(`${className} u-invalid`)[index];

    // check if the input box and error label exist
    if (!txtInput || !lblError) {
        throw `No input+label of class "${className}" found at index ${index}`;
    }

    // trim the textbox of white space
    let text = txtInput.value.trim();
    txtInput.value = text;

    // test the regular expression and update the error label
    let regex = REGEX_MAP[className];
    if (!text.match(regex)) {
        lblError.style.display = 'initial';
    } else {
        lblError.style.display = 'none';
    }
}

/**
 * WINDOW : ON LOAD
 * This function loops through each DOM <form> element and sets callbacks for the
 * contained pairs of <input/> and <span> elements.
 */
window.addEventListener('load', () => {
    // loop through each key in the regex map since each key is also a
    // CSS class selector
    for (let className in REGEX_MAP) {
        let inputs = getByClass(`${className} u-input`);
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];

            // create a simple callback wrapper (closure)
            function callback() {
                onInputChange(className, i);
            }

            // do an initial check on (each) element
            callback();

            // attach (each) element's event handlers and the callback
            // input.addEventListener('change', callback);
            // input.addEventListener('blur', callback);
            input.addEventListener('input', callback);
        }
    }
});