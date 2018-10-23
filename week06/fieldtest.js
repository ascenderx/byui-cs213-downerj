const CHANGE_EVENT = new Event('change');

class FieldTest {
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

    set tick(newTick) {
        this._tick = newTick;
    }

    get tick() {
        return this._tick;
    }

    set min(newMin) {
        this._min = newMin;
    }

    get min() {
        return this._min;
    }

    set max(newMax) {
        this._max = newMax;
    }

    get max() {
        return this._max;
    }

    set delta(newDelta) {
        this._delta = newDelta;
    }

    get delta() {
        return this._delta;
    }

    set valConverter(newValConverter) {
        this._valConverter = newValConverter;
    }

    get valConverter() {
        return this._valConverter;
    }

    _callback() {
        // do nothing if setInterval wasn't called
        if (!isDefined(this._interNum)) {
            return;
        }

        if (this._delayCounter <= this._startDelay) {
            this._elem.value = '';
            this._delayCounter += this._tick;
            return;
        }

        // otherwise, increment the counter and check
        try {
            this._elem.value = this._valConverter(this._v);
            this._elem.dispatchEvent(CHANGE_EVENT);
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

    stop() {
        if (isDefined(this._interNum)) {
            clearInterval(this._interNum);
            this._interNum = null;
            console.log('Interval stopped');
        }
    }
}