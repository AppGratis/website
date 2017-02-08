import SDKItem from './SDKItem';

/**
 * Represents a feature, which is an item with an optional time to live
 */
class SDKFeature extends SDKItem {
  constructor(from) {
    super(from);
    this.lifetime = SDKFeature.UnlimitedLifetime;

    if (from) {
      this.lifetime = from.lifetime || this.lifetime;
    }
  }

  copyFromPlainObject(from) {
    super.copyFromPlainObject(from);
    this.lifetime = from.lifetime;
  }

  getPlainObjectRepresentation() {
    let superObject = super.getPlainObjectRepresentation();
    return Object.assign({
      "lifetime": this.lifetime
    }, superObject);
  }

  isTimeLimited() {
    return this.lifetime !== SDKFeature.UnlimitedLifetime;
  }
}

SDKFeature.UnlimitedLifetime = -1;

export default SDKFeature;
