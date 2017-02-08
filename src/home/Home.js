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
            <Button bsStyle="primary">Get started</Button>
            <Button bsStyle="primary">Github</Button>
          </ButtonToolbar>
        </Col>
      </center>
    );
  }
}

export default Home;
