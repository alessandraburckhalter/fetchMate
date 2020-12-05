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
import { Link, useHistory } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

export default function Dashboard() {
  const [show, setShow] = useState(false);
  const [profilePicture, setProfilePicture] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentUserData, setCurrentUserData] = useState([])
  const history = useHistory()
  const user = useSelector(state => state.user);
  const dispatch = useDispatch()
  const formData = new FormData()

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.append('profilePicture',profilePicture)
    
    fetch('/api/v1/hub', {
      method: 'PATCH',
      body:formData
    })
      .then(res => {
        console.log(res)
      })
      .then(data => {
        console.log(data)
        loadProject()
        alert('Profile Updated!')
        handleClose()
        
      })
      .catch(e => {
        console.log(e)
      })
    
  }
 

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
          <div className='image-and-camera'>
          <img
              src={user.loginInfo.profilePicture} 
              alt='' className="rounded-circle hoverable border border-info" 
            />
          <button className="camera-button" onClick={handleShow}>
          <MDBIcon icon="camera" />
          </button>
          </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update your profile picture</Modal.Title>
        </Modal.Header>
        <Modal.Body><form id="profilePic" onSubmit={(e) => {handleSubmit(e)}}>
            <label htmlFor="defaultFormCardNameEx" className="labe-headline"><MDBIcon icon="share indigo-text" />  Profile Picture
           </label>
           
            <input type="file" id="defaultFormCardNameEx" className="form-control" onChange={(e) => {setProfilePicture(e.target.files[0])}}/>
            <br />

            
          </form>
          </Modal.Body>
        <Modal.Footer>
        <Button form="profilePic" variant="success" type="submit" className="btn btn-lg btn-block mb-5">
            SUBMIT <MDBIcon far icon="paper-plane" />
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
      
          <MDBCardBody>
          <h4 className='card-title'> <MDBIcon icon="user indigo-text" /> {user.loginInfo.firstName} {user.loginInfo.lastName} </h4>
          <h4 className='card-title'><MDBIcon far icon="newspaper" /> {user.loginInfo.title ? user.loginInfo.title : (<Link to='/hub'>No headline. Edit Your Profile Here.</Link>)}</h4>
          <h4 className='card-title'> <MDBIcon icon="envelope orange-text" /> {user.loginInfo.email} </h4> 
          <Link to="/hub"><button name="button" type="button" class="btn btn-block  edit-button">Edit profile</button></Link>
            <hr />

            <h3 class="card-title">
            <MDBIcon icon="cogs grey-text" /> Technical Skills</h3>
            <h2>
            {Object.keys(currentUserData).length > 0 && currentUserData.Skills.filter((userData)=>{
                return (userData.category === "technical")
               
                  
              }).length> 0 ? (currentUserData.Skills.filter((userData)=>{
                return (userData.category === "technical")
               
                  
              }).map((name)=>{
                
                  return <span className="skills-dashboard">{name.name} </span> 
                })): (<Link to='/hub'>No Skills. Edit Your Profile Here.</Link>)}
            </h2>
            
            <br/>
            <hr />

            <h3 class="card-title">
            <MDBIcon icon="hand-holding-heart pink-text" /> Soft Skills
            </h3>
            <h2>
            {Object.keys(currentUserData).length > 0 && currentUserData.Skills.filter((userData)=>{
                return (userData.category === "soft")
               
                  
              }).length> 0 ? (currentUserData.Skills.filter((userData)=>{
                return (userData.category === "soft")
               
                  
              }).map((name)=>{
                
                  return <span className="skills-dashboard">{name.name} </span> 
                })): (<Link to='/hub'>No Skills. Edit Your Profile Here.</Link>)}
            </h2>
            <br/>
            <hr />

            <h3 class="card-title">
            <MDBIcon icon="language purple-text" /> Spoken languages </h3>
              <h2>
              {Object.keys(currentUserData).length > 0 && currentUserData.Skills.filter((userData)=>{
                return (userData.category === "language")
               
                  
              }).length> 0 ? (currentUserData.Skills.filter((userData)=>{
                return (userData.category === "language")
               
                  
              }).map((name)=>{
                
                  return <span className="skills-dashboard">{name.name} </span> 
                })): (<Link to='/hub'>No language. Edit Your Profile Here.</Link>)}
              </h2>
            
            <br/>
            <hr />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>

    
      <MDBCol className="projects-col">
          <h1 className="title-cards">My Projects</h1>

             
          {Object.keys(currentUserData).length > 0 && (Object.keys(currentUserData.Projects).length > 0 ? (currentUserData.Projects.map((project, index)=>{
            return <ProjectCard key={project.id} project={project} loadProject={loadProject}/>
          })): "No projects") } 
          <Link to="/projectForm"><button className="btn btn-block mb-3 publish-button">
            Publish a new project
          </button></Link>
          <br />

          <h1 className="title-cards">Contributing Projects</h1>
            {console.log(currentUserData)}
            {Object.keys(currentUserData).length > 0 && currentUserData.MemberProjects.map((project, index)=>{
            if(project.TeamMember.approved === "approved"){
              return <DashboardConProjectsCard key={project.id} project={project}/>
            }else if(project.TeamMember.approved !== "approved" || !project.TeamMember ){
              return "No participated project"
            }
          })}

      

          <h1 className="title-cards">Pending Projects</h1>
            {/* <MDBCard className="card-body card-body-pending1 " >
        <aside>
     
          
        </aside> */}
            {Object.keys(currentUserData).length > 0 && currentUserData.MemberProjects.map((project, index)=>{
            if(project.TeamMember.approved === "pending"){
              return <DashboardPenProjectCard key={project.id} project={project}/>
            }else if(project.TeamMember.approved !== "pending" || !project.TeamMember ){
              return "No applied project"
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
