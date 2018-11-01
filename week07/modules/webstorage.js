/**
 * (WEB) STORAGE MANAGER
 */
class StorageManager {
    /**
     * STORAGE MANAGER : CONSTRUCTOR
     * @param obj The key-value map of properties to bind
     */
    constructor(obj) {
        obj = obj || {};

        this._window = obj.window || window;
        this._type = this._window.sessionStorage;
        
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
     * @returns A boolean of whether web storage is available
     */
    get available() {
        return this._available;
    }
    
    /**
     * STORAGE MANAGER : SET IS AVAILABLE
     * Unused as "available" is immutable after construction.
     * @param dummy Unused
     * @throws      Exception when this setter is called
     */
    set available(dummy) { 
        throw "StorageManager:available:set() -> Immutable property";
    }
    
    /**
     * STORAGE MANAGER : GET STORAGE TYPE
     * @returns The window storage type (persistent or volatile)
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
     * @param type The window type as a string
     */
    set type(type) {
        switch (type) {
            case 'session':
            case 'default':
            case 'volatile':
                this._type = this._window.sessionStorage;
                break;
            
            case 'local':
            case 'persistent':
                this._type = this._window.localStorage;
                break;
            
            default:
                throw 'Invalid storage type';
        }
    }
    
    /**
     * STORAGE MANAGER : GET ITEM
     * @param key The key of the item to get from storage
     * @returns   The item's value or null if not present
     */
    getItem(key) {
        if (!this._available) {
            return null;
        }
        
        return JSON.parse(this._type.getItem(key));
    }
    
    /**
     * STORAGE MANAGER : SET ITEM
     * @param key   The key of the item to put into storage
     * @param value The value of the item
     * @returns     A boolean of whether or not the addition was successful
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
     * @param key The key of the item to remove from storage
     * @returns   A boolean of whether or not the removal was successful
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
     * @param key The key of the item whose presence to query
     * @returns   A boolean of whether the item is present in the selected storage
     */
    hasItem(key) {
        if (!this._available) {
            return false;
        }
        
        let temp = this._type.getItem(key);
        return temp !== null;
    }
}