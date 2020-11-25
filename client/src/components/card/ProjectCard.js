import { MDBCard, MDBCardText, MDBCardTitle } from 'mdbreact'
import React from 'react'

export default function ProjectCard() {
    return (
        <div>
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
        </div>
    )
}
