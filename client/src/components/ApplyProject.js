import { MDBCard, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from 'mdbreact'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import '../styles/projects.css'

export default function ApplyProject() {
  const [projects, setProjects] = useState([])
  const { projectId } = useParams();
  const user = useSelector(state => state.user)
  
  useEffect(() => {
    fetch(`/api/v1/projects/${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
      })
  }, [])

    const applyProject = (e) => {
      fetch(`/api/v1/projects/${projectId}/teamMember`, {
        method: 'POST',
        body: JSON.stringify({
          memberIdArray: user.id
        }),
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)

      })


    }


  return (
    <div id="top">
    <MDBRow>

    <MDBCol >
      <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
        <MDBCardTitle><Link to="/interested">{projects.title}</Link></MDBCardTitle>
        <MDBCardText>
          {projects.description}
        </MDBCardText>
        <MDBCardText>
          Skills wanted: displays skills here
        </MDBCardText>
        <MDBCardText>
          Acceptable spoken languages: displays languages here
        </MDBCardText>
        <div className="flex-row ">
          <a href="#!" className="card-link">
            Status:{projects.isCompleted === false ? ' open' : ' closed'}
          </a>
          <a href="#!" className="card-link">Published: {Object.keys(projects).length > 0 && projects.publishedAt.slice(0,10)}
          </a>
          {/* //todo GET PROJECTsprojects OWNER NAME ONTO CARD */}
          <a href="#!" className="card-link">Project Owner:
          </a>
          <a href="#!" className="card-link">Member Limit:{projects.memberLimit}
          </a>
          <div>
            <Link to={`/projects/${projects.id}`}>

            <button className="participate-button">
              I want to be part of this project
            </button>
            </Link>
          </div>
        </div>
      </MDBCard>
      {/* ============================================================================================== */}
    </MDBCol>
  </MDBRow>
</div>


  )
}