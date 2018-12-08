/**
 * PRODUCT
 */
class Product {
  /**
   * PRODUCT : CONSTRUCTOR
   * @param obj The key-value map of properties to bind
   * @throws    Exception if SKU is undefined or if the price is not a non-negative number
   */
  constructor(obj) {
    obj = obj || {};
    
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
      throw `Product:new() -> Invalid price '${price}'`;
    }
    let priceNum = Number(price);
    if (priceNum < 0.00) {
      throw `Product:new() -> Invalid price '${price}'`;
    }
    this._price = priceNum;
  }
  
  /**
   * PRODUCT : GET SKU
   * @returns The product SKU
   */
  get sku() {
    return this._sku;
  }
  
  /**
   * PRODUCT : SET SKU
   * @param sku The new SKU
   */
  set sku(sku) {
      this._sku = sku.toString();
  }
  
  /**
   * PRODUCT : GET NAME
   * @returns The product name
   */
  get name() {
    return this._name;
  }
  
  /**
   * PRODUCT : SET NAME
   * @param name The new name
   */
  set name(name) {
    this._name = name.toString();
  }
  
  /**
   * PRODUCT : GET DESCRIPTION
   * @returns The product description
   */
  get description() {
    return this._description;
  }
  
  /**
   * PRODUCT : SET DESCRIPTION
   * @param description The new description
   */
  set description(description) {
    this._description = description.toString();
  }

  /**
   * PRODUCT : GET IMAGE URL
   * @returns The product image URL
   */
  get imageURL() {
    return this._imageURL;
  }

  /**
   * PRODUCT : SET IMAGE URL
   * @param url The new image URL
   */
  set imageURL(url) {
    this._imageURL = url.toString();
  }
  
  /**
   * PRODUCT : GET PRICE
   * @returns The product price
   */
  get price() {
    return this._price;
  }
  
  /**
   * PRODUCT : SET PRICE
   * @param price The new product price
   * @throws      An exception if the price is not a non-negative number
   */
  set price(price) {
    if (isNaN(price)) {
      throw `Product:setPrice() -> Invalid price '${price}'`;
    }
    
    let priceNum = Number(price);
    if (priceNum < 0.00) {
      throw `Product:setPrice() -> Invalid price '${price}'`;
    }
    
    this._price = priceNum;
  }
}
