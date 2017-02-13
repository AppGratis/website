import React, { Component } from 'react';
import {
  Button, ButtonToolbar, Table, FormControl, FormGroup, InputGroup,
  ControlLabel, Checkbox, HelpBlock
} from 'react-bootstrap';
import Datetime from 'react-datetime';

import 'react-datetime/css/react-datetime.css';

import ResourceList from './ResourceList';
import FeatureList from './FeatureList';

import { BaseCondition, RepeatCondition, WeeklyRepeatCondition } from '../../model/SDK'

import _ from 'lodash';
import moment from 'moment';

class OfferEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offer: props.offer,
      customData: JSON.stringify(props.offer.data),
    }

    this.saveOffer = this.saveOffer.bind(this);
    this.getOfferRepeatFrequency = this.getOfferRepeatFrequency.bind(this);
    this.updateOfferRepeatFrequency = this.updateOfferRepeatFrequency.bind(this);
    this.updateOfferCondition = this.updateOfferCondition.bind(this);
    this.updateOffer = this.updateOffer.bind(this);
    this.updateCustomData = this.updateCustomData.bind(this);
    this.isCustomDataValid = this.isCustomDataValid.bind(this);
    this.parseCustomData = this.parseCustomData.bind(this);
    this.updateFeatures = this.updateFeatures.bind(this);
    this.updateResources = this.updateResources.bind(this);
  }

  saveOffer() {
    this.props.onSaveOffer(this.state.offer);
  }

  getOfferRepeatFrequency() {
    const {offer} = this.state;
    if (!_.isObject(offer.condition)) {
      // Fix the incorrect state since we know about it
      this.setState({ offer: Object.assign(this.state.offer, { condition: new BaseCondition() }) });
      return OfferEditor.Frequency.None;
    }

    let {frequency} = offer.condition;

    if (_.isString(frequency)) {
      //Incorrect values can be returned here but the select will just ignore it
      return frequency;
    }

    return OfferEditor.Frequency.None;
  }

  updateOfferRepeatFrequency(newFrequency) {
    const prevCondition = this.state.offer.condition;
    let condition;

    switch (newFrequency) {
      case OfferEditor.Frequency.None:
      default:
        condition = new BaseCondition(prevCondition);
        break;
      case OfferEditor.Frequency.Daily:
      case OfferEditor.Frequency.Monthly:
        condition = new RepeatCondition(prevCondition);
        condition.setFrequency(newFrequency);
        break;
      case OfferEditor.Frequency.Weekly:
        condition = new WeeklyRepeatCondition(prevCondition);
        condition.setFrequency(newFrequency);
        break;
    }

    this.setState({ offer: Object.assign(this.state.offer, { condition: condition }) });
  }

  updateOfferCondition(updatedFields) {
    let condition = this.state.offer.condition;
    if (!_.isObject(condition)) {
      condition = new BaseCondition();
    }

    condition = Object.assign(condition, updatedFields);

    this.setState({ offer: Object.assign(this.state.offer, { condition: condition }) });
  }

  updateOffer(updatedFields) {
    this.setState({ offer: Object.assign(this.state.offer, updatedFields) });
  }

  updateCustomData(value) {
    this.setState({
      customData: value,
      offer: Object.assign(this.state.offer, { data: this.parseCustomData(value) })
    });
  }

  updateFeatures(features) {
    this.setState({ offer: Object.assign(this.state.offer, { features: features }) });
  }

  updateResources(resources) {
    this.setState({ offer: Object.assign(this.state.offer, { resources: resources }) });
  }

  parseCustomData(data) {
    if (data === undefined) {
      data = this.state.customData;
    }
    try {
      const json = JSON.parse(data);
      if (json !== null && json !== undefined && !Array.isArray(json)) {
        return json;
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  isCustomDataValid() {
    return this.parseCustomData() !== null ? true : false;
  }

  getStartDateValidationError() {
    const {condition} = this.state.offer;
    if (!_.isObject(condition)) {
      return null; // Actually there's an error but we don't want to display it
    }

    if (condition.startDate === null) {
      return "You must specify a start date";
    }

    return null;
  }

  getEndDateValidationError() {
    const {condition} = this.state.offer;
    if (!_.isObject(condition)) {
      return null; // Actually there's an error but we don't want to display it
    }

    if (condition.endDate === null) {
      return null;
    }

    if (!moment(condition.endDate).isAfter(condition.startDate)) {
      return "End date must be after the start date";
    }

    return null;
  }

  getStartHourValidationError() {
    const {condition} = this.state.offer;
    if (!_.isObject(condition)) {
      return null; // Actually there's an error but we don't want to display it
    }

    if (this.getOfferRepeatFrequency() === OfferEditor.Frequency.None) {
      return null;
    }

    const {startHour} = condition;

    if (isNaN(startHour)) {
      return "Required";
    }

    if (startHour < 0 || startHour > 23) {
      return "From must be a value between 0 and 23";
    }

    if (Math.ceil(startHour) !== startHour) {
      return "From can't be a decimal value";
    }

    return null;
  }

  getEndHourValidationError() {
    const {condition} = this.state.offer;
    if (!_.isObject(condition)) {
      return null; // Actually there's an error but we don't want to display it
    }

    if (this.getOfferRepeatFrequency() === OfferEditor.Frequency.None) {
      return null;
    }

    const {startHour, endHour} = condition;

    if (isNaN(endHour)) {
      return "Required";
    }

    if (endHour < 1 || endHour > 24) {
      return "To must be a value between 1 and 24";
    }

    if (Math.ceil(endHour) !== endHour) {
      return "To can't be a decimal value";
    }

    if (!isNaN(startHour) && startHour >= endHour) {
      return "To must be after From"
    }

    return null;
  }

  isFormValid() {
    return this.getStartDateValidationError() === null &&
      this.getEndDateValidationError() === null &&
      this.getStartHourValidationError() === null &&
      this.getEndHourValidationError() === null &&
      this.isCustomDataValid() &&
      this.state.offer.name.length > 0;
  }

  render() {
    const {offer} = this.state;

    return (

      <div>
        <h4>Offer description</h4>
        Token
        <FormControl type="text" value={offer.token} readOnly ></FormControl><br />
        <FormGroup validationState={offer.name.length > 0 ? null : "error"}>
          <ControlLabel>Name</ControlLabel>
          <FormControl type="text" value={offer.name} onChange={(e) => this.updateOffer({ name: e.target.value })} ></FormControl><br />
        </FormGroup>
        Unlock Message (optional)<FormControl type="text" value={offer.unlockMessage == null ? "" : offer.unlockMessage} onChange={(e) => this.updateOffer({ unlockMessage: e.target.value })} ></FormControl><br />
        <FormGroup validationState={this.isCustomDataValid() ? null : "error"}>
          <ControlLabel>Custom Data</ControlLabel>
          <FormControl componentClass="textarea" value={this.state.customData} onChange={(e) => this.updateCustomData(e.target.value)} />
        </FormGroup>
        <br />
        {
          this.renderRedeemCondition()
        }
        <br />
        <h4>Resources</h4>
        <ResourceList resources={offer.resources} onUpdateResources={this.updateResources} />
        <br /> <h4>Features</h4>
        <FeatureList features={offer.features} onUpdateFeatures={this.updateFeatures} />
        <br /> <br />
        <ButtonToolbar>
          <Button bsStyle="primary"
            disabled={!this.isFormValid()}
            onClick={() => { if (this.isFormValid()) { this.props.onSaveOffer(this.state.offer) } }}>Save</Button>
          <Button onClick={this.props.onCancel}>Cancel</Button>
        </ButtonToolbar>
        <br /> <br />
      </div>
    );
  }

  renderRedeemCondition() {
    const {offer} = this.state;
    const {condition} = offer;
    const repeatFrequency = this.getOfferRepeatFrequency();
    const startDateValidationError = this.getStartDateValidationError();
    const endDateValidationError = this.getEndDateValidationError();
    const startHourValidationError = this.getStartHourValidationError();
    const endHourValidationError = this.getEndHourValidationError();

    return (
      <div>

        <h4>Redeem condition</h4>
        <Table>
          <tbody>
            <tr>
              <td style={{ borderTop: "none" }}>
                <FormGroup validationState={startDateValidationError ? "error" : null}>
                  <ControlLabel>Start date</ControlLabel>
                  <Datetime
                    value={condition.startDate}
                    onChange={(v) => this.updateOfferCondition({ startDate: _.isString(v) ? null : v.toDate() })} />
                  {
                    startDateValidationError !== null &&
                    <HelpBlock>{startDateValidationError}</HelpBlock>
                  }
                </FormGroup>
              </td>
              <td style={{ borderTop: "none" }}>
                <FormGroup validationState={endDateValidationError ? "error" : null}>
                  <ControlLabel>End date</ControlLabel>
                  <Datetime
                    inputProps={{ placeholder: "No end date" }}
                    value={condition.endDate}
                    onChange={(v) => this.updateOfferCondition({ endDate: _.isString(v) ? null : v.toDate() })} />
                  {
                    endDateValidationError !== null &&
                    <HelpBlock>{endDateValidationError}</HelpBlock>
                  }
                </FormGroup>
              </td>
            </tr>
          </tbody>
        </Table>
        <FormGroup>
          <Checkbox value={condition.newUsersOnly} onChange={(e) => this.updateOfferCondition({ newUsersOnly: e.target.checked })}>New users only</Checkbox>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Repeats:</ControlLabel>
          <FormControl componentClass="select" value={repeatFrequency} onChange={(e) => this.updateOfferRepeatFrequency(e.target.value)}>
            <option value={OfferEditor.Frequency.None}>Doesn't repeat (always redeemable until end date)</option>
            <option value={OfferEditor.Frequency.Daily}>Every day</option>
            <option value={OfferEditor.Frequency.Weekly}>Every week</option>
            <option value={OfferEditor.Frequency.Monthly}>Every month</option>
          </FormControl>
        </FormGroup>
        {
          repeatFrequency !== OfferEditor.Frequency.None &&
          <Table>
            <tbody>
              <tr>
                <td colSpan={3} style={{ borderTop: "none" }}>
                  {
                    repeatFrequency === OfferEditor.Frequency.Weekly &&
                    <FormGroup>
                      <FormControl componentClass="select" value={condition.weekday} onChange={(e) => this.updateOfferCondition({ weekday: e.target.value })}>
                        {
                          Object.keys(WeeklyRepeatCondition.Day).map((d) =>
                            <option key={d} value={WeeklyRepeatCondition.Day[d]}>On {d.toLowerCase()}s</option>
                          )
                        }
                      </FormControl>
                    </FormGroup>
                  }
                  {
                    repeatFrequency === OfferEditor.Frequency.Monthly &&
                    <HelpBlock>The offer will repeat on the same day of the month as the start date's</HelpBlock>
                  }
                </td>
              </tr>
              <tr>
                <td style={{ borderTop: "none" }}>
                  <FormGroup validationState={startHourValidationError ? "error" : null}>
                    <ControlLabel>From</ControlLabel>
                    <InputGroup>
                      <FormControl
                        style={{ width: "2em" }}
                        value={isNaN(condition.startHour) ? "" : condition.startHour}
                        onChange={(e) => this.updateOfferCondition({ startHour: parseInt(e.target.value, 10) })} />
                      <InputGroup.Addon>:00</InputGroup.Addon>
                    </InputGroup>
                    {
                      startHourValidationError !== null &&
                      <HelpBlock>{startHourValidationError}</HelpBlock>
                    }
                  </FormGroup>
                </td>
                <td style={{ borderTop: "none" }}>
                  <FormGroup validationState={endHourValidationError ? "error" : null}>
                    <ControlLabel>To</ControlLabel>
                    <InputGroup>
                      <FormControl
                        style={{ width: "2em" }}
                        value={isNaN(condition.endHour) ? "" : condition.endHour}
                        onChange={(e) => this.updateOfferCondition({ endHour: parseInt(e.target.value, 10) })} />
                      <InputGroup.Addon>:00</InputGroup.Addon>
                    </InputGroup>
                    {
                      endHourValidationError !== null &&
                      <HelpBlock>{endHourValidationError}</HelpBlock>
                    }
                  </FormGroup>
                </td>
                <td style={{ borderTop: "none" }}>
                  <br />
                  <Button bsStyle="link" onClick={() => this.updateOfferCondition({ startHour: 0, endHour: 24 })}>All day</Button>
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ borderTop: "none" }}>
                  <HelpBlock>Hours expressed in 24-hour time notation. Use "24" if you want the end hour to end at midnight.</HelpBlock>
                </td>
              </tr>
            </tbody>
          </Table>
        }
      </div>
    );
  }
}

OfferEditor.Frequency = {
  None: "none",
  Daily: RepeatCondition.Frequency.Daily,
  Weekly: RepeatCondition.Frequency.Weekly,
  Monthly: RepeatCondition.Frequency.Monthly,
};

OfferEditor.propTypes = {
  offer: React.PropTypes.object.isRequired,
  onSaveOffer: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired
}

export default OfferEditor;
