import { MDBCard, MDBCardText, MDBCardTitle } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function DashboardConProjectCard(props) {
    const { id, owner, description, title, isCompleted, publishedAt, deadline, memberLimit } = props.project
    const [projectOwner, setProjectOwner] = useState([])
    
      useEffect(()=>{
        fetch(`/api/v1/hub/user/${owner}`)
        .then(res=>res.json())
        .then(data=>{
            setProjectOwner(data)
          
          
        })
      }, [owner])
    return (
        <div>
            <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
                <MDBCardTitle><Link to={`/dashboard/contribute/${id}`}>{title}</Link></MDBCardTitle>
                <MDBCardText>
                    {description}
                </MDBCardText>
                <div className="flex-row ">
                    <a href="#!" className="card-link">
                        Project owner: {projectOwner.firstName} {projectOwner.lastName}  
      </a>
                    <a href="#!" className="card-link">Chat
      </a>
                </div>
            </MDBCard>
        </div>
    )
}
