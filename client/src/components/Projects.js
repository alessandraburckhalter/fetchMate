import { MDBCard, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import React from 'react'
import '../styles/projects.css'

export default function Projects() {
    return (
        <div id="top">

    <MDBContainer>
      <MDBRow>
      
      <MDBCol >
          <h1 >Projects</h1>
      <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
    <MDBCardTitle>Project title</MDBCardTitle>
    <MDBCardText>
      Project description
    </MDBCardText>
    <MDBCardText>
      Skills wanted: displays skills here
    </MDBCardText>
    <MDBCardText>
      Acceptable spoken languages: displays languages here
    </MDBCardText>
    <div className="flex-row ">
    <a href="#!" className="card-link">
        Status: status
      </a>
      <a href="#!" className="card-link">Published: date
      </a>
      <a href="#!" className="card-link">Project Owner: owner's name
      </a>
      <div>
      <button className="participate-button">
        I want to be part of this project
      </button>
      </div>
    </div>
  </MDBCard>

  <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
    <MDBCardTitle>Project title</MDBCardTitle>
    <MDBCardText>
      Project description
    </MDBCardText>
    <MDBCardText>
      Skills wanted: displays skills here
    </MDBCardText>
    <MDBCardText>
      Acceptable spoken languages: displays languages here
    </MDBCardText>
    <div className="flex-row ">
    <a href="#!" className="card-link">
        Status: status
      </a>
      <a href="#!" className="card-link">Published: date
      </a>
      <a href="#!" className="card-link">Project Owner: owner's name
      </a>
      <div>
      <button className="participate-button">
        I want to be part of this project
      </button>
      </div>
    </div>
  </MDBCard>

  <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
    <MDBCardTitle>Project title</MDBCardTitle>
    <MDBCardText>
      Project description
    </MDBCardText>
    <MDBCardText>
      Skills wanted: displays skills here
    </MDBCardText>
    <MDBCardText>
      Acceptable spoken languages: displays languages here
    </MDBCardText>
    <div className="flex-row ">
    <a href="#!" className="card-link">
        Status: status
      </a>
      <a href="#!" className="card-link">Published: date
      </a>
      <a href="#!" className="card-link">Project Owner: owner's name
      </a>
      <div>
      <button className="participate-button">
        I want to be part of this project
      </button>
      </div>
    </div>
  </MDBCard>

  <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
    <MDBCardTitle>Project title</MDBCardTitle>
    <MDBCardText>
      Project description
    </MDBCardText>
    <MDBCardText>
      Skills wanted: displays skills here
    </MDBCardText>
    <MDBCardText>
      Acceptable spoken languages: displays languages here
    </MDBCardText>
    <div className="flex-row ">
    <a href="#!" className="card-link">
        Status: status
      </a>
      <a href="#!" className="card-link">Published: date
      </a>
      <a href="#!" className="card-link">Project Owner: owner's name
      </a>
      <div>
      <button className="participate-button">
        I want to be part of this project
      </button>
      </div>
    </div>
  </MDBCard>
 
  </MDBCol>
    </MDBRow>
    </MDBContainer>
    </div>
    )
}
