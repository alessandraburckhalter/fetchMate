import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdbreact'
import React from 'react'

export default function Interested() {
    return (
        <div id="top">

        <MDBContainer>
          <MDBRow>
          
        
          <MDBCol >
              <h1 >Project Title</h1>
          <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
        <MDBCardText>
          Full Project description
        </MDBCardText>
        <div className="flex-row ">
        <a href="#!" className="card-link">
            Status: status
          </a>
          <a href="#!" className="card-link">Published: date
          </a>
          
        </div>
      </MDBCard>
     
    
      <h1>Interested People</h1>
      <MDBCol md="6" lg="4">
        <MDBCard personal className="my-5">
          
          <MDBCardBody>
            <img src="#" alt="profilePicture" />
            <MDBCardTitle>
              <a href="#!" className="title-one">
              Full Name
              </a>
            </MDBCardTitle>
            
            <hr />
            <a href="#!" className="card-meta">
                Skills: display skills
            </a><br/>
            <a href="#!" className="card-meta">
                Spoken languages: display languages
            </a> <br/>
            <button className="card-link">Accept
             </button> <button className="card-link">Decline
             </button>
          </MDBCardBody>
        </MDBCard>
      
        <MDBCard personal className="my-5">
          
          <MDBCardBody>
            <img src="#" alt="profilePicture" />
            <MDBCardTitle>
              <a href="#!" className="title-one">
              Full Name
              </a>
            </MDBCardTitle>
            
            <hr />
            <a href="#!" className="card-meta">
                Skills: display skills
            </a><br/>
            <a href="#!" className="card-meta">
                Spoken languages: display languages
            </a>
            <br/>
            <button className="card-link">Accept
             </button> <button className="card-link">Decline
             </button>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
     
      
      </MDBCol>
        </MDBRow>
        </MDBContainer>
            </div>
    )
}
