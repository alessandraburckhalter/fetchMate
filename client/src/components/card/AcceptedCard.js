
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBIcon } from 'mdbreact'
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
        <MDBCol md="3" lg="4">
        <MDBCard personal className="my-5">
          <MDBCardBody>
          <div className=''>
            <img src={interestedUser.profilePicture} alt="profilePicture" className="rounded-circle hoverable border border-info profile-setup"/>
            </div>
            <MDBCardTitle>
            <h4 className='card-title mt-4'> <MDBIcon icon="user indigo-text" />
              {interestedUser.firstName} {interestedUser.lastName}
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
              }).length> 0 ? (interestedUser.Skills.filter((userData)=>{
                return (userData.category === "technical")
              }).map((name)=>{
                return <span className="skills-dashboard">{name.name} </span> 
              })): "No Skill"}

            <br/>
            <h3 class="card-title">
            <MDBIcon icon="hand-holding-heart pink-text" /> Soft Skills</h3> 
            {Object.keys(interestedUser).length > 0 && interestedUser.Skills.filter((userData)=>{
                return (userData.category === "soft")
              }).length> 0 ? (interestedUser.Skills.filter((userData)=>{
                return (userData.category === "soft")
              }).map((name)=>{
                return <span className="skills-dashboard">{name.name} </span> 
              })): "No Skill"}   
       
            <br/>
            <h3 class="card-title">
            <MDBIcon icon="language purple-text" /> Spoken languages </h3>
            {Object.keys(interestedUser).length > 0 && interestedUser.Skills.filter((userData)=>{
                return (userData.category === "language")
              }).length> 0 ? (interestedUser.Skills.filter((userData)=>{
                return (userData.category === "language")
              }).map((name)=>{
                return <span className="skills-dashboard">{name.name} </span> 
              })): "No language"}
             <br/>
            
             <button className="card-link btn remove-member" onClick={pendingMember}>Remove Member from this project
             </button>
          </MDBCardBody>
        </MDBCard>
        
      
        
      </MDBCol>
    )
}