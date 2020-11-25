import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCardVideo, MDBCol, MDBContainer, MDBFormInline, MDBIcon, MDBInput, MDBRow } from 'mdbreact';
import { useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import '../styles/profileSetup.css'
import SkillSearchBar from './SkillSearchBar';
import ProjectForm from './ProjectForm';

export default function ProfileSetup() {
    const user = useSelector(state => state.user)

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
      <SkillSearchBar category='language'/>
      <Button variant="primary" type="submit">
        Add languages
      </Button>
      </form>

      <h1>Want to publish a project?</h1>
      <Button variant="primary" type="submit">
        Create a project
      </Button>
    </MDBCol>
    </MDBRow>
    </MDBContainer>
    </div>
    )
}
