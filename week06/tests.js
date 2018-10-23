const AGE_MIN = 0;
const AGE_MAX = 118;
const AGE_DELTA = 1;
const DATE_MIN = new Date('1/1/1753').getTime(); // -6847779600000
const DATE_MAX = new Date('12/31/2100').getTime(); // +4133919600000
const NEXT_DAY = 24 * 3600 * 1000; // 1 day in milliseconds
const A_INDEX = 'A'.charCodeAt(0); // 65 (U+0041)

/**
 * WINDOW : ON LOAD
 * This function runs various input field tests.
 * These tests can be run with `window.fieldTests[<index>].run(<elemIndex>);`.
 * For example, to run the 'u-age' test, run `window.fieldTests[0].run(0);`.
 */
window.addEventListener('load', () => {
    window.fieldTests = [
        // test ages
        new FieldTest({
            className: 'u-age',
            tick: 250,
            startDelay: 200,
            min: AGE_MIN - 50,
            max: AGE_MAX + 50,
            delta: AGE_DELTA,
            valConverter: (age) => age
        }),

        // test dates
        new FieldTest({
            className: 'u-date',
            tick: 10,
            startDelay: 200,
            min: DATE_MIN - (NEXT_DAY * 20),
            max: DATE_MAX + (NEXT_DAY * 20),
            delta: NEXT_DAY,
            valConverter: (time) => new Date(time).toLocaleDateString()
        }),

        // test states
        new FieldTest({
            className: 'u-state',
            tick: 400,
            startDelay: 200,
            min: 0,
            max: 26 * 26 - 1,
            delta: 1,
            valConverter: (val) => {
                let char0 = (val / 26) + A_INDEX;
                let char1 = (val % 26) + A_INDEX;
                return String.fromCharCode(char0, char1);
            }
        }),
    ];
});