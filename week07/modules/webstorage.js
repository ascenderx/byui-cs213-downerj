/**
 * (WEB) STORAGE MANAGER
 */
class StorageManager {
    /**
     * STORAGE MANAGER : CONSTRUCTOR
     */
    constructor(obj) {
        this._window = obj.window || window;
        this._type = this.window.sessionStorage;
        
        try {
            this._window.sessionStorage.setItem('test', 0);
            this._window.sessionStorage.removeItem('test');
            this._window.localStorage.setItem('test', 0);
            this._window.localStorage.removeItem('test');
            this._available = true;
        } catch (ex) {
            this._available = false;
        }
    }
    
    /**
     * STORAGE MANAGER : GET IS AVAILABLE
     */
    get available() {
        return this._available;
    }
    
    /**
     * STORAGE MANAGER : SET IS AVAILABLE
     * Unused as "available" is immutable after construction.
     */
    set available(dummy) { 
        throw "StorageManager:available:set() -> Immutable property";
    }
    
    /**
     * STORAGE MANAGER : GET STORAGE TYPE
     */
    get type() {
        if (this._type == this._window.localStorage) {
            return 'persistent';
        } else {
            return 'volatile';
        }
    }
    
    /**
     * STORAGE MANAGER : SET STORAGE TYPE
     */
    set type(type) {
        switch (type) {
            case 'session':
            case 'default':
            case 'volatile':
                this._type = this.window.sessionStorage;
                break;
            
            case 'local':
            case 'persistent':
                this._type = this.window.localStorage;
                break;
            
            default:
                throw 'Invalid storage type';
        }
    }
    
    /**
     * STORAGE MANAGER : GET ITEM
     */
    getItem(key) {
        if (!this._available) {
            return null;
        }
        
        return this._type.getItem(key);
    }
    
    /**
     * STORAGE MANAGER : SET ITEM
     */
    setItem(key, value) {
        if (!this._available) {
            return false;
        }
        
        this._type.setItem(key, value);
        return true;
    }
    
    /**
     * STORAGE MANAGER : REMOVE ITEM
     */
    removeItem(key) {
        if (!this._available) {
            return false;
        }
        
        this._type.removeItem(key);
        return true;
    }
    
    /**
     * STORAGE MANAGER : HAS ITEM
     */
    hasItem(key) {
        if (!this._available) {
            return false;
        }
        
        let temp = this._type.getItem(key);
        return temp !== null;
    }
}