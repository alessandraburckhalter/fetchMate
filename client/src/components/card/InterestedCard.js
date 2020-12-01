import Axios from 'axios'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol } from 'mdbreact'
import React, { useEffect, useState } from 'react'

export default function InterestedCard(props) {
    const { UserId, ProjectId } = props.interestedUser
    const [interestedUser, setInterestedUser] = useState("")
    const [project, setProject] = useState("")
    
    // for email
    const id = props.project.ProjectId 
    console.log(props.project)
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
        // console.log(project)
    
})
      
      
    }, [UserId, userIdForProjectOwner])
      
        

    return (
        <MDBCol md="6" lg="4">
      <MDBCard personal className="my-5">
          
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
            <button className="card-link" onClick={acceptMember}>Accept
             </button> 
             <button className="card-link" onClick={declineMember}>Decline
             </button>
          </MDBCardBody>
        </MDBCard>
        
      
        
      </MDBCol>
    )
}
