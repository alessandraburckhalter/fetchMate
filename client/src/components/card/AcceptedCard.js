
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBIcon } from 'mdbreact'
import React, { useEffect, useState } from 'react'

export default function AcceptedCard(props) {
    const { UserId, ProjectId } = props.acceptedMember
    const [interestedUser, setInterestedUser] = useState("")
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
        }) 
    }

    useEffect(()=>{
        fetch(`/api/v1/hub/user/${UserId}`)
        .then(res => res.json())
        .then(data => {
          setInterestedUser(data)
        })
    }, [UserId])

    return (
        <MDBCol md="4" lg="4">
        <MDBCard personal className="my-5">
          <MDBCardBody>
          <div className=''>
            <img src={interestedUser.profilePicture} alt="profilePicture" className="rounded-circle hoverable border border-info profile-setup"/>
            </div>
            <MDBCardTitle className='card-title mt-4'>
              <MDBIcon icon="user indigo-text" />  {interestedUser.firstName} {interestedUser.lastName}
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

            <br/> <br/>
            <h3 className="card-title">
            <MDBIcon icon="hand-holding-heart pink-text" /> Soft Skills</h3> 
            {Object.keys(interestedUser).length > 0 && interestedUser.Skills.filter((userData)=>{
                return (userData.category === "soft")
              }).length> 0 ? (interestedUser.Skills.filter((userData)=>{
                return (userData.category === "soft")
              }).map((name, index)=>{
                return <span className="skills-dashboard" key={index}>{name.name} </span> 
              })): "No skills"}   
       
            <br/> <br/>
            <h3 className="card-title">
            <MDBIcon icon="language purple-text" /> Spoken languages </h3>
            {Object.keys(interestedUser).length > 0 && interestedUser.Skills.filter((userData)=>{
                return (userData.category === "language")
              }).length> 0 ? (interestedUser.Skills.filter((userData)=>{
                return (userData.category === "language")
              }).map((name, index)=>{
                return <span className="skills-dashboard" key={index}>{name.name} </span> 
              })): "No languages"}
             <br/> <br/>
            
             <button className="card-link btn remove-member" onClick={pendingMember}>Remove Member from this project
             </button>

          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    )
}