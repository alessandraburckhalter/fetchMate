import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import InterestedCard from './card/InterestedCard'
import Navbar from './Navbar'
import '../styles/interested.css'
import AcceptedCard from './card/AcceptedCard';
import Footer from './Footer'

export default function Interested() {
    const { projectId } = useParams()
    const [project, setProject] = useState({})
    const [interested, setInterested] = useState([])
    const [accepted, setAccepted] = useState([])
    
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

    const displayAccepted = () =>{
      fetch(`/api/v1/projects/${projectId}/teamMember?status=approved`)
          .then(res =>res.json())
          .then(result =>{
            setAccepted(result)
            
            
          })
    }
    useEffect(()=>{
      
        fetch(`/api/v1/projects/${projectId}`)
          .then(res =>res.json())
          .then(data =>{
            setProject(data)
            
          })
          displayInterest()
          displayAccepted()
          
        
        
      }, [projectId, setProject, setInterested, setAccepted])
  

    return (
      <>

      <Navbar />  
      <div id="top">

        <MDBContainer className="project-overview-container">
          <MDBRow>
          <MDBCol className="interested-col">
            <h1 className="interested-titles mb-5 ">Project Overview</h1>
          <MDBCard className="card-body  mb-5" >
       
        <MDBCardTitle className="project-title"><MDBIcon icon="link" /> {project.title}</MDBCardTitle >
        <MDBCardText>
          {project.description}
        </MDBCardText>

        <MDBCardText>
          <h1 className="all-prjects-skills-title">
            Desirable Technical Skills </h1>{Object.keys(project).length > 0 && project.Skills.filter((userData)=>{
                return (userData.category === "technical")
              }).map((name)=>{
                return <span className="all-projects-skills">{name.name}</span>
              })}

          <h1 className="all-prjects-skills-title">
            Desirable Soft Skills </h1>
            {Object.keys(project).length > 0 && project.Skills.filter((userData)=>{
                return (userData.category === "soft")
              }).map((name)=>{
                return <span className="all-projects-skills">{name.name}</span>
              })}

          <h1 className="all-prjects-skills-title">
            Acceptable Spoken Languages </h1>
            {Object.keys(project).length > 0 && project.Skills.filter((userData)=>{
                return (userData.category === "language")
              }).map((name)=>{
                return <span className="all-projects-skills">{name.name}</span>
              })}
          
          
        </MDBCardText>
        <div className="flex-row ">
          <a href="#!" className="card-link icon">
            <MDBIcon icon="calendar-alt deep-purple-text"/> {Object.keys(project).length > 0 && project.deadline.slice(0,10)} <span>Deadline</span>
          </a>
          
          <Link to={`/chat/${project.id}`} className="card-link icon">
            <MDBIcon icon="comments blue-text" /><span>Chat w/ Team</span>
          </Link>
        </div>
      </MDBCard>
      </MDBCol>

       <MDBContainer>     
      <h1 className="interested-titles">Applications Received</h1>
      <MDBRow>
      
      {interested.length > 0 ? (interested.map((interestedUser, index, project)=>{
            return <InterestedCard key={interestedUser.id} project={project[0]} interestedUser={interestedUser} displayInterest={displayInterest} displayAccepted={displayAccepted}/>
          })) : "No applications yet"} 

      </MDBRow>
      </MDBContainer>  

      <MDBContainer className="team-members-container"> 
      <h1 className="interested-titles">Team Members</h1>
      <MDBRow>
      {accepted.length > 0 ? (accepted.map((acceptedMember, index, project)=>{
            return <AcceptedCard key={acceptedMember.id} project={project[0]} acceptedMember={acceptedMember} displayAccepted={displayAccepted} displayInterest={displayInterest}/>
          })) : "No team members yet"} 
         
        </MDBRow>
      </MDBContainer>

      </MDBRow>    
    </MDBContainer>
      </div>
        <Footer />
      </>
    )
}
    

