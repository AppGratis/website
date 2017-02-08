class SDKBaseCondition {
  constructor(from) {
    this.startDate = new Date();
    this.endDate = null;
    this.newUsersOnly = false;

    if (from) {
      this.startDate = from.startDate;
      this.endDate = from.endDate;
      this.newUsersOnly = from.newUsersOnly;
    }
  }

  copyFromPlainObject(from) {
    // This implementation makes way less checks than the SDK
    if (!from["start_date"]) {
      throw new Error("Invalid plain object representation of condition start_date");
    }
    this.startDate = new Date(from["start_date"] * 1000);
    if (from["end_date"]) {
      this.endDate = new Date(from["end_date"] * 1000);
    } else {
      this.endDate = null;
    }
    this.newUsersOnly = from["only_new_users"];
  }

  getPlainObjectRepresentation() {
    return {
      "start_date": Math.floor(this.startDate / 1000),
      "end_date": this.endDate ? Math.floor(this.endDate.getTime() / 1000) : null,
      "only_new_users": this.newUsersOnly
    }
  }
}

export default SDKBaseCondition;
