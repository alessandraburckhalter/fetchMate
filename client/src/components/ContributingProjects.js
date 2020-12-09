import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar';
import '../styles/contributing.css'
import ScrollToTop from './ScrollToTop';

export default function ContributingProjects() {
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
      <>
      <ScrollToTop />
      <Navbar />

        <div id="top">
      <MDBContainer className="contributing-container">
        <h1 className="contributing-title ">Your Contributions</h1>
      <MDBRow>
      <MDBCol md="3" lg="4" className=" ">
        <MDBCard testimonal className="card-body-contributing">
          
          <MDBCardBody>
          <div className=''>
            <img src={owner.profilePicture}alt="profilePicture" className="rounded-circle hoverable border border-info contributing-image"  />
          </div>
            <MDBCardTitle>
            <h4 className='card-title-interested mt-4'> <MDBIcon icon="user indigo-text" /> {owner.firstName} {owner.lastName}
              </h4>
              <h4 className='card-title'><MDBIcon far icon="newspaper" /> {owner.title}
              </h4>
            </MDBCardTitle>
            
            <hr />
            <h4 className="card-title">
              <Link to={`/chat/${project.id}`}>
                <MDBIcon icon="comments blue-text" /> Chat now with the team
              </Link>
            </h4> 
            <br/>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    
      <MDBCol className="mt-5 contributing-col">
      <MDBCard className="card-body " >
      <MDBCardTitle className="project-title"><i class="fas fa-bookmark amber-text"></i> {project.title}</MDBCardTitle > 
          <MDBCardText>
          {project.description} 
          </MDBCardText>
         <MDBCardText>
        <h1 className="all-prjects-skills-title">
        <i class="fas fa-angle-right"></i> Desirable Technical Skills </h1>

        {Object.keys(project).length > 0 && project.Skills.filter((userData)=>{
                return (userData.category === "technical")
              }).length> 0 ? (project.Skills.filter((userData)=>{
                return (userData.category === "technical")
              }).map((name)=>{
                return <span className="skills-dashboard">{name.name} </span> 
              })): "No technical skills required"} <br /> <br />

        <h1 className="all-prjects-skills-title">
        <i class="fas fa-angle-right"></i> Desirable Soft Skills </h1>  
        {Object.keys(project).length > 0 && project.Skills.filter((userData)=>{
                return (userData.category === "soft")
              }).length> 0 ? (project.Skills.filter((userData)=>{
                return (userData.category === "soft")
              }).map((name)=>{
                return <span className="skills-dashboard">{name.name} </span> 
              })): "No soft skills required"} <br /> <br />

        <h1 className="all-prjects-skills-title">
        <i class="fas fa-angle-right"></i> Acceptable Spoken Languages </h1>

        {Object.keys(project).length > 0 && project.Skills.filter((userData)=>{
                return (userData.category === "language")
              }).length> 0 ? (project.Skills.filter((userData)=>{
                return (userData.category === "language")
              }).map((name)=>{
                return <span className="skills-dashboard">{name.name} </span> 
              })): "No languages required"} <br /> <br />

        </MDBCardText>
            <div className="flex-row ">
            <a href="#!" className="card-link icon icon-all-projects-width">
                                 {project.isCompleted === false ? 
                                 (<><MDBIcon icon="lock-open green-text" /> Available</>) : 
                                 (<><MDBIcon icon="lock black-text" /> Unavailable</>)} <span>Project Status</span>
                                </a>
                                <a href="#!" className="card-link icon icon-all-projects-width"><MDBIcon icon="calendar-alt deep-purple-text" /> {Object.keys(project).length > 0 && project.deadline.slice(0, 10)} <span>Deadline</span>
                                </a>

                                <a href="#!" className="card-link icon icon-all-projects-width"><MDBIcon icon="users indigo-text" /> {project.memberLimit}<span>Max. members</span> 
                                 </a>
          </div>
         
          
          
  </MDBCard>  
  </MDBCol>
    </MDBRow>
    </MDBContainer>
            
        </div>
        <Footer/>
    </>
    )
}
