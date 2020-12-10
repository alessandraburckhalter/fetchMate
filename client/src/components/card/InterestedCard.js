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
        })
        .then(result=>{
            Axios.post('/api/v1/email/declined',{email, projectTitle})
                    .then(res =>{
                        if(res.data.success){
                            alert("Email successfully sent")
                        }else{
                            alert("Email sending failed")
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
        })
        .then(result=>{
            Axios.post('/api/v1/email/matched',{email, owner, projectTitle, ownerName})
                    .then(res =>{
                        if(res.data.success){
                            alert("Email successfully sent")
                            props.displayAccepted()
                        }else{
                            alert("Email sending failed")
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
        
    }) 
        fetch(`/api/v1/projects/${id}`)
        .then(res =>res.json())
        .then(data =>{
            setProject(data)
    })
    
    }, [UserId, userIdForProjectOwner, id])
      
        

    return (
        
        <MDBCol md="6" lg="4">
            
            <MDBCard testimonal className="my-5 ">

          <MDBCardBody>
          <div className='d-flex justify-content-center'>
            <img src={interestedUser.profilePicture} alt="profilePicture" className="rounded-circle hoverable border border-info interested-image " />
            </div>
            <MDBCardTitle className='card-title-interested mt-4'>
                <MDBIcon icon="user indigo-text" /> 
                {interestedUser.firstName} {interestedUser.lastName}
            </MDBCardTitle>
            <hr />
            <h3 className="card-title">
            <MDBIcon icon="cogs grey-text" /> Technical Skills</h3> 
            {Object.keys(interestedUser).length > 0 && interestedUser.Skills.filter((userData)=>{
                return (userData.category === "technical")
              }).length> 0 ? (interestedUser.Skills.filter((userData)=>{
                return (userData.category === "technical")
              }).map((name, index)=>{
                return <span className="skills-dashboard" key={index}>{name.name} </span> 
              })): "No skills"}

            <br/><br/>
            <h3 className="card-title">
            <MDBIcon icon="hand-holding-heart pink-text" /> Soft Skills</h3> 
            {Object.keys(interestedUser).length > 0 && interestedUser.Skills.filter((userData)=>{
                return (userData.category === "soft")
              }).length> 0 ? (interestedUser.Skills.filter((userData)=>{
                return (userData.category === "soft")
              }).map((name, index)=>{
                return <span className="skills-dashboard" key={index}>{name.name} </span> 
              })): "No skills"}
       
            <br/><br/>
            <h3 className="card-title">
            <MDBIcon icon="language purple-text" /> Spoken languages </h3>
            {Object.keys(interestedUser).length > 0 && interestedUser.Skills.filter((userData)=>{
                return (userData.category === "language")
              }).length> 0 ? (interestedUser.Skills.filter((userData)=>{
                return (userData.category === "language")
              }).map((name, index)=>{
                return <span className="skills-dashboard" key={index}>{name.name} </span> 
              })): "No languages"}
             <br/><br/>

            <div className="buttons-div d-flex justify-content-center">
            <button className="card-link btn accept" onClick={acceptMember}>Accept
             </button> 
             <button className="card-link btn decline" onClick={declineMember}>Decline
             </button>
             </div>
          </MDBCardBody>
        </MDBCard>
        
      
        
      </MDBCol>
    )
}