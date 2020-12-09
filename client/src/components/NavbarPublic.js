import { MDBCollapse, MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBNavItem
 } from 'mdbreact'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/navbar.css'
import logo from '../images/logo3.png';


export default function NavbarPublic() {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

    return (
        <>
       
      <MDBNavbar  dark expand="md" scrolling fixed="top" className="mb-5">
      <MDBContainer>
        <MDBNavbarBrand>
        <Link to="/"><img src={logo} alt="logo" className="d-inline-block align-top" height="50"></img></Link>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={handleToggle} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            
            <MDBNavItem active>
              <Link 
               to="/" >
                 <div className=" d-md-inline" onClick={handleToggle} >Home</div>
               </Link>
            </MDBNavItem>

            <MDBNavItem>
              <Link 
               to="/projects" ><div className=" d-md-inline" onClick={handleToggle} >Projects</div></Link>
            </MDBNavItem>
            
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav >
                <div className=" d-md-inline">About <MDBIcon icon="caret-down white-text" /></div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="/about">The Team</MDBDropdownItem>
                  <MDBDropdownItem href="/faq">FAQ</MDBDropdownItem>
                  <MDBDropdownItem href="/contact">Contact</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>

           
            <MDBNavItem >
              <Link 
               to="/register" ><div className=" d-md-inline" onClick={handleToggle} >Sign Up</div></Link>
            </MDBNavItem>
            
            
          </MDBNavbarNav>
        </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

        </>
    )
}
