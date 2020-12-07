import { MDBCollapse, MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBNavItem
 } from 'mdbreact'
import React, { useState } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom';
import '../styles/navbar.css'
import logo from '../images/logo3.png';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions';


export default function Navbar() {

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
              <Link 
               to="/" >
                 <div className=" d-md-inline" onClick={handleToggle} >Home</div>
                 </Link>
            </MDBNavItem>
            <MDBNavItem>
              <Link 
               to="/dashboard">
                 <div className=" d-md-inline" onClick={handleToggle} >Dashboard</div>
               </Link>
            </MDBNavItem>
            
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav  >
                  
                  <div className=" d-md-inline">Projects <MDBIcon icon="caret-down white-text" /></div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="/projectForm">Publish a project</MDBDropdownItem>
                  <MDBDropdownItem href="/projects">See all projects</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
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
          </MDBNavbarNav>

          <MDBNavbarNav right className="" >
            <MDBNavItem >
              <MDBDropdown >
                <MDBDropdownToggle nav >
                  <MDBIcon icon="user" /> <MDBIcon icon="caret-down white-text" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown ">
                <MDBDropdownItem href="/hub">Edit profile</MDBDropdownItem>
                  <MDBDropdownItem href="/faq">Get help</MDBDropdownItem>
                  <MDBDropdownItem onClick={handleLogout} href="#!">Logout</MDBDropdownItem>
                  
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
