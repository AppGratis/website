import SDKItem from './SDKItem';

/**
 * Represents a resource, which is an item with a quantity
 */
class SDKResource extends SDKItem {
  constructor(from) {
    super(from);
    this.quantity = 1;

    if (from) {
      this.quantity = from.quantity || this.quantity;
    }
  }

  copyFromPlainObject(from) {
    super.copyFromPlainObject(from);
    this.quantity = from.quantity;
  }

  getPlainObjectRepresentation() {
    let superObject = super.getPlainObjectRepresentation();
    return Object.assign({
      "quantity": this.quantity
    }, superObject);
  }
}

export default SDKResource;
