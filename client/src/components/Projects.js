import { MDBCard, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import '../styles/projects.css'
import IndividualProject from './card/IndividualProject'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const { projectId } = useParams();
  const user = useSelector(state => state.user);
  
  useEffect(() => {
    fetch('/api/v1/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
        console.log(data)
      })
  }, [])



  return (
    <>
        <div id="top">
          <MDBContainer>
            <h1 >Projects</h1>
      {projects.map((project) => {
        return (
            <IndividualProject key={project.id} project={project} />
        );
      })}
      </MDBContainer>
      </div>
    </>
  )
}
