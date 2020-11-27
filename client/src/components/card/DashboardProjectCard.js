import { MDBCard, MDBCardText, MDBCardTitle } from 'mdbreact'
import React from 'react'
import { Link } from 'react-router-dom'

export default function DashboardProjectCard(props) {
    const { id, owner, description, title, isCompleted, publishedAt, deadline, memberLimit} = props.project
    return (
        <div>
            <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
    <MDBCardTitle><Link to={`/dashboard/${id}`}>{title}</Link> </MDBCardTitle>
    <MDBCardText>
      {description}
    </MDBCardText>
    <div className="flex-row ">
    <a href="#!" className="card-link">
        Status: {isCompleted === false ? "Open" : "Closed"}
      </a>
      <a href="#!" className="card-link">Published: {publishedAt.slice(0,10)}
      </a>
      <a href="#!" className="card-link">Member's limit: {memberLimit}
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
        </div>
    )
}
