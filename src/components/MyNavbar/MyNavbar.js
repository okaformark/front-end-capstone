import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';
import './MyNavbar.scss';
// import image from './image';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  }

  state = {
    isOpen: false,
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  };

  render() {
    const { authed } = this.props;
    const buildNavbar = () => {
      if (authed) {
        return (
          <Nav className="ml-auto animated zoomInDown" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to='/home'>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/donate'>Donate</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/my-donations'>My Donations</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.logMeOut}>Log Out</NavLink>
            </NavItem>
          </Nav>
        );
      }
      return <Nav className="ml-auto" navbar></Nav>;
    };

    return (
      <div className="MyNavbar">
        <Navbar color="dark" dark expand="md" >
          <NavbarBrand className="title" href="/">FoodsGiving <img src="./image/istockphoto_822365658_612x612_dCa_1.ico" alt=""/></NavbarBrand>
          <NavbarToggler onClick={this.toggle.bind(this)} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {buildNavbar()}
            </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default MyNavbar;
