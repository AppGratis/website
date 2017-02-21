import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import './Export.css'

class Export extends Component {
  constructor(props) {
    super(props);
    this.configurationJSON = props.configurationJSON;

    this.copyJSON = this.copyJSON.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.configurationJSON = nextProps.configurationJSON;
  }

  copyJSON() {
    try {
      document.getElementById("export-text").select();
      document.execCommand("copy");
    } catch (err) {
      console.error("Could not copy text", err);
    }
  }

  render() {
    return (
      <div>
        <h4>Generated configuration</h4>
        <span>This is the configuration JSON that you'll need to provide to the SDK in your app (by bundling it with the app, or redistributing it remotely via a cloud or self hosted service)</span>
        <div>
          <textarea className="form-control" id="export-text" cols="40" rows="5" value={this.configurationJSON} readOnly style={{marginBottom: '15px'}}/>
        </div>
        <Button onClick={() => this.copyJSON()} >Copy</Button>
      </div>
    );
  }
}

Export.propTypes = {
  configurationJSON: React.PropTypes.string.isRequired
}

export default Export;
