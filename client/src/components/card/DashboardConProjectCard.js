import { MDBCard, MDBCardText, MDBCardTitle } from 'mdbreact'
import React from 'react'

export default function DashboardConProjectCard(props) {
    const { id, owner, description, title, isCompleted, publishedAt, deadline, memberLimit } = props.project
    return (
        <div>
            <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
                <MDBCardTitle>{title}</MDBCardTitle>
                <MDBCardText>
                    {description}
                </MDBCardText>
                <div className="flex-row ">
                    <a href="#!" className="card-link">
                        Project owner: {owner}
      </a>
                    <a href="#!" className="card-link">Chat
      </a>
                </div>
            </MDBCard>
        </div>
    )
}
