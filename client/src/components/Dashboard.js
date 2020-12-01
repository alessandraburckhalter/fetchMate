import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdbreact';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions';
import '../styles/dashboard.css'
import ProjectCard from './card/DashboardProjectCard';
import ContributeProjectCard from "./card/DashboardConProjectCard";
import Footer from './Footer';
import DashboardConProjectsCard from "./card/DashboardConProjectCard"
import DashboardPenProjectCard from './card/DashboardPenProjectCard';
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom';

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
      
      
    })
  }
  useEffect(()=>{
    loadProject()
  }, [dispatch, setCurrentUserData])
  
    return (
    <>
      <Navbar />

      <div id="top">
    <MDBContainer>
      <MDBRow>
      <MDBCol md='3' className="mt-5">
      <MDBCard testimonial className="card-profile" >
      <div gradient='aqua' backgroundColor="red"/>
          <div className='mx-auto white'>
          <img
              src={user.loginInfo.profilePicture} 
              alt='' className="img-fluid rounded-circle hoverable border border-info" width="100%" 
            />
          </div>
          <MDBCardBody>
          <h4 className='card-title'> <MDBIcon icon="user indigo-text" /> {user.loginInfo.firstName} {user.loginInfo.lastName} </h4>
          <h4 className='card-title'><MDBIcon far icon="newspaper" /> {user.loginInfo.title}</h4>
          <h4 className='card-title'> <MDBIcon icon="envelope orange-text" /> {user.loginInfo.email} </h4> 
          <Link to="/hub"><button name="button" type="button" class="btn btn-block  edit-button">Edit profile</button></Link>
            <hr />

            <h3 class="card-title">
            <MDBIcon icon="cogs grey-text" /> Technical Skills</h3>
            <h2>
              {Object.keys(currentUserData).length > 0 && currentUserData.Skills.filter((userData)=>{
                return (userData.category === "technical")
              }).map((name)=>{
                return name.name + " " 
              })}
            </h2>
            
            <br/>
            <hr />

            <h3 class="card-title">
            <MDBIcon icon="hand-holding-heart pink-text" /> Soft Skills
            </h3>
            <h2>
              {Object.keys(currentUserData).length > 0 && currentUserData.Skills.filter((userData)=>{
                return (userData.category === "soft")
              }).map((name)=>{
                return name.name + " " 
              })}
            </h2>
            <br/>
            <hr />

            <h3 class="card-title">
            <MDBIcon icon="language purple-text" /> Spoken languages </h3>
              <h2>
              {Object.keys(currentUserData).length > 0 && currentUserData.Skills.filter((userData)=>{
                return (userData.category === "language")
                
              }).map((name)=>{
                return name.name + " "
              })}
              </h2>
            
            <br/>
            <hr />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>

    
      <MDBCol className="projects-col">
          <h1 className="title-cards">My Projects</h1>
          {Object.keys(currentUserData).length > 0 && currentUserData.Projects.map((project, index)=>{
            return <ProjectCard key={project.id} project={project} loadProject={loadProject}/>
          })} 
          <Link to="/projectForm"><button className="btn btn-block mb-3 publish-button">
            Publish a new project
          </button></Link>
          <br />

          <h1 className="title-cards">Contribuiting Projects</h1>
            {Object.keys(currentUserData).length > 0 && currentUserData.MemberProjects.map((project, index)=>{
            if(project.TeamMember.approved === "approved"){
              return <DashboardConProjectsCard key={project.id} project={project}/>

            }
          })}
      

          <h1 className="title-cards">Pending Projects</h1>
            {/* <MDBCard className="card-body card-body-pending1 " >
        <aside>
     
          
        </aside> */}
            {Object.keys(currentUserData).length > 0 && currentUserData.MemberProjects.map((project, index)=>{
            if(project.TeamMember.approved === "pending"){
              return <DashboardPenProjectCard key={project.id} project={project}/>

            }
          })}
     
  </MDBCol>
    </MDBRow>
    </MDBContainer>
        </div>

        <Footer />
      </>
    )
}
