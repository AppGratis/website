import React, { Component } from 'react';
import { Jumbotron, Button, Col } from 'react-bootstrap';

class NotFoundError extends Component {
  render() {
    return (
      <Col md={12}>
        <Jumbotron>
          <h1>404 Not Found</h1>
          <p>The page you're trying to read could not be found.</p>
          <p><Button bsStyle="primary">Get me back home</Button></p>
        </Jumbotron>
      </Col>
    );
  }
}

export default NotFoundError;
