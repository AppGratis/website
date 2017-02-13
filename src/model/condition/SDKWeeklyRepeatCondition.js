import SDKRepeatCondition from './SDKRepeatCondition'

class SDKWeeklyRepeatCondition extends SDKRepeatCondition {
  constructor(from) {
    super(from);

    this.frequency = SDKRepeatCondition.Frequency.Weekly;
    this.weekday = SDKWeeklyRepeatCondition.Day.Sunday;

    if (from) {
      this.weekday = from.weekday || this.weekday;
    }
  }

  copyFromPlainObject(from) {
    super.copyFromPlainObject(from);
    this.weekday = from.weekday;
  }

  getPlainObjectRepresentation() {
    let superObject = super.getPlainObjectRepresentation();
    return Object.assign({
      "repeat": Object.assign(superObject.repeat, { "weekday": this.weekday })
    }, superObject);
  }
}

SDKWeeklyRepeatCondition.Day = {
  Sunday: "SUNDAY",
  Monday: "MONDAY",
  Tuesday: "TUESDAY",
  Wednesday: "WEDNESDAY",
  Thursday: "THURSDAY",
  Friday: "FRIDAY",
  Saturday: "SATURDAY"
}

export default SDKWeeklyRepeatCondition;
