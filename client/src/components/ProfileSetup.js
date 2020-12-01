import React, { useEffect, useState } from 'react';
import {  MDBCard, MDBCardBody,  MDBCardTitle, MDBCol, MDBCollapse, MDBContainer,  MDBDropdown,  MDBDropdownItem,  MDBDropdownMenu,  MDBDropdownToggle,  MDBIcon,  MDBNav,  MDBNavbar,  MDBNavbarBrand,  MDBNavbarNav,  MDBNavbarToggler,  MDBNavItem,   MDBProgress,   MDBRow } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { Button, NavItem } from 'react-bootstrap';
import '../styles/profileSetup.css'
import { clearSearchSkillArray, logout } from '../redux/actions';
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
    const [headline, setHeadline] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const pickedSkillsArray = useSelector(state => state.searchSkillsToAdd)

    useEffect(() => {
      dispatch(clearSearchSkillArray())
    }, [])

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
            }else{
                alert('Logged Out Successfully!')
                dispatch(logout(data.user))
                let path = "/"
                history.push(path)
            }
        })
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      setHeadline('');
      const userSkillsArray = pickedSkillsArray.map(skill => skill.id)
      Axios.post('/api/v1/hub/userSkill', {
        userSkillsArray
      })
        .then(res => {
          console.log(res)
        })
        .catch(e => {
          console.log(e)
        })
      Axios.patch('/api/v1/hub', {
        title: headline
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
{/*    
  <div id="header">
    <div className="header container">
      <div className="nav-bar">
        <div className="brand">
          <img src="#" alt="logo" />
        </div>
        <div className="nav-list">
          <div className="hamburger">
            <div className="bar">
        </div>
            </div>
          <ul>
            <li><a href="#top" data-after="Home">Home</a></li>
            <li><a href="#about" data-after="About">About</a></li>
            <li><a href="#projects" data-after="Projects">Projects</a></li>
            <li><a href="#skills" data-after="Skills">Skills</a></li>
            <li><a href="#contact" data-after="Contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div> */}
  
  
  <Navbar />
         

    <div id="top">
    <MDBContainer>
      <MDBRow>
      {/* <MDBCol md="6" lg="4">
        <MDBCard personal className="my-5">
          
          <MDBCardBody>
            <img src={user.loginInfo.profilePicture} alt="profilePicture" width="70%" />
            <MDBCardTitle>
              <a href="#!" className="title-one">
              {user.loginInfo.firstName} {user.loginInfo.lastName} 
              </a> <br/>

        

              <a href="#!" className="title-one">
              {user.loginInfo.title}
              </a>
            </MDBCardTitle>
            
            <hr />
            <a href="#!" className="card-meta">
              <span>
                <MDBIcon icon="envelope" /> 
                {user.loginInfo.email}
              </span>
            </a>
          </MDBCardBody>
        </MDBCard>
      </MDBCol> */}

      {/* <div className="box-item meu-perfil">
          <div className="box-item-header">
          <span class="header-title">P R O F I L E</span>
          </div>
        <div className="box-item-content">
          <div className="user-box">
            <img src={user.loginInfo.profilePicture} alt="" className="img-fluid rounded-circle hoverable"/>
            <div className="user-box-info">
              <p>{user.loginInfo.firstName} {user.loginInfo.lastName}</p>
              <p><MDBIcon icon="star amber-text" /><MDBIcon icon="star amber-text" /><MDBIcon icon="star amber-text" /><MDBIcon icon="star amber-text" /><MDBIcon icon="star amber-text" /></p>
            </div>
          </div>
          <div className="todo-box">
          <p class="center">Filled profile (20%)</p>
          <div className="loading-bar-outer">
            <div className="loading-bar-inner">

            </div>

          </div>
          </div>
        </div>

      </div> */}

     
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
            
          <p class="filled-profile">Filled profile (20%)</p>
         
            <div >
            <MDBProgress value={20} className="my-2" />
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
   
    
      <MDBCol md="7" className="mt-5 container-form">
    <MDBCard className="card-complete-profile" testimonial>
          <div className="form-title">
          COMPLETE YOUR PROFILE <MDBIcon icon="edit indigo-text" />
          </div>
        <div >
          <form onSubmit={(e) => {handleSubmit(e)}}>
            <label htmlFor="defaultFormCardNameEx" className="labe-headline"><MDBIcon icon="share indigo-text" />  Headline
           </label>
            <input type="text" id="defaultFormCardNameEx" className="form-control" value={headline} onChange={(e) => {setHeadline(e.target.value)}}/>
            <br />
            
            <h1 className=" label-skillbar"><MDBIcon icon="share indigo-text" /> Technical Skills</h1>
            <SkillSearchBar category='technical'/>
            <br />
            
            <h1 className=" label-skillbar"><MDBIcon icon="share indigo-text" /> Soft Skills</h1>
            <SkillSearchBar category='soft'/>
            <br />
            
            <h1 className=" label-skillbar"> <MDBIcon icon="share indigo-text" /> Spoken Languages</h1>
            <SkillSearchBar category='language'/><br/>

            <Button variant="success" type="submit" className="btn btn-lg btn-block mb-5">
            SUBMIT <MDBIcon far icon="paper-plane" />
          </Button>
          </form>
        </div>

        </MDBCard>
      </MDBCol>

    {/* <MDBCol md="4"> */}
   

        {/* <h1>Want to publish a project?</h1>
        <Button variant="primary" type="submit">
                    Create a project
                </Button> */}
   
        {/* <button onClick={handleLogout}>Logout</button> */}
     
    {/* </MDBCol> */}

    </MDBRow>
    </MDBContainer>
    </div>

    <Footer />
    </>
    )
}
