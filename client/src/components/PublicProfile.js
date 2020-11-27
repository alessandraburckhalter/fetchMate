import React from 'react'
import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import '../styles/publicProfile.css'

export default function PublicProfile() {
    return (
        <div>
            <MDBContainer>
                <MDBRow>
            <MDBCol md="6" lg="4">
        <MDBCard personal className="my-5">
          
          <MDBCardBody>
            <img src='#' alt="profilePicture" width="70%" />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>

      <MDBCol >
      <br/><br/><br/>
          <h1 >First name and last name</h1><br/>
          <h1>Headline</h1><br/>
          <h1>Soft Skills: </h1> <br/>
          <h1>Tech Skills: </h1><br/>
          <h1>Spoken languages: </h1>
     </MDBCol>



      </MDBRow>
      </MDBContainer>
        </div>
    )
}
