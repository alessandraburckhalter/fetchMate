import Axios from 'axios'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBIcon } from 'mdbreact'
import React, { useEffect, useState } from 'react'

export default function InterestedCard(props) {
    const { UserId, ProjectId } = props.interestedUser
    const [interestedUser, setInterestedUser] = useState("")
    const [project, setProject] = useState("")
    
    // for email
    const id = props.project.ProjectId 
    
    const userIdForProjectOwner = props.project.UserId
    const [ownerProject, setOwnerProject] = useState("")
    const email = interestedUser.email
    const owner = ownerProject.email
    const projectTitle = project.title
    const ownerName = ownerProject.firstName + " " + ownerProject.lastName
    console.log(props.project)
    

    //decline onclick button
    const declineMember = () =>{
        fetch(`/api/v1/projects/${ProjectId}/teamMember`,{
            method:"PATCH",
            body:JSON.stringify({
                memberId:UserId,
                approvedStatus: "declined"
            }),
            headers: {
                'Content-type': 'application/json'
                }
        })
        .then(res=>res.json())
        .then(data=>{
            props.displayInterest()
            // console.log(data)
        })
        .then(result=>{
            Axios.post('/api/v1/email/declined',{email, projectTitle})
                    .then(res =>{
                        if(res.data.success){
                            alert("success sending Email")
                        }else{
                            alert("Fail sending Email")
                        }
                    })
                    .catch(err =>{
                        console.log("something wrong")
                    })
                })
            }

    // accept button onclick
    const acceptMember = () =>{
        fetch(`/api/v1/projects/${ProjectId}/teamMember`,{
            method:"PATCH",
            body:JSON.stringify({
                memberId:UserId,
                approvedStatus: "approved"
            }),
            headers: {
                'Content-type': 'application/json'
                }
        })
        .then(res=>res.json())
        .then(data=>{
            props.displayInterest()
            // console.log(data)
        })
        .then(result=>{
            Axios.post('/api/v1/email/matched',{email, owner, projectTitle, ownerName})
                    .then(res =>{
                        if(res.data.success){
                            alert("success sending Email")
                            props.displayAccepted()
                        }else{
                            alert("Fail sending Email")
                        }
                    })
                    .catch(err =>{
                        console.log("something wrong")
                    })
                })
            }
        
            
            
    useEffect(()=>{
        fetch(`/api/v1/hub/user/${UserId}`)
        .then(res => res.json())
        .then(data => {
          setInterestedUser(data)
          
    })  
        fetch(`/api/v1/hub/user/${userIdForProjectOwner}`)
        .then(res => res.json())
        .then(data => {
            setOwnerProject(data)
            // console.log(ownerProject)
        
    }) 
        fetch(`/api/v1/projects/${id}`)
        .then(res =>res.json())
        .then(data =>{
            setProject(data)
    })
    
        
    
      
      
    }, [UserId, userIdForProjectOwner])
      
        

    return (
        
        <MDBCol md="3" lg="4">
            
      <MDBCard personal className="my-5 ">

          <MDBCardBody>
          <div className=''>
            <img src={interestedUser.profilePicture} alt="profilePicture" className="rounded-circle hoverable border border-info profile-setup" />
            </div>
            <MDBCardTitle>
            <h4 className='card-title-interested mt-4'> <MDBIcon icon="user indigo-text" /> {interestedUser.firstName} {interestedUser.lastName}
              </h4>
            </MDBCardTitle>
            {/* <input
                            icon="lock"
                            type="hidden"
                            id="email"
                            value={interestedUser.email}
                           
                        /> */}
            <hr />
            <h3 class="card-title">
            <MDBIcon icon="cogs grey-text" /> Technical Skills</h3> 
            {Object.keys(interestedUser).length > 0 && interestedUser.Skills.filter((userData)=>{
          return (userData.category === "technical")
          
        }).map((name)=>{
          return <span className="skills-dashboard">{name.name} </span> 
        })}

            <br/>
            <h3 class="card-title">
            <MDBIcon icon="hand-holding-heart pink-text" /> Soft Skills</h3> 
            {Object.keys(interestedUser).length > 0 && interestedUser.Skills.filter((userData)=>{
          return (userData.category === "soft")
          
        }).map((name)=>{
          return <span className="skills-dashboard">{name.name} </span> 
        })}     
       
            <br/>
            <h3 class="card-title">
            <MDBIcon icon="language purple-text" /> Spoken languages </h3>
            {Object.keys(interestedUser).length > 0 && interestedUser.Skills.filter((userData)=>{
          return (userData.category === "language")
          
        }).map((name)=>{
          return <span className="skills-dashboard">{name.name} </span> 
        })}
             <br/>
            <button className="card-link btn accept" onClick={acceptMember}>Accept
             </button> 
             <button className="card-link btn decline" onClick={declineMember}>Decline
             </button>
          </MDBCardBody>
        </MDBCard>
        
      
        
      </MDBCol>
    )
}