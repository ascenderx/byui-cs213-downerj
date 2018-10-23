const AGE_MIN = 0;
const AGE_MAX = 118;
const AGE_DELTA = 1;
const DATE_MIN = -6847779600000; // 1/1/1753
const DATE_MAX = +4133919600000; // 12/31/2100
const NEXT_DAY = 24 * 3600 * 1000; // ~1 day in milliseconds

window.addEventListener('load', () => {
    // test ages
    new FieldTest({
        className: 'u-age',
        tick: 250,
        startDelay: 200,
        min: AGE_MIN - 50,
        max: AGE_MAX + 50,
        delta: AGE_DELTA,
        valConverter: (age) => age
    }).run(0);

    // test dates
    new FieldTest({
        className: 'u-date',
        tick: 10,
        startDelay: 200,
        min: DATE_MIN - (NEXT_DAY * 20),
        max: DATE_MAX + (NEXT_DAY * 20),
        delta: NEXT_DAY,
        valConverter: (time) => new Date(time).toLocaleDateString()
    }).run(0);
});