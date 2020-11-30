import { MDBCollapse, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBNavItem } from 'mdbreact'
import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom';
import logo from '../images/logo3.png';

export default function Navbar() {
    return (
        <>
           <BrowserRouter>
  <MDBNavbar  dark expand="md">
        <MDBNavbarBrand>
        <img src={logo} alt="logo" width="60%"/>
        </MDBNavbarBrand>
        <MDBNavbarToggler />
        <MDBCollapse id="navbarCollapse3"  navbar className="d-flex justify-content-around">
          <MDBNavbarNav left>
            <MDBNavItem active>
              <Link to="#!">Home</Link>
            </MDBNavItem>
            <MDBNavItem>
              <Link to="/hub">Profile Setup</Link>
            </MDBNavItem>
            <MDBNavItem>
              <Link to="/projectForm">Project Form</Link>
            </MDBNavItem>
            <MDBNavItem>
              <Link to="/dashboard">Dashboard</Link>
            </MDBNavItem>
            <MDBNavItem>
              <Link to="#!"  >Logout</Link>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">Dropdown</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <Link className="waves-effect waves-light" to="#!">
                <MDBIcon fab icon="twitter" />
              </Link>
            </MDBNavItem>
            <MDBNavItem>
              <Link className="waves-effect waves-light" to="#!">
                <MDBIcon fab icon="google-plus-g" />
              </Link>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>

  </BrowserRouter>
          
        </>
    )
}
