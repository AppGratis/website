import SDKBaseCondition from './SDKBaseCondition'

class SDKRepeatCondition extends SDKBaseCondition {
  constructor(from) {
    super(from);

    this.startHour = 0;
    this.endHour = 24;
    this.frequency = SDKRepeatCondition.Frequency.Daily;

    if (from) {
      this.startHour = from.startHour || this.startHour;
      this.endHour = from.endHour || this.endHour;
    }
  }

  setFrequency(frequency) {
    switch (frequency) {
      case SDKRepeatCondition.Frequency.Daily:
      case SDKRepeatCondition.Frequency.Weekly:
      case SDKRepeatCondition.Frequency.Monthly:
        this.frequency = frequency;
        break;
      default:
        this.frequency = SDKRepeatCondition.Frequency.Daily;
        break;
    }
  }

  copyFromPlainObject(from) {
    super.copyFromPlainObject(from);
    this.startHour = from["start_hour"] || 0;
    this.endHour = from["end_hour"] || 24;
    this.frequency = from["every"] || this.frequency;
  }

  getPlainObjectRepresentation() {
    return Object.assign({
      "repeat": {
        "every": this.frequency,
        "start_hour": this.startHour,
        "end_hour": this.endHour
      }
    }, super.getPlainObjectRepresentation());
  }
}

SDKRepeatCondition.Frequency = {
  Daily: "DAY",
  Weekly: "WEEK",
  Monthly: "MONTH"
}

export default SDKRepeatCondition;
