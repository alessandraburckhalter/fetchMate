import { MDBCollapse, MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBNavItem
 } from 'mdbreact'
import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import '../styles/navbar.css'
import logo from '../images/logo3.png';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions';


export default function NavbarPublic() {

  const dispatch = useDispatch();
  const history = useHistory();
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }


  const handleLogout = (e) => {
    e.preventDefault();
    fetch('/api/v1/user/logout',{
        method: 'POST',
        body: JSON.stringify({
            password:password,
            email: email
        }),
        headers: {
            Accept:"application/json",
            'Content-type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.error){
            alert(data.error)
        } else {
            alert('Logged Out Successfully!')
            dispatch(logout(data.user))
            let path = "/"
            history.push(path)
        }
    })
}
    return (
        <>
       
      <MDBNavbar  dark expand="md" scrolling fixed="top" className="mb-5">
      <MDBContainer>
        <MDBNavbarBrand>
          <img src={logo} alt="logo" className="d-inline-block align-top" height="50"></img>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={handleToggle} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            
            <MDBNavItem active>
              <NavLink className="d-none d-md-inline"
               to="/" >Home</NavLink
              >
            </MDBNavItem>
            <MDBNavItem>
              <NavLink className="d-none d-md-inline"
               to="/contact" >Contact</NavLink
              >
            </MDBNavItem>

            <MDBNavItem>
              <NavLink className="d-none d-md-inline"
               to="/projects" >Projects</NavLink
              >
            </MDBNavItem>
            
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">About</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="/about">The Team</MDBDropdownItem>
                  <MDBDropdownItem href="/faq">FAQ</MDBDropdownItem>
                  <MDBDropdownItem href="/contact">Contact</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

        </>
    )
}
