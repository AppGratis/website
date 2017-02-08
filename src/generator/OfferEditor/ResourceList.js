import React, { Component } from 'react';

import {
  Button, ButtonToolbar, Table,
  FormGroup, FormControl, HelpBlock
} from 'react-bootstrap';

import { Resource } from '../../model/SDK';

class ResourceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      creatingNewItem: false
    }
    this.resources = props.resources;

    this.startCreatingNewItem = this.startCreatingNewItem.bind(this);
    this.endCreatingNewItem = this.endCreatingNewItem.bind(this);
    this.deleteResource = this.deleteResource.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.resources = nextProps.resources;
  }

  startCreatingNewItem() {
    this.setState({ creatingNewItem: true });
  }

  endCreatingNewItem(item) {
    if (item !== null) {
      this.resources.push(item);
      this.props.onUpdateResources(this.resources);
    }
    this.setState({ creatingNewItem: false });
  }

  deleteResource(name) {
    this.props.onUpdateResources(this.resources.filter((f) => f.name.toUpperCase() !== name.toUpperCase()));
  }

  renderResourceList() {
    const resources = this.resources;

    return (
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {}
          {
            (resources.length === 0 && !this.state.creatingNewItem) &&
            <tr><td colSpan="3">No resources</td></tr>
          }
          {
            resources.length > 0 &&
            resources.map(r => this.renderResourceListItem(r))
          }
          {
            this.state.creatingNewItem === true &&
            <ResourceListNewItem resources={resources} onDismissWithItem={this.endCreatingNewItem} />
          }
          {
            this.state.creatingNewItem === false &&
            <tr><td colSpan="3">
              <Button bsStyle="primary" onClick={this.startCreatingNewItem}>Add resource</Button>
            </td></tr>
          }
        </tbody>
      </Table>
    )
  }

  renderResourceListItem(resource) {
    return (
      <tr key={resource.name}>
        <td>{resource.name}</td>
        <td>{resource.quantity}</td>
        <td><Button bsStyle="danger" onClick={() => this.deleteResource(resource.name)}>Delete</Button></td>
      </tr>
    )
  }

  render() {
    return (
      <div>
        {this.renderResourceList()}
      </div>
    );
  }
}

ResourceList.propTypes = {
  resources: React.PropTypes.array.isRequired,
  onUpdateResources: React.PropTypes.func.isRequired,
}

export default ResourceList;

class ResourceListNewItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "NEW_RESOURCE",
      quantity: 1,
    };

    this.resources = props.resources;

    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.resources = nextProps.resources;
  }

  onSave() {
    if (this.validateName() !== null || this.validateQuantity() !== null) {
      return null;
    }
    let resource = new Resource();
    resource.name = this.state.name.toUpperCase().trim();
    resource.quantity = Math.ceil(parseInt(this.state.quantity, 10));
    this.props.onDismissWithItem(resource);
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
    if (this.resources.find((f) => name.toUpperCase() === f.name.toUpperCase()) !== undefined) {
      return "The same resource cannot be added twice";
    }
    return null;
  }

  validateQuantity() {
    const {quantity} = this.state;

    if (isNaN(quantity)) {
      return "Quantity must be an integer";
    }

    if (quantity < 1) {
      return "Quantity must be greater than 0";
    }

    if (Math.ceil(quantity) !== parseInt(quantity, 10)) {
      return "Quantity can't be a decimal value";
    }

    return null;
  }

  render() {
    const nameValidationError = this.validateName();
    const quantityValidationError = this.validateQuantity();
    const allValidated = nameValidationError === null && quantityValidationError === null;

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
          <FormGroup validationState={quantityValidationError === null ? null : "error"}>
            <FormControl
              type="text"
              value={this.state.quantity}
              onChange={(e) => this.setState({ quantity: e.target.value.trim() })} />
            {
              quantityValidationError !== null &&
              <HelpBlock>{quantityValidationError}</HelpBlock>
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

ResourceListNewItem.propTypes = {
  resources: React.PropTypes.array.isRequired,
  onDismissWithItem: React.PropTypes.func.isRequired,
}
