import SDKRepeatCondition from './SDKRepeatCondition'

class SDKWeeklyRepeatCondition extends SDKRepeatCondition {
  constructor(from) {
    super(from);

    this.frequency = SDKRepeatCondition.Frequency.Weekly;
    this.weekday = SDKWeeklyRepeatCondition.Day;

    if (from) {
      this.weekday = from.weekday || this.weekday;
    }
  }

  getPlainObjectRepresentation() {
    let superObject = super.getPlainObjectRepresentation();
    return Object.assign({
      "repeat": Object.assign({ "weekday": this.weekday }, superObject.repeat)
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
