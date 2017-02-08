import SDKConfiguration from './SDKConfiguration';
import SDKOffer from './SDKOffer';

import SDKBaseCondition from './condition/SDKBaseCondition';
import SDKRepeatCondition from './condition/SDKRepeatCondition';
import SDKWeeklyRepeatCondition from './condition/SDKWeeklyRepeatCondition';

import SDKFeature from './item/SDKFeature';
import SDKResource from './item/SDKResource';

const SDK = {
  Configuration: SDKConfiguration,
  Offer: SDKOffer,
  BaseCondition: SDKBaseCondition,
  RepeatCondition: SDKRepeatCondition,
  WeeklyRepeatCondition: SDKWeeklyRepeatCondition,
  Feature: SDKFeature,
  Resource: SDKResource
}

export default SDK;
export const Configuration = SDKConfiguration;
export const Offer = SDKOffer;
export const BaseCondition = SDKBaseCondition;
export const RepeatCondition = SDKRepeatCondition;
export const WeeklyRepeatCondition = SDKWeeklyRepeatCondition;
export const Feature = SDKFeature;
export const Resource = SDKResource;
