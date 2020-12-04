import { MDBCard, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import '../styles/projects.css'
import IndividualProject from './card/IndividualProject'
import IndividualProjectPublic from './card/IndividualProjectPublic'
import Navbar from './Navbar';
import Footer from './Footer'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const user = useSelector(state => state.user)
  console.log(projects)

  const loadProject = () =>{
    fetch('/api/v1/projects')
      .then((res) => res.json())
      .then((data) => {
        // setProjects(data.filter((project) => {
        //     return project.User.id !== user.loginInfo.id
        // }))
        setProjects(data)
        console.log(data)
      })
  }
  useEffect(() => {
    loadProject()
  }, [])



  console.log(user)
  return (
    <>
      <Navbar />  
        <div id="top">
          <MDBContainer className="projects-container">
          <h1 className="all-projects-title">Projects</h1>
            {user.loginInfo ? (projects.map((project) => {
        return (
          <IndividualProject key={project.id} project={project} loadProject={loadProject}/>
            
        );
      })) : (projects.map((project) => {
        return (
          <IndividualProjectPublic key={project.id} project={project} />
            
        );
      }))} 
      
      </MDBContainer>
      </div>

      <Footer />
    </>
  )
}
