import React, { Component } from 'react';
import MainNavbar from './MainNavbar';
import { Col } from 'react-bootstrap';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <MainNavbar />
        <Col md={10} mdOffset={1}>
          {this.props.children}
        </Col>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node
};

export default App;
