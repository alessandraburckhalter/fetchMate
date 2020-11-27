import React, { useState } from 'react';
import {  MDBCard, MDBCardBody,  MDBCardTitle, MDBCol, MDBContainer,  MDBIcon,  MDBRow } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import '../styles/profileSetup.css'
import { logout } from '../redux/actions';
import { useHistory } from 'react-router-dom';
import SkillSearchBar from './SkillSearchBar';
import Axios from 'axios';


export default function ProfileSetup() {
    const user = useSelector(state => state.user)
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const dispatch = useDispatch();
    const history = useHistory();
    const pickedSkillsArray = useSelector(state => state.searchSkillsToAdd)

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
        <div id="top">

    <MDBContainer>
      <MDBRow>
      <MDBCol md="6" lg="4">
        <MDBCard personal className="my-5">
          
          <MDBCardBody>
            <img src={user.loginInfo.profilePicture} alt="profilePicture" width="70%" />
            <MDBCardTitle>
              <a href="#!" className="title-one">
              {user.loginInfo.firstName} {user.loginInfo.lastName}
              </a> <br/>

              <a href="#!" className="title-one">
              Title
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
      </MDBCol>
    

    <MDBCol md="4">
    <form>
    <p className="h5 text-center mb-4 mt-5">Your Profile</p>
    <label htmlFor="defaultFormLoginEmailEx" className="black-text">
            Technical Skills
    </label>
      <SkillSearchBar category='technical'/>
   
    <Button variant="primary" type="submit">
        Add Skills
    </Button>
    </form>

      <form>
        <label htmlFor="defaultFormLoginEmailEx" className="black-text">
          Soft Skills
        </label>
        <SkillSearchBar category='soft'/>
        <Button variant="primary" type="submit">
          Add Skills
        </Button>
      </form>

      <form>
      <label htmlFor="defaultFormLoginEmailEx" className="black-text">
          What languages do you speak?
        </label>
      <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text purple lighten-3" id="basic-text1">
            <MDBIcon className="text-white" icon="search" />
          </span>
        </div>
        <input className="form-control my-0 py-1" type="text" placeholder="Search for spoken languages" aria-label="Search" />
      </div>
      <div className="form-group">
      <input
        type="text"
        className="form-control"
        id="formGroupExampleInput"
      />
    </div>
        <Button variant="primary" type="submit">
                    Add languages
                </Button>
        </form>

        <h1>Want to publish a project?</h1>
        <Button variant="primary" type="submit">
                    Create a project
                </Button>
   
        <button onClick={handleLogout}>Logout</button>
     
    </MDBCol>

    </MDBRow>
    </MDBContainer>
    </div>
    )
}
