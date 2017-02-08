/**
 * SDKItem represents the base item class for SDK redeemables.
 * It is not meant to be used directly, but is a base for Features and Resources
 */
class SDKItem {
  constructor(from) {
    this.name = "";

    if (from) {
      this.name = from.name;
    }
  }

  copyFromPlainObject(from) {
    this.name = from.name;
  }

  getPlainObjectRepresentation() {
    return {
      "name": this.name
    }
  }
}

export default SDKItem;
