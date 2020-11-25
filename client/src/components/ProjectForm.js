import React from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBCardVideo, MDBCol, MDBContainer, MDBFormInline, MDBIcon, MDBInput, MDBRow } from 'mdbreact';
import '../styles/profileSetup.css'

export default function ProjectForm() {
    return (
        <div id="top">
            <MDBContainer>
            <MDBCol md="4">
            <MDBRow>
    <form md="4">
    <label htmlFor="defaultFormLoginEmailEx" className="black-text mt-5" >
          Project Title
        </label>
    <MDBInput label="Project title" outline  />
    <label htmlFor="defaultFormLoginEmailEx" className="black-text">
          Describe your project
        </label>
    <MDBInput type="textarea" label="Brief description of your project" outline />

    <label htmlFor="defaultFormLoginEmailEx" className="black-text">
          What technical skills you are looking for?
        </label>
      <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text purple lighten-3" id="basic-text1">
            <MDBIcon className="text-white" icon="search" />
          </span>
        </div>
        <input className="form-control my-0 py-1" type="text" placeholder="Search for skills" aria-label="Search" />
      </div>

      <div className="form-group">
      <input
        type="text"
        className="form-control"
        id="formGroupExampleInput"
      />
    </div>

      <label htmlFor="defaultFormLoginEmailEx" className="black-text">
          What soft skills you are looking for?
        </label>
      <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text purple lighten-3" id="basic-text1">
            <MDBIcon className="text-white" icon="search" />
          </span>
        </div>
        <input className="form-control my-0 py-1" type="text" placeholder="Search for skills" aria-label="Search" />
      </div>

      <div className="form-group">
      <input
        type="text"
        className="form-control"
        id="formGroupExampleInput"
      />
    </div>

      <label htmlFor="defaultFormLoginEmailEx" className="black-text">
         Any language preference?
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

    <label htmlFor="defaultFormLoginEmailEx" className="black-text mt-5" >
          How many people will be acceptable for this project?
        </label>
    <MDBInput label="Enter number" outline  />
    

      </form>
      </MDBRow>
    </MDBCol>
            </MDBContainer>
        </div>
    )
}
