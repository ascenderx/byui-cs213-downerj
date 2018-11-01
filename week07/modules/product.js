/**
 * PRODUCT
 */
class Product {
    /**
     * PRODUCT : CONSTRUCTOR
     */
    constructor(obj) {
        if (!('sku' in obj)) {
            throw 'Invalid product SKU';
        }
        this.sku = obj.sku;
        this.name = obj.name || 'Untitled';
        this.description = obj.description || 'N/A';
        this.imageURL = obj.imageURL || null;
        
        let price = obj.price;
        if (price === undefined || price === null) {
            price = 0.00;
        } else if (isNaN(price)) {
            throw `Invalid price "${price}"`;
        }
        let priceNum = Number(price);
        if (priceNum < 0.00) {
            throw `Invalid price "${price}"`;
        }
        this.price = priceNum;
    }
    
    /**
     * PRODUCT : GET SKU
     */
    get sku() {
        return this.sku;
    }
    
    /**
     * PRODUCT : SET SKU
     */
    set sku(sku) {
        this.sku = sku.toString();
    }
    
    /**
     * PRODUCT : GET NAME
     */
    get name() {
        return this.name;
    }
    
    /**
     * PRODUCT : SET NAME
     */
    set name(name) {
        this.name = name.toString();
    }
    
    /**
     * PRODUCT : GET DESCRIPTION
     */
    get description() {
        return this.description;
    }
    
    /**
     * PRODUCT : SET DESCRIPTION
     */
    set description(description) {
        this.description = description.toString();
    }

    /**
     * PRODUCT : GET IMAGE URL
     */
    get imageURL() {
        return this.imageURL;
    }

    /**
     * PRODUCT : SET IMAGE URL
     */
    set imageURL(url) {
        this.imageURL = url.toString();
    }
    
    /**
     * PRODUCT : GET PRICE
     */
    get price() {
        return this.price;
    }
    
    /**
     * PRODUCT : SET PRICE
     */
    set price(price) {
        if (isNaN(price)) {
            throw `Invalid price "${price}"`;
        }
        
        let priceNum = Number(price);
        if (priceNum < 0.00) {
            throw `Invalid price "${price}"`;
        }
        
        this.price = priceNum;
    }
}
