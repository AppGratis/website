import {
  BaseCondition, RepeatCondition, WeeklyRepeatCondition,
  Feature, Resource
} from './SDK';

import _ from 'lodash';
import uuid from 'uuid';

class SDKOffer {
  constructor() {
    this.token = uuid();
    this.name = ""; // Front-facing name that the SDKs don't care about
    this.unlockMessage = null;
    this.features = [];
    this.resources = [];
    this.data = {};
    this.condition = new BaseCondition();
  }

  copyFromPlainObject(from) {
    this.token = from.token;
    this.name = from.name;
    this.unlockMessage = from.unlock_message;

    this.features = [];
    if (_.isArray(from.features)) {
      from.features.forEach(function (fromFeature) {
        let feature = new Feature();
        feature.copyFromPlainObject(fromFeature);
        this.features.push(feature);
      }, this);
    }

    this.resources = [];
    if (_.isArray(from.resources)) {
      from.resources.forEach(function (fromResource) {
        let resource = new Resource();
        resource.copyFromPlainObject(fromResource);
        this.resources.push(resource);
      }, this);
    }

    this.data = _.isEmpty(from.data) ? {} : from.data;

    // It would be better that SDKOffer does not know about every condition and
    // split this into a factory
    const fromConditions = from.conditions;
    if (_.isEmpty(fromConditions)) {
      this.condition = new BaseCondition();
    } else {
      if (_.isObject(fromConditions.repeat)) {
        if (fromConditions.repeat.every === RepeatCondition.Weekly) {
          this.condition = new WeeklyRepeatCondition();
        } else {
          this.condition = new RepeatCondition();
        }
      } else {
        this.condition = new BaseCondition();
      }
      this.condition.copyFromPlainObject(fromConditions);
    }
  }

  getPlainObjectRepresentation() {
    return {
      "name": this.name,
      "token": this.token,
      "unlock_message": this.unlockMessage,
      "features": this.features.map(r => r.getPlainObjectRepresentation()),
      "resources": this.resources.map(r => r.getPlainObjectRepresentation()),
      "data": _.isEmpty(this.data) ? null : this.data,
      "conditions": this.condition.getPlainObjectRepresentation(),
    }
  }
}

export default SDKOffer;
