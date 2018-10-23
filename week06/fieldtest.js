const INPUT_EVENT = new Event('input');

/**
 * FIELD TEST
 * This class wraps a single test on an input field and dispatches
 * its callback to the window's setInterval(), incrementing values
 * in succession on a timed loop.
 * The loop will stop once a maximum value is reached.
 */
class FieldTest {
    /**
     * FIELD TEST : CONSTRUCTOR
     * @param obj An object of values used to populate the instance
     */
    constructor(obj) {
        if (!('className' in obj)) {
            throw `Invalid class selector ${className}`;
        }

        let className = obj.className;
        if (!className || className.trim() === '') {
            throw 'Undefined class selector';
        }

        this._selector = obj.className.trim();
        this._tick = obj.tick || 1;
        this._startDelay = obj.startDelay || 0;
        this._min = obj.min || 0;
        this._max = obj.max || 0;
        this._delta = obj.delta || 1;
        this._valConverter = obj.valConverter || (() => {});

        this._interNum = null;
        this._elemIndex = null;
        this._elem;
        this._v = null;
        this._delayCounter = null;
    }

    /**
     * FIELD TEST : GET TICK
     * This is how long setInterval() waits before firing the internal
     * callback function again.
     * @returns The current tick value
     */
    get tick() {
        return this._tick;
    }

    /**
     * FIELD TEST : SET TICK
     * @param newTick The new tick value
     */
    set tick(newTick) {
        this._tick = newTick;
    }

    /**
     * FIELD TEST : GET MIN
     * This is the initial interval value.
     * @returns The current minimum value
     */
    get min() {
        return this._min;
    }

    /**
     * FIELD TEST : SET MIN
     * @param newMin The new minimum value
     */
    set min(newMin) {
        this._min = newMin;
    }

    /**
     * FIELD TEST : GET MAX
     * This is the value that triggers the end of the loop.
     * @returns The current maximum value
     */
    get max() {
        return this._max;
    }

    /**
     * FIELD TEST : SET MAX
     * @param newMax The new maximum value
     */
    set max(newMax) {
        this._max = newMax;
    }

    /**
     * FIELD TEST : GET DELTA
     * This is how much the internal value is changed per tick cycle.
     * @returns The current delta value
     */
    get delta() {
        return this._delta;
    }

    /**
     * FIELD TEST : SET DELTA
     * @param newDelta The new delta value
     */
    set delta(newDelta) {
        this._delta = newDelta;
    }

    /**
     * FIELD TEST : GET VALUE CONVERTER
     * The value converter is a user-defined function that determines
     * how the internal integer will be represented in the input field.
     * @returns The current value conversion function
     */
    get valConverter() {
        return this._valConverter;
    }

    /**
     * FIELD TEST : SET VALUE CONVERTER
     * @param newValConverter The new value conversion function
     */
    set valConverter(newValConverter) {
        this._valConverter = newValConverter;
    }

    /**
     * FIELD TEST : CALLBACK
     * This function is called once per tick cycle, updating the
     * given input element and firing an "input" event.
     */
    _callback() {
        // do nothing if setInterval wasn't called
        if (!isDefined(this._interNum)) {
            return;
        }

        // wait, if necessary
        if (this._delayCounter <= this._startDelay) {
            this._elem.value = '';
            this._delayCounter += this._tick;
            return;
        }

        // otherwise, increment the counter and check
        try {
            this._elem.value = this._valConverter(this._v);
            this._elem.dispatchEvent(INPUT_EVENT);
        } catch (ex) {
            this.stop();
            throw ex;
        }
        this._v += this._delta;
        
        // stop the loop if we've exceed the maximum
        if (this._v > this._max) {
            this.stop();
        }
    }

    /**
     * FIELD TEST : RUN
     * Begins the loop.
     * @param elemIndex The index on the corresponding DOM NodeArray
     */
    run(elemIndex) {
        if (!isDefined(elemIndex)) {
            throw `Undefined index element`;
        }

        this._elem = getByClass(`${this._selector} u-input`)[elemIndex];
        this._elemIndex = elemIndex;
        this._v = this._min;
        this._delayCounter = 0;
        this._interNum = setInterval(this._callback.bind(this), this._tick);
    }

    /**
     * FIELD TEST : STOP
     * Stops the loop.
     */
    stop() {
        if (isDefined(this._interNum)) {
            clearInterval(this._interNum);
            console.log(`Interval ${this._interNum} stopped (${this._selector}[${this._elemIndex}])`);
            this._interNum = null;
        }
    }
}