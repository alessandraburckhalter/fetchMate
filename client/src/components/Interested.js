import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InterestedCard from './card/InterestedCard'

export default function Interested() {
    const { projectId } = useParams()
    const [project, setProject] = useState("")
    const [interested, setInterested] = useState([])
    
    // const publish = project.publishedAt
    useEffect(()=>{
      
        fetch(`/api/v1/projects/${projectId}`)
          .then(res =>res.json())
          .then(data =>{
            setProject(data)
            
          })
          fetch(`/api/v1/projects/${projectId}/teamMember?onlyPending=true`)
          .then(res =>res.json())
          .then(result =>{
            setInterested(result)
            console.log(result)
            
          })
          
        
        
      }, [projectId, setProject])
  

    return (
      <div id="top">

        <MDBContainer>
          <MDBRow>
          
        
          <MDBCol >
            <h1 >{project.title}</h1>
          <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
        <MDBCardText>
          {project.description}
        </MDBCardText>
        <div className="flex-row ">
        <a href="#!" className="card-link">
            Status: {project.isCompleted === true ? "Close" : "Open"}
          </a>
          <a href="#!" className="card-link">Published: {Object.keys(project).length > 0 && project.publishedAt.slice(0,10)} 
          </a>
          
        </div>
      </MDBCard>
     
    
      <h1>Interested People</h1>
      {interested.length > 0 && interested.map((interestedUser, index)=>{
            return <InterestedCard key={interestedUser.id} interestedUser={interestedUser} />
          })} 
     
      
      </MDBCol>
        </MDBRow>
        </MDBContainer>
            </div>
    )
}
    

