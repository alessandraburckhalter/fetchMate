import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../redux/actions';
import '../styles/dashboard.css'
import ProjectCard from './card/DashboardProjectCard';
import ContributeProjectCard from "./card/DashboardConProjectCard"

export default function Dashboard() {

  const [currentUserData, setCurrentUserData] = useState([])
  const user = useSelector(state => state.user);
  const dispatch = useDispatch()

 

  const loadProject = () =>{
    fetch('/api/v1/hub/current')
    .then(res=>res.json())
    .then(data=>{
      setCurrentUserData(data)
      dispatch(login(data))
      console.log(data)
      
    })
  }
  useEffect(()=>{
    loadProject()
  }, [dispatch, setCurrentUserData])
  
    return (
        <div id="top">

    <MDBContainer>
      <MDBRow>
      <MDBCol md="6" lg="4">
        <MDBCard personal className="my-5">
          
          <MDBCardBody>
            <img src={user.loginInfo.profilePicture} alt="profilePicture" width="70%" />
            
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
              
              Skills:
              {console.log(currentUserData)}
              {Object.keys(currentUserData).length > 0 && currentUserData.Skills.filter((userData)=>{
                return (userData.category === "technical")
                
              }).map((name)=>{
                return name.name + " " 
              })}
            </a>
            <br/>
            <a href="#!" className="card-meta">
              Spoken languages:
              
              {Object.keys(currentUserData).length > 0 && currentUserData.Skills.filter((userData)=>{
                return (userData.category === "language")
                
              }).map((name)=>{
                return name.name + " "
              })}
            </a>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    
      <MDBCol >
          <h1 >Your Projects</h1>
          {Object.keys(currentUserData).length > 0 && currentUserData.Projects.map((project, index)=>{
            return <ProjectCard key={project.id} project={project} loadProject={loadProject}/>
          })} 
          
      

  <h1>Contribuiting Projects</h1>
    {Object.keys(currentUserData).length > 0 && currentUserData.MemberProjects.map((project, index)=>{
            return <ContributeProjectCard key={project.id} project={project}/>
          })}
      {/* <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
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
  </MDBCard> */}

  <h1>Pending</h1>
      <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
    <MDBCardTitle>Project title</MDBCardTitle>
    <MDBCardText>
      Project description
    </MDBCardText>
    <div className="flex-row ">
    <Link to="/public" className="card-link">
      
        Project owner: owner name
      </Link>
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
