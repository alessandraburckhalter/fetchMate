import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol } from 'mdbreact'
import React, { useEffect, useState } from 'react'

export default function InterestedCard(props) {
    const { UserId } = props.interestedUser
    const [interestedUser, setInterestedUser] = useState("")
    

    useEffect(()=>{
      
        
          fetch(`/api/v1/hub/user/${UserId}`)
          .then(res => res.json())
          .then(data => {
            setInterestedUser(data)
            console.log(data)
      })  
        
        
      }, [UserId])

    return (
        <MDBCol md="6" lg="4">
      <MDBCard personal className="my-5">
          
          <MDBCardBody>
            <img src="#" alt="profilePicture" />
            <MDBCardTitle>
              <a href="#!" className="title-one">
              {interestedUser.firstName} {interestedUser.lastName}
              </a>
            </MDBCardTitle>
            
            <hr />
            <a href="#!" className="card-meta">
                Skills:{Object.keys(interestedUser).length > 0 && interestedUser.Skills.filter((userData)=>{
          return (userData.category === "technical")
          
        }).map((name)=>{
          return name.name + " " 
        })}
        {console.log(interestedUser.Skills)}
            </a><br/>
            <a href="#!" className="card-meta">
                Spoken languages: {Object.keys(interestedUser).length > 0 && interestedUser.Skills.filter((userData)=>{
          return (userData.category === "language")
          
        }).map((name)=>{
          return name.name + " " 
        })}
            </a> <br/>
            <button className="card-link">Accept
             </button> <button className="card-link">Decline
             </button>
          </MDBCardBody>
        </MDBCard>
        
      
        
      </MDBCol>
    )
}
