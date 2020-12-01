import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InterestedCard from './card/InterestedCard'
import Navbar from './Navbar'
import '../styles/interested.css'

export default function Interested() {
    const { projectId } = useParams()
    const [project, setProject] = useState("")
    const [interested, setInterested] = useState([])
    
    // const publish = project.publishedAt
    console.log(project)
    const displayInterest = () =>{
      fetch(`/api/v1/projects/${projectId}/teamMember?status=pending`)
          .then(res =>res.json())
          .then(result =>{
            setInterested(result)
            console.log(result)
            
          })
    }
    useEffect(()=>{
      
        fetch(`/api/v1/projects/${projectId}`)
          .then(res =>res.json())
          .then(data =>{
            setProject(data)
            
          })
          displayInterest()
          
        
        
      }, [projectId, setProject])
  

    return (
      <>

      <Navbar />  
      <div id="top">

        <MDBContainer >
          <MDBRow>
          <MDBCol className="interested-col">
            <h1 >{project.title}</h1>
          <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
        <MDBCardText>
          {project.description}
        </MDBCardText>
        <div className="flex-row ">
        <a href="#!" className="card-link">
            Status: {project.isCompleted === true ? "Close" : "Open"}
          </a>
          <a href="#!" className="card-link">Deadline: {Object.keys(project).length > 0 && project.deadline.slice(0,10)} 
          </a>
          <a href="#!" className="card-link">
            language: 
            {Object.keys(project).length > 0 && project.Skills.filter((userData)=>{
                return (userData.category === "language")
              }).map((name)=>{
                return name.name+ " "
              })}
          </a>
          <a href="#!" className="card-link">
            Soft Skills: {Object.keys(project).length > 0 && project.Skills.filter((userData)=>{
                return (userData.category === "soft")
              }).map((name)=>{
                return name.name+ " "
              })}
          </a>
          <a href="#!" className="card-link">
            Technical Skills: {Object.keys(project).length > 0 && project.Skills.filter((userData)=>{
                return (userData.category === "technical")
              }).map((name)=>{
                return name.name + " " 
              })}
          </a>
          
        </div>
      </MDBCard>
     
    
      <h1>Interested People</h1>
      {console.log(interested)}
      {interested.length > 0 && interested.map((interestedUser, index, project)=>{
            return <InterestedCard key={interestedUser.id} project={project[0]} interestedUser={interestedUser} displayInterest={displayInterest} />
          })} 
     
      
      </MDBCol>
        </MDBRow>
        </MDBContainer>
            </div>
      </>
    )
}
    

