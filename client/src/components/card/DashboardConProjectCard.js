import { MDBCard, MDBCardText, MDBCardTitle, MDBIcon } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../../styles/dashboard.css'

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
        
            <MDBCard className="card-body card-body-contributing1 mb-4" >
            <aside>
    
            </aside>
            <MDBCard className="card-body card-body-contributing2">
                <aside>
                <MDBCardTitle className="project-title"><Link to={`/dashboard/contribute/${id}`}>{title}</Link></MDBCardTitle>
                <MDBCardText>
                    {description}
                </MDBCardText>
                <div className="flex-row ">
                    <Link to={`/dashboard/contribute/${id}`} className="card-link">

                <MDBIcon icon="user" className="icon"/> {projectOwner.firstName} {projectOwner.lastName}  
                    </Link>
                    <Link to={`/chat/${id}`} className="card-link">
                        <MDBIcon icon="comments blue-text"/> Chat w/ Team
                    </Link>

                </div>
                </aside>
                </MDBCard>
            </MDBCard>
        
    )
}
