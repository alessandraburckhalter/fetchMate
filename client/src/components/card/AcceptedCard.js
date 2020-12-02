
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol } from 'mdbreact'
import React, { useEffect, useState } from 'react'

export default function AcceptedCard(props) {
    const { UserId, ProjectId } = props.acceptedMember
    const [interestedUser, setInterestedUser] = useState("")
    const [project, setProject] = useState("")
    
    // for email
    const id = props.project.ProjectId 
    

    

    //decline onclick button
    const pendingMember = () =>{
        fetch(`/api/v1/projects/${ProjectId}/teamMember`,{
            method:"PATCH",
            body:JSON.stringify({
                memberId:UserId,
                approvedStatus: "pending"
            }),
            headers: {
                'Content-type': 'application/json'
                }
        })
        .then(res=>res.json())
        .then(data=>{
            props.displayAccepted()
            props.displayInterest()
            // console.log(data)
        })
        
            }

    // accept button onclick
    
        
            
            
    useEffect(()=>{
        fetch(`/api/v1/hub/user/${UserId}`)
        .then(res => res.json())
        .then(data => {
          setInterestedUser(data)
          
    })  
        
        fetch(`/api/v1/projects/${id}`)
        .then(res =>res.json())
        .then(data =>{
            setProject(data)
        // console.log(project)
    
})
      
      
    }, [UserId])
      
        

    return (
        <MDBCol md="6" lg="4">
      <MDBCard personal className="my-5">
          {console.log(project)}
          <MDBCardBody>
            <img src={interestedUser.profilePicture} alt="profilePicture" />
            <MDBCardTitle>
              <a href="#!" className="title-one">
              {interestedUser.firstName} {interestedUser.lastName}
              </a>
            </MDBCardTitle>
            {/* <input
                            icon="lock"
                            type="hidden"
                            id="email"
                            value={interestedUser.email}
                           
                        /> */}
            <hr />
            <a href="#!" className="card-meta">
                Skills:{Object.keys(interestedUser).length > 0 && interestedUser.Skills.filter((userData)=>{
          return (userData.category === "technical")
          
        }).map((name)=>{
          return name.name + " " 
        })}
       
            </a><br/>
            <a href="#!" className="card-meta">
                Spoken languages: {Object.keys(interestedUser).length > 0 && interestedUser.Skills.filter((userData)=>{
          return (userData.category === "language")
          
        }).map((name)=>{
          return name.name + " " 
        })}
            </a> <br/>
            
             <button className="card-link" onClick={pendingMember}>Remove(pending)
             </button>
          </MDBCardBody>
        </MDBCard>
        
      
        
      </MDBCol>
    )
}