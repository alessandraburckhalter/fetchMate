import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdbreact';
import React from 'react';
import '../styles/dashboard.css'

export default function Dashboard() {
    return (
        <div id="top">

    <MDBContainer>
      <MDBRow>
      <MDBCol md="6" lg="4">
        <MDBCard personal className="my-5">
          
          <MDBCardBody>
            <img src="#" alt="profilePicture" />
            <MDBCardTitle>
              <a href="#!" className="title-one">
              {/* {user.firstName} {user.lastName} */}
              </a>
            </MDBCardTitle>
            
            <hr />
            <a href="#!" className="card-meta">
              <span>
                <MDBIcon icon="envelope" /> 
                {/* {user.email} */}
              </span>
            </a>
            <br/>
            <a href="#!" className="card-meta">
              Skills: display skills
            </a>
            <br/>
            <a href="#!" className="card-meta">
              Spoken languages: display languages
            </a>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    
      <MDBCol >
          <h1 >Your Projects</h1>
      <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
    <MDBCardTitle>Project title</MDBCardTitle>
    <MDBCardText>
      Project description
    </MDBCardText>
    <div className="flex-row ">
    <a href="#!" className="card-link">
        Status: status
      </a>
      <a href="#!" className="card-link">Published: date
      </a>
      <a href="#!" className="card-link">Member's limit: number
      </a>
      <a href="#!" className="card-link">Interested: number
      </a>
      <a href="#!" className="card-link">Accepted: number
      </a>
      <button className="card-link">Edit
      </button>
      <button className="card-link">Delete
      </button>
    </div>
  </MDBCard>
 
  <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
    <MDBCardTitle>Project title</MDBCardTitle>
    <MDBCardText>
      Project description
    </MDBCardText>
    <div className="flex-row ">
    <a href="#!" className="card-link">
        Status: status
      </a>
      <a href="#!" className="card-link">Published: date
      </a>
      <a href="#!" className="card-link">Member's limit: number
      </a>
      <a href="#!" className="card-link">Interested: number
      </a>
      <a href="#!" className="card-link">Accepted: number
      </a>
      <button className="card-link">Edit
      </button>
      <button className="card-link">Delete
      </button>
    </div>
  </MDBCard>

  <h1>Contribuiting Projects</h1>
      <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
    <MDBCardTitle>Project title</MDBCardTitle>
    <MDBCardText>
      Project description
    </MDBCardText>
    <div className="flex-row ">
    <a href="#!" className="card-link">
        Project owner: owner name
      </a>
      <a href="#!" className="card-link">Chat
      </a>  
    </div>
  </MDBCard>
 
  <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
    <MDBCardTitle>Project title</MDBCardTitle>
    <MDBCardText>
      Project description
    </MDBCardText>
    <div className="flex-row ">
    <a href="#!" className="card-link">
        Project owner: owner name
      </a>
      <a href="#!" className="card-link">Chat
      </a>
    </div>
  </MDBCard>
  </MDBCol>
    </MDBRow>
    </MDBContainer>
        </div>
    )
}
