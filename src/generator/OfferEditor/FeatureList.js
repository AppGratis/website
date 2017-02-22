import React, { Component } from 'react';

import {
  Button, ButtonToolbar, Table, InputGroup,
  FormGroup, FormControl, Checkbox, HelpBlock, Tooltip, OverlayTrigger
} from 'react-bootstrap';

import { Feature } from '../../model/SDK';

class FeatureList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      creatingNewItem: false
    }
    this.features = props.features;

    this.startCreatingNewItem = this.startCreatingNewItem.bind(this);
    this.endCreatingNewItem = this.endCreatingNewItem.bind(this);
    this.deleteFeature = this.deleteFeature.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.features = nextProps.features;
  }

  startCreatingNewItem() {
    this.setState({ creatingNewItem: true });
  }

  endCreatingNewItem(item) {
    if (item !== null) {
      this.features.push(item);
      this.props.onUpdateFeatures(this.features);
    }
    this.setState({ creatingNewItem: false });
  }

  deleteFeature(name) {
    this.props.onUpdateFeatures(this.features.filter((f) => f.name.toUpperCase() !== name.toUpperCase()));
  }

  renderFeatureList() {
    const features = this.features;
    return (
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time to live (minutes)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            (features.length === 0 && !this.state.creatingNewItem) &&
            <tr><td colSpan="3">No features</td></tr>
          }
          {
            features.length > 0 &&
            features.map(r => this.renderFeatureListItem(r))
          }
          {
            this.state.creatingNewItem === true &&
            <FeatureListNewItem features={features} onDismissWithItem={this.endCreatingNewItem} />
          }
          {
            this.state.creatingNewItem === false &&
            <tr><td colSpan="3">
              <Button bsStyle="primary" onClick={this.startCreatingNewItem}>Add Feature</Button>
            </td></tr>
          }
        </tbody>
      </Table>
    )
  }

  renderFeatureListItem(feature) {
    return (
      <tr key={feature.name}>
        <td>{feature.name}</td>
        <td>{feature.lifetime === Feature.UnlimitedLifetime ? "Unlimited" : feature.lifetime}</td>
        <td><Button bsStyle="danger" onClick={() => this.deleteFeature(feature.name)}>Delete</Button></td>
      </tr>
    )
  }

  render() {
    return (
      <div>
        {this.renderFeatureList()}
      </div>
    );
  }
}

FeatureList.propTypes = {
  features: React.PropTypes.array.isRequired,
  onUpdateFeatures: React.PropTypes.func.isRequired,
}

export default FeatureList;

class FeatureListNewItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "NEW_FEATURE",
      unlimitedLifetime: true,
      lifetime: 3600,
    };

    this.features = props.features;

    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.features = nextProps.features;
  }

  onSave() {
    if (this.validateName() !== null || this.validateTTLInput() !== null) {
      return null;
    }
    let feature = new Feature();
    feature.name = this.state.name.toUpperCase().trim();
    feature.lifetime = this.state.unlimitedLifetime ? Feature.UnlimitedLifetime : Math.ceil(parseInt(this.state.lifetime, 10));
    this.props.onDismissWithItem(feature);
  }

  onCancel() {
    this.props.onDismissWithItem(null);
  }

  validateName() {
    const {name} = this.state;
    if (name.length < 1) {
      return "You must specify a name";
    }
    // Uppercasing is not the best method for insensitive comparaison, but it does the job well enough here
    if (this.features.find((f) => name.toUpperCase() === f.name.toUpperCase()) !== undefined) {
      return "The same feature cannot be added twice";
    }
    return null;
  }

  validateTTLInput() {
    if (this.state.unlimitedLifetime) {
      return null;
    }

    const {lifetime} = this.state;

    if (isNaN(lifetime)) {
      return "Time to live must be a duration in minutes";
    }

    if (lifetime < 1) {
      return "Time to live must be greater than 0";
    }

    if (Math.ceil(lifetime) !== parseInt(lifetime, 10)) {
      return "Time to live can't be a decimal value";
    }

    return null;
  }

  render() {
    const nameValidationError = this.validateName();
    const TTLValidationError = this.validateTTLInput();
    const allValidated = nameValidationError === null && TTLValidationError === null;

    const unlimitedLifetimeTooltip = (
      <Tooltip id="unlimited-lifetime-tooltip">Uncheck this if you want to specify a time to live for the feature once redeemed. Otherwise, the feature will be unlocked forever.</Tooltip>
    );

    return (
      <tr>
        <td>
          <FormGroup
            validationState={nameValidationError === null ? null : "error"}>
            <FormControl
              type="text"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value.toUpperCase() })} />
            {
              nameValidationError !== null &&
              <HelpBlock>{nameValidationError}</HelpBlock>
            }
          </FormGroup>
        </td>
        <td>
          <FormGroup validationState={TTLValidationError === null ? null : "error"}>
            <InputGroup>
              <InputGroup.Addon>
                <OverlayTrigger overlay={unlimitedLifetimeTooltip}>
                  <Checkbox style={{ margin: "0", paddingBottom: "0", minHeight: "0", paddingLeft: "25px" }} checked={!this.state.unlimitedLifetime} onChange={(e) => this.setState({ unlimitedLifetime: !e.target.checked })} />
                </OverlayTrigger>
              </InputGroup.Addon>
              <FormControl
                type="text"
                readOnly={this.state.unlimitedLifetime}
                value={this.state.unlimitedLifetime ? "Unlimited" : this.state.lifetime}
                onChange={(e) => this.setState({ lifetime: e.target.value.trim() })} />
            </InputGroup>
            {
              TTLValidationError !== null &&
              <HelpBlock>{TTLValidationError}</HelpBlock>
            }
          </FormGroup></td>
        <td>
          <ButtonToolbar>
            <Button bsStyle="primary" disabled={!allValidated} onClick={allValidated ? this.onSave : null}>Save</Button>
            <Button bsStyle="link" onClick={this.onCancel}>Cancel</Button>
          </ButtonToolbar>
        </td>
      </tr>
    )
  }
}

FeatureListNewItem.propTypes = {
  features: React.PropTypes.array.isRequired,
  onDismissWithItem: React.PropTypes.func.isRequired,
}
