import { MDBCard, MDBCardBody, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ContribuingProjects() {
    const { contributeId } = useParams()
    const [project, setProject] = useState([])
    const [owner, setOwner] = useState([])

    
  useEffect(() => {
    fetch(`/api/v1/projects/${contributeId}`)
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
      })
    
  }, [project.owner, contributeId])
        
        

    return (
        <div>
             <MDBContainer>
      <MDBRow>
      <MDBCol md="6" lg="4">
        <MDBCard personal className="my-5">
          
          <MDBCardBody>
            <img src={owner.profilePicture}alt="profilePicture" width="70%" />
            
            <MDBCardTitle>
              <a href="#!" className="title-one">
              Owner: {owner.firstName} {owner.lastName}
              </a> <br />
              <a href="#!" className="title-one">
              {owner.title}
              </a>
            </MDBCardTitle>
            
            <hr />
            <a href="#!" className="title-one">
              Chat
              </a> <br />
            <a href="#!" className="card-meta">
              <span>
                Contact Info: {owner.email}
              </span>
            </a>
            <br/>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    
      <MDBCol >
          <br/><br/>
          <h1>{project.title}</h1> <br/>
          <h3>Project Detail: {project.description}</h3>
          <h3>status: {project.isCompleted === false ? "Open" : "Closed"}</h3>
          <h3>Published: {Object.keys(project).length > 0 && project.publishedAt.slice(0,10)} </h3>
          <h3>DeadLine: {Object.keys(project).length > 0 && project.deadline.slice(0,10)} </h3>
          <h3>Member Limit: {project.memberLimit}</h3>
          
    
  </MDBCol>
    </MDBRow>
    </MDBContainer>
            
        </div>
    )
}
