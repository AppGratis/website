import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap'

class MainNavbar extends Component {
  render() {
    return (
      <Navbar staticTop inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#/home">AppGratis Opensource</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#/home">Projects</NavItem>
          <NavItem eventKey={2} href="#/generator">Unlock Configuration Generator</NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default MainNavbar;
