import SDKOffer from './SDKOffer' //TODO remove this

import _ from 'lodash';

class SDKConfiguration {
  constructor() {
    this.version = 1;
    this.offers = [];
  }

  toJSON() {
    return JSON.stringify({
      "version": this.version,
      "offers": this.offers.map(o => o.getPlainObjectRepresentation())
    })
  }

  copyFromPlainObject(from) {
    this.version = from.version;
    this.offers = [];
    if (_.isArray(from.offers)) {
      from.offers.forEach(function (fromOffer) {
        let offer = new SDKOffer();
        offer.copyFromPlainObject(fromOffer);
        this.offers.push(offer);
      }, this);
    }
  }

  //TODO: Remove once testing is done
  addFakeData() {
    let offer = new SDKOffer();
    offer.name = "offer1";
    this.offers.push(offer);
    offer = new SDKOffer();
    offer.name = "offer2";
    this.offers.push(offer);
    return this;
  }
}

export default SDKConfiguration;
