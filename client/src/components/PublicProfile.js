import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import '../styles/publicProfile.css'
import { useParams } from 'react-router-dom'

export default function PublicProfile() {
  const { pendingId } = useParams()
  const [project, setProject] = useState([])
  const [owner, setOwner] = useState([])

  useEffect(() => {
    fetch(`/api/v1/projects/${pendingId}`)
      .then(res => res.json())
      .then(result => {
        setProject(result)
      })
      .catch(e => {
        console.log(e)
      })
    fetch(`/api/v1/hub/user/${project.owner}`)
      .then(res => res.json())
      .then(data => {
        setOwner(data)
        console.log(data)
      })
    
  }, [project.owner, pendingId])
  
    return (
      
        <div>
            <MDBContainer>
                <MDBRow>
            <MDBCol md="6" lg="4">
        <MDBCard personal className="my-5">
          
          <MDBCardBody>
            <img src={owner.profilePicture} alt="profilePicture" width="70%" />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>

      <MDBCol >
      <br/><br/><br/>
          <h1 >{owner.firstName} {owner.lastName}</h1><br/>
          <h1>{owner.title}</h1><br/>
          <h1>Soft Skills: {Object.keys(owner).length > 0 && owner.Skills.filter((userData)=>{
                return (userData.category === "soft")
                
              }).map((name)=>{
                return name.name + " " 
              })}</h1> <br/>
          <h1>Tech Skills: {Object.keys(owner).length > 0 && owner.Skills.filter((userData)=>{
                return (userData.category === "technical")
                
              }).map((name)=>{
                return name.name + " " 
              })}</h1><br/>
          <h1>Spoken languages: {Object.keys(owner).length > 0 && owner.Skills.filter((userData)=>{
                return (userData.category === "language")
                
              }).map((name)=>{
                return name.name + " " 
              })}</h1>
     </MDBCol>



      </MDBRow>
      </MDBContainer>
        </div>
    )
}
