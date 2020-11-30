import { MDBCard, MDBCardText, MDBCardTitle, MDBIcon } from 'mdbreact'
import React from 'react'

export default function DashboardConProjectCard(props) {
    const { id, owner, description, title, isCompleted, publishedAt, deadline, memberLimit } = props.project
    return (
        <div>
            <MDBCard className="card-body card-body-contributing1 mb-4" >
            <aside>
    
            </aside>
            <MDBCard className="card-body card-body-contribuing2">
                <aside>
                <MDBCardTitle className="project-title">{title}</MDBCardTitle>
                <MDBCardText>
                    {description}
                </MDBCardText>
                <div className="flex-row ">
                    <a href="#!" className="card-link">
                    <MDBIcon icon="user" /> {owner}
                    </a>
                    <a href="#!" className="card-link"> <MDBIcon icon="comments" />
                    </a>
                </div>
                </aside>
                </MDBCard>
            </MDBCard>
        </div>
    )
}
