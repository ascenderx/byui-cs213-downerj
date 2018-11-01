/**
 * PRODUCT
 */
class Product {
    /**
     * PRODUCT : CONSTRUCTOR
     */
    constructor(obj) {
        if (!('sku' in obj) || obj.sku === undefined || obj.sku === null) {
            throw 'Product:new() -> Invalid product SKU';
        }
        this._sku = obj.sku.toString();
        this._name = (obj.name || 'Untitled').toString();
        this._description = (obj.description || 'N/A').toString();
        this._imageURL = (obj.imageURL || null).toString();
        
        let price = obj.price;
        if (price === undefined || price === null) {
            price = 0.00;
        } else if (isNaN(price)) {
            throw `Product:new() -> Invalid price "${price}"`;
        }
        let priceNum = Number(price);
        if (priceNum < 0.00) {
            throw `Product:new() -> Invalid price "${price}"`;
        }
        this._price = priceNum;
    }
    
    /**
     * PRODUCT : GET SKU
     */
    get sku() {
        return this._sku;
    }
    
    /**
     * PRODUCT : SET SKU
     */
    set sku(sku) {
        this._sku = sku.toString();
    }
    
    /**
     * PRODUCT : GET NAME
     */
    get name() {
        return this._name;
    }
    
    /**
     * PRODUCT : SET NAME
     */
    set name(name) {
        this._name = name.toString();
    }
    
    /**
     * PRODUCT : GET DESCRIPTION
     */
    get description() {
        return this._description;
    }
    
    /**
     * PRODUCT : SET DESCRIPTION
     */
    set description(description) {
        this._description = description.toString();
    }

    /**
     * PRODUCT : GET IMAGE URL
     */
    get imageURL() {
        return this._imageURL;
    }

    /**
     * PRODUCT : SET IMAGE URL
     */
    set imageURL(url) {
        this._imageURL = url.toString();
    }
    
    /**
     * PRODUCT : GET PRICE
     */
    get price() {
        return this._price;
    }
    
    /**
     * PRODUCT : SET PRICE
     */
    set price(price) {
        if (isNaN(price)) {
            throw `Product:setPrice() -> Invalid price "${price}"`;
        }
        
        let priceNum = Number(price);
        if (priceNum < 0.00) {
            throw `Product:setPrice() -> Invalid price "${price}"`;
        }
        
        this._price = priceNum;
    }
}
