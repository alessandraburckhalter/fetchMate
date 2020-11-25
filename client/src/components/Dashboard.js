import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/dashboard.css'
import ProjectCard from './card/ProjectCard';

export default function Dashboard() {
  const [ownProjects, setOwnProjects] = useState([]);
  const [currentUserData, setCurrentUserData] = useState([])
  const user = useSelector(state => state.user);


  const loadUserSkill = async () =>{
    await fetch('/api/v1/hub/current')
      .then(res=>res.json())
      .then(data=>{
        setCurrentUserData(data)
      })
  }
  const loadOwnProject = () =>{
    fetch(`/api/v1/projects/`)
    // ${user.loginInfo.id}
      .then(res => res.json())
      .then(data=>{
        setOwnProjects(data)
      })
      .catch(error =>{
        console.log(error.error)
      })
  }
  useEffect(()=>{
    loadOwnProject()
    loadUserSkill()
  }, [])
    return (
        <div id="top">

    <MDBContainer>
      <MDBRow>
      <MDBCol md="6" lg="4">
        <MDBCard personal className="my-5">
          
          <MDBCardBody>
            <img src="#" alt="profilePicture" />
            {user.loginInfo.profilePicture}
            <MDBCardTitle>
              <a href="#!" className="title-one">
              {user.loginInfo.firstName} {user.loginInfo.lastName}
              </a>
            </MDBCardTitle>
            
            <hr />
            <a href="#!" className="card-meta">
              <span>
                <MDBIcon icon="envelope" /> 
                {user.loginInfo.email}
              </span>
            </a>
            <br/>
            <a href="#!" className="card-meta">
              {console.log(currentUserData)}
              Skills:
              
              {currentUserData && currentUserData.Skills.filter((userData)=>{
                return (userData.category === "technical")
                
              }).map((name)=>{
                return name.name
              })}
            </a>
            <br/>
            <a href="#!" className="card-meta">
              Spoken languages: 
              {currentUserData && currentUserData.Skills.filter((userData)=>{
                return (userData.category === "language")
                
              }).map((name)=>{
                return name.name
              })}
            </a>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    
      <MDBCol >
          <h1 >Your Projects</h1>
          { ownProjects.map((project, index)=>{
            return <ProjectCard key={project.id} project={project}/>
          })}
          
      <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
    <MDBCardTitle>Project title</MDBCardTitle>
    <MDBCardText>
      Project description
    </MDBCardText>
    <div className="flex-row ">
    <a href="#!" className="card-link">
        Status: status
      </a>
      <a href="#!" className="card-link">Published: date
      </a>
      <a href="#!" className="card-link">Member's limit: number
      </a>
      <a href="#!" className="card-link">Interested: number
      </a>
      <a href="#!" className="card-link">Accepted: number
      </a>
      <button className="card-link">Edit
      </button>
      <button className="card-link">Delete
      </button>
    </div>
  </MDBCard>
 
  <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
    <MDBCardTitle>Project title</MDBCardTitle>
    <MDBCardText>
      Project description
    </MDBCardText>
    <div className="flex-row ">
    <a href="#!" className="card-link">
        Status: status
      </a>
      <a href="#!" className="card-link">Published: date
      </a>
      <a href="#!" className="card-link">Member's limit: number
      </a>
      <a href="#!" className="card-link">Interested: number
      </a>
      <a href="#!" className="card-link">Accepted: number
      </a>
      <button className="card-link">Edit
      </button>
      <button className="card-link">Delete
      </button>
    </div>
  </MDBCard>

  <h1>Contribuiting Projects</h1>
      <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
    <MDBCardTitle>Project title</MDBCardTitle>
    <MDBCardText>
      Project description
    </MDBCardText>
    <div className="flex-row ">
    <a href="#!" className="card-link">
        Project owner: owner name
      </a>
      <a href="#!" className="card-link">Chat
      </a>  
    </div>
  </MDBCard>
 
  <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
    <MDBCardTitle>Project title</MDBCardTitle>
    <MDBCardText>
      Project description
    </MDBCardText>
    <div className="flex-row ">
    <a href="#!" className="card-link">
        Project owner: owner name
      </a>
      <a href="#!" className="card-link">Chat
      </a>
    </div>
  </MDBCard>

  <h1>Pending</h1>
      <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
    <MDBCardTitle>Project title</MDBCardTitle>
    <MDBCardText>
      Project description
    </MDBCardText>
    <div className="flex-row ">
    <a href="#!" className="card-link">
        Project owner: owner name
      </a>
      <a href="#!" className="card-link"> 
      </a>  
    </div>
  </MDBCard>
  </MDBCol>
    </MDBRow>
    </MDBContainer>
        </div>
    )
}
