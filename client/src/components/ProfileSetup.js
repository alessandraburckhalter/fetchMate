import React, { useState } from 'react';
import {  MDBCard, MDBCardBody,  MDBCardTitle, MDBCol, MDBCollapse, MDBContainer,  MDBDropdown,  MDBDropdownItem,  MDBDropdownMenu,  MDBDropdownToggle,  MDBIcon,  MDBNav,  MDBNavbar,  MDBNavbarBrand,  MDBNavbarNav,  MDBNavbarToggler,  MDBNavItem,   MDBProgress,   MDBRow } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { Button, NavItem } from 'react-bootstrap';
import '../styles/profileSetup.css'
import { logout } from '../redux/actions';
import { BrowserRouter, Link, NavLink, useHistory } from 'react-router-dom';
import SkillSearchBar from './SkillSearchBar';
import Axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import logo from '../images/logo3.png';
import Footer from './Footer'
import Navbar from '../components/Navbar'



export default function ProfileSetup() {
    const user = useSelector(state => state.user)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const dispatch = useDispatch();
    const history = useHistory();
    const pickedSkillsArray = useSelector(state => state.searchSkillsToAdd)

    

    const handleSubmitSkills = () => {
      const userSkillsArray = pickedSkillsArray.map(skills => skills.id)
      Axios.post('/api/v1/hub/userSkill', {
        userSkillsArray
      })
        .then(res => {
          console.log(res)
        })
        .catch(e => {
          console.log(e)
        })
    }
    

    return (
      <>
  
  <Navbar />
         

    <div id="top">
    <MDBContainer>
      <MDBRow>
      <MDBCol md='3' className="mt-5">
        <MDBCard testimonial className="card-profile" >
          <div gradient='aqua' backgroundColor="red"/>
          <div className='mx-auto white'>
            <img
              src={user.loginInfo.profilePicture} 
              alt='' className="img-fluid rounded-circle hoverable border border-info" width="100%" 
            />
          </div>
          <MDBCardBody>
          <h4 className='card-title'> <MDBIcon icon="user indigo-text" /> {user.loginInfo.firstName} {user.loginInfo.lastName} </h4>
          <h4 className='card-title'> <MDBIcon icon="envelope orange-text" /> {user.loginInfo.email} </h4>
            <hr />
            
          {/* <p class="filled-profile">Filled profile (20%)</p> */}
         
            {/* <div >
            <MDBProgress value={20} className="my-2" />
            </div> */}
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
   
    
      <MDBCol md="7" className=" container-form">
    <MDBCard className="card-complete-profile" testimonial>
          <div className="form-title">
          COMPLETE YOUR PROFILE <MDBIcon icon="edit indigo-text" />
          </div>
        <div >
          <form>
            <label htmlFor="defaultFormCardNameEx" className="labe-headline"><MDBIcon icon="share indigo-text" />  Headline
           </label>
            <input type="text" id="defaultFormCardNameEx" className="form-control" />
            <br />
            
            <h1 className=" label-skillbar"><MDBIcon icon="share indigo-text" /> Technical Skills</h1>
            <SkillSearchBar category='technical'/>
            <br />
            
            <h1 className=" label-skillbar"><MDBIcon icon="share indigo-text" /> Soft Skills</h1>
            <SkillSearchBar category='soft'/>
            <br />
            
            <h1 className=" label-skillbar"> <MDBIcon icon="share indigo-text" /> Spoken Languages</h1>
            <SkillSearchBar category='languages'/><br/>

            <Button variant="success" type="submit" className="btn btn-lg btn-block mb-5">
            SUBMIT <MDBIcon far icon="paper-plane" />
          </Button>
          </form>
        </div>

        </MDBCard>
      </MDBCol>

    </MDBRow>
    </MDBContainer>
    </div>

    <Footer />
    </>
    )
}
