import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCardVideo, MDBCol, MDBContainer, MDBFormInline, MDBIcon, MDBInput, MDBRow } from 'mdbreact';
import React from 'react';
import { Form } from 'react-bootstrap';
import '../styles/profileSetup.css'
import ProjectForm from './ProjectForm';

export default function ProfileSetup() {
    return (
        <div id="top">

        <MDBContainer>
            <MDBRow>
      <MDBCol md="6" lg="4">
        <MDBCard personal className="my-5">
          
          <MDBCardBody>
            <img src="../images/computer.jpeg" alt="Logo" />
            <MDBCardTitle>
              <a href="#!" className="title-one">
                Full Name
              </a>
            </MDBCardTitle>
            
            <hr />
            <a href="#!" className="card-meta">
              <span>
                <MDBIcon icon="envelope" /> 
                 email
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
      <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text purple lighten-3" id="basic-text1">
            <MDBIcon className="text-white" icon="search" />
          </span>
        </div>
        <input className="form-control my-0 py-1" type="text" placeholder="Search for technical skills" aria-label="Search" />
      </div>

      <div className="form-group">
      <input
        type="text"
        className="form-control"
        id="formGroupExampleInput"
      />
    </div>

      <label htmlFor="defaultFormLoginEmailEx" className="black-text">
          Soft Skills
        </label>
      <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text purple lighten-3" id="basic-text1">
            <MDBIcon className="text-white" icon="search" />
          </span>
        </div>
        <input className="form-control my-0 py-1" type="text" placeholder="Search for soft skills" aria-label="Search" />
      </div>

      <div className="form-group">
      <input
        type="text"
        className="form-control"
        id="formGroupExampleInput"
      />
    </div>

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

      <label htmlFor="defaultFormLoginEmailEx" className="black-text">
          Would you like to publish a project?
        </label>
        <div>
        <div class="custom-control custom-checkbox">
        <input type="checkbox" />
        <label class="" for="defaultUnchecked"> Yes</label>
      </div>

      <div class="custom-control custom-checkbox">
        <input type="checkbox" />
        <label class="" for="defaultUnchecked"> No</label>
      </div>
      </div>
   

      </form>
    </MDBCol>


    </MDBRow>
    </MDBContainer>
   
  
     
   

        </div>
    )
}