import React, { Component } from 'react';
import { Button, ButtonToolbar, Col } from 'react-bootstrap';

import './home.css'

class Home extends Component {
  render() {
    return (
      <center>
        <Col md={10} mdOffset={1}>
          <h1>AppGratis Unlock Library</h1>
          <p>.</p>
          <ButtonToolbar id="header-buttons">
            <Button bsStyle="primary" href="https://github.com/AppGratis/website/wiki/AppGratis-Unlock---Getting-Started">Get started</Button>
            <Button bsStyle="primary" href="https://github.com/AppGratis/unlock-ios">Github (iOS)</Button>
            <Button bsStyle="primary" href="https://github.com/AppGratis/unlock-android">Github (Android)</Button>
          </ButtonToolbar>
        </Col>
      </center>
    );
  }
}

export default Home;
