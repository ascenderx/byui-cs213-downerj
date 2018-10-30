/**
 * (WEB) STORAGE MANAGER
 */
class StorageManager {
    /**
     * STORAGE MANAGER : CONSTRUCTOR
     */
    constructor(obj) {
        this.window = obj.window || window;
        this.type = this.window.sessionStorage;
        
        try {
            this.window.sessionStorage.setItem('test', 0);
            this.window.sessionStorage.removeItem('test');
            this.window.localStorage.setItem('test', 0);
            this.window.localStorage.removeItem('test');
            this.available = true;
        } catch (ex) {
            this.available = false;
        }
    }
    
    /**
     * STORAGE MANAGER : GET IS AVAILABLE
     */
    get available() {
        return this.available;
    }
    
    /**
     * STORAGE MANAGER : SET IS AVAILABLE
     * Unused as "available" is immutable after construction.
     */
    set available() { /* immutable */ }
    
    /**
     * STORAGE MANAGER : GET STORAGE TYPE
     */
    get type() {
        if (this.type == this.window.localStorage) {
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
                this.type = this.window.sessionStorage;
                break;
            
            case 'local':
            case 'persistent':
                this.type = this.window.localStorage;
                break;
            
            default:
                throw 'Invalid storage type';
        }
    }
    
    /**
     * STORAGE MANAGER : GET ITEM
     */
    getItem(key) {
        if (!this.available) {
            return null;
        }
        
        return this.type.getItem(key);
    }
    
    /**
     * STORAGE MANAGER : SET ITEM
     */
    setItem(key, value) {
        if (!this.available) {
            return false;
        }
        
        this.type.setItem(key, value);
        return true;
    }
    
    /**
     * STORAGE MANAGER : REMOVE ITEM
     */
    removeItem(key) {
        if (!this.available) {
            return false;
        }
        
        this.type.removeItem(key);
        return true;
    }
    
    /**
     * STORAGE MANAGER : HAS ITEM
     */
    hasItem(key) {
        if (!this.available) {
            return false;
        }
        
        let temp = this.type.getItem(key);
        return temp !== null;
    }
}