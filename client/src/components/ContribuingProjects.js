import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdbreact'
import React from 'react'

export default function ContribuingProjects() {
    return (
        <div>
             <MDBContainer>
      <MDBRow>
      <MDBCol md="6" lg="4">
        <MDBCard personal className="my-5">
          
          <MDBCardBody>
            <img src="#"alt="profilePicture" width="70%" />
            
            <MDBCardTitle>
              <a href="#!" className="title-one">
              Owner: First name and last name
              </a> <br />
              <a href="#!" className="title-one">
              Headline
              </a>
            </MDBCardTitle>
            
            <hr />
            <a href="#!" className="title-one">
              Chat
              </a> <br />
            <a href="#!" className="card-meta">
              <span>
                Contact Info
              </span>
            </a>
            <br/>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    
      <MDBCol >
          <br/><br/>
          <h1 >Project Name</h1> <br/>
          <h1> Full project description</h1>
          
    
  </MDBCol>
    </MDBRow>
    </MDBContainer>
            
        </div>
    )
}
