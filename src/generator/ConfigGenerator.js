import React, { Component } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';

import OfferList from './OfferList';
import OfferEditor from './OfferEditor/OfferEditor';
import Export from './Export';

import { Configuration, Offer } from '../model/SDK';

import _ from 'lodash';

class ConfigGenerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTabIndex: 1,
      offers: this.getSDKConfigurationFromLocalStorage().offers,
      editedOffer: null // Store the offer being edited here. If there is one being edited, Edit/Export will not be shown, but the edition UI will
    }

    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.newOffer = this.newOffer.bind(this);
    this.beginEditingOffer = this.beginEditingOffer.bind(this);
    this.endEditingOffer = this.endEditingOffer.bind(this);
    this.saveEditedOffer = this.saveEditedOffer.bind(this);
    this.deleteOffer = this.deleteOffer.bind(this);
  }

  componentDidUpdate() {
    this.saveSDKConfigurationToLocalStorage();
  }

  handleTabSelect(tabIndex) {
    this.setState({ activeTabIndex: tabIndex });
  }

  getConfigurationJSON() {
    let conf = new Configuration();
    conf.offers = this.state.offers;
    return conf.toJSON();
  }

  getSDKConfigurationFromLocalStorage() {
    if (window.localStorage === undefined) {
      alert("The LocalStorage API isn't available in this browser. Configuration will not be persisted.\nPlease use a newer browser such as Chrome, Firefox or Edge.");
      return;
    }

    const confJSON = window.localStorage.getItem(ConfigGenerator.LocalStorageKey);
    if (!_.isEmpty(confJSON)) {
      try {
        const confObject = JSON.parse(confJSON);
        let conf = new Configuration();
        conf.copyFromPlainObject(confObject);
        return conf;
      } catch (err) {
        console.error("Error while reading JSON from localstorage " + err);
      }
    }

    return new Configuration();
  }

  saveSDKConfigurationToLocalStorage() {
    if (window.localStorage === undefined) {
      return;
    }

    window.localStorage.setItem(ConfigGenerator.LocalStorageKey, this.getConfigurationJSON());
  }

  newOffer() {
    let offer = new Offer();
    offer.name = "New Offer";
    this.setState({ offers: this.state.offers, editedOffer: offer });
  }

  beginEditingOffer(offer) {
    this.setState({ offers: this.state.offers, editedOffer: offer });
  }

  endEditingOffer() {
    this.setState({ editedOffer: null });
  }

  saveEditedOffer(offer) {
    //TODO: This can be way more efficient
    let offers = this.state.offers.filter(o => o.token !== offer.token);
    offers.push(offer);
    this.setState({ offers: offers, editedOffer: null });
  }

  deleteOffer(offerToken) {
    let offers = this.state.offers.filter(o => o.token !== offerToken);
    this.setState({ offers: offers });
  }

  render() {
    return (
      <div>
        <h3>Configuration generator</h3>
        {
          this.state.editedOffer === null &&
          <div>
            <Tabs activeKey={this.state.activeTabIndex} onSelect={this.handleTabSelect} id="mode-tabs">
              <Tab eventKey={1} title="Edit offers">{
                this.state.activeTabIndex === 1 &&
                <div>
                  <OfferList offers={this.state.offers}
                    onOfferClicked={(o) => this.beginEditingOffer(o)}
                    onDeleteOffer={(o) => this.deleteOffer(o)} />
                  <Button bsStyle="primary" onClick={() => this.newOffer()}>New Offer</Button>
                </div>
              }</Tab>
              <Tab eventKey={2} title="Export">{
                this.state.activeTabIndex === 2 &&
                <Export configurationJSON={this.getConfigurationJSON()} />
              }</Tab>
            </Tabs>
          </div>
        }
        {
          this.state.editedOffer !== null &&
          <OfferEditor offer={this.state.editedOffer}
            onSaveOffer={(o) => this.saveEditedOffer(o)}
            onCancel={this.endEditingOffer}
          />
        }

      </div>
    );
  }
}

ConfigGenerator.LocalStorageKey = "com.appgratis.unlock.config_generator";

export default ConfigGenerator;
