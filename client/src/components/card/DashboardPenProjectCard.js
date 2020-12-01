import { MDBCard, MDBCardText, MDBCardTitle, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function DashboardPenProjectCard(props) {
    const {id, owner, description, title } = props.project
    const [projectOwner, setProjectOwner] = useState([])
    const [modal, setModal] = useState(false);

    useEffect(()=>{
        fetch(`/api/v1/hub/user/${owner}`)
        .then(res=>res.json())
        .then(data=>{
            setProjectOwner(data)
          
          
        })
      }, [owner])

      // Modal
      const toggle = () => {
        setModal(!modal);
    }
    
    return (

        <div>
            
        <MDBCard className="card-body card-body-pending1 mb-4">
            <aside>
     
            </aside>
        <MDBCard className="card-body card-body-pending2">
        <aside>
      <MDBCardTitle className="project-title"> <MDBIcon icon="link" /> {title}</MDBCardTitle>
    <MDBCardText>
    {description.slice(0, 90)}{(description.length > 90 && "...")} <Link to="#" onClick={toggle}>Read More</Link>
    <MDBModal isOpen={modal} toggle={toggle}>
          <MDBModalHeader toggle={toggle}>Privacy Measures</MDBModalHeader>
                <MDBModalBody>
                We respect our users privacy. The full description will only be available after the project owner accepts your application. We appreciate your understanding.
                </MDBModalBody>
                <MDBModalFooter>
                    <button className='btn btn-primary' onClick={toggle}>Close</button>
                </MDBModalFooter>
            </MDBModal>



    </MDBCardText>

    <div className="flex-row ">
    <Link to="/public" className="card-link">
      
    <MDBIcon icon="user" />  
      <Link to={`/dashboard/public/${id}`}>{projectOwner.firstName} {projectOwner.lastName}</Link>
      </Link>
    </div>
    </aside>
    </MDBCard>
    </MDBCard>
    </div>

    )
}


