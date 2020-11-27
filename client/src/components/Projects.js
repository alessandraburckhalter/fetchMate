import { MDBCard, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBRow } from 'mdbreact'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/projects.css'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [owners, setOwner] = useState([])
  useEffect(() => {
    fetch('/api/v1/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
        console.log(data)
      })
      fetch('/api/v1/user')
      .then((res) => res.json())
      .then((data) => {
        setOwner(data)
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
            <div key={project.id}>

                  <MDBRow>

                    <MDBCol >
                      <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
                        <MDBCardTitle><Link to="/interested">{project.title}</Link></MDBCardTitle>
                        <MDBCardText>
                          {project.description}
                        </MDBCardText>
                        <MDBCardText>
                          Skills wanted: displays skills here
                        </MDBCardText>
                        <MDBCardText>
                          Acceptable spoken languages: displays languages here
                        </MDBCardText>
                        <div className="flex-row ">
                          <a href="#!" className="card-link">
                            Status:{project.isCompleted === false ? ' open' : ' closed'}
                          </a>
                          <a href="#!" className="card-link">Published: {Object.keys(project).length > 0 && project.publishedAt.slice(0,10)}
                          </a>
                          {/* //todo GET PROJECT OWNER NAME ONTO CARD */}
                          <a href="#!" className="card-link">Project Owner:{project.owner.firstName}
                          </a>
                          <a href="#!" className="card-link">Member Limit:{project.memberLimit}
                          </a>
                          <div>
                            <button className="participate-button">
                              I want to be part of this project
                            </button>
                          </div>
                        </div>
                      </MDBCard>
                      {/* ============================================================================================== */}
                    </MDBCol>
                  </MDBRow>
              </div>
        );
      })}
      </MDBContainer>
      </div>
    </>
  )
}
