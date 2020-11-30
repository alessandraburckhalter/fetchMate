import { MDBCard, MDBCardText, MDBCardTitle } from 'mdbreact'
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
            <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
                <MDBCardTitle>{title}</MDBCardTitle>
                <MDBCardText>
                    {description}
    </MDBCardText>
                <div className="flex-row ">
                    <Link to="/public" className="card-link">

                        Project owner: <Link to={`/dashboard/public/${id}`}>{projectOwner.firstName} {projectOwner.lastName}</Link>
      </Link>
                    <a href="#!" className="card-link">
                    </a>
                </div>
            </MDBCard>
        </div>
    )
}
