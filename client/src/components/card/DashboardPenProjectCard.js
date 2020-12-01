import { MDBCard, MDBCardText, MDBCardTitle, MDBIcon } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function DashboardPenProjectCard(props) {
    const {id, owner, description, title } = props.project
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
            <MDBCard className="card-body card-body-pending1 mb-4" >
            <aside>
     
            </aside>
            <MDBCard className="card-body card-body-pending2">
             <aside>
                <MDBCardTitle className="project-title"><MDBIcon icon="link" /> {title}</MDBCardTitle>
                <MDBCardText>
                    {description}
                </MDBCardText>
                <div className="flex-row ">
                    <Link to="/public" className="card-link">

                    <MDBIcon icon="user" /> <Link to={`/dashboard/public/${id}`}>{projectOwner.firstName} {projectOwner.lastName}</Link>
                        </Link>
                    <a href="#!" className="card-link">
                    </a>
                </div>
                </aside>
                </MDBCard>
            </MDBCard>
        </div>
    )
}
