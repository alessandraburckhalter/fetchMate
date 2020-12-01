import { MDBCard, MDBCardText, MDBCardTitle, MDBContainer, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from 'mdbreact'
import React, { useState }  from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';

export default function DashboardProjectCard(props) {
    const { id, owner, description, title, isCompleted, publishedAt, deadline, memberLimit} = props.project

    const removeProject = (projectId) =>{
      fetch(`/api/v1/projects/${id}`,{
        method: "DELETE"
      })
      .then(res=>res.json())
      .then(result=>{
        props.loadProject()
      })  
      .catch(e=>{
        console.log(e)
      })
    }

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    }



    return (
        <div>
            <MDBCard className="card-body card-body-projects1 mb-4" >
            <aside>
    
            </aside>
            <MDBCard className="card-body card-body-projects2">
          <aside>
    <MDBCardTitle className="project-title"> <Link className="project-title" to={`/dashboard/${id}`}><MDBIcon icon="link" /> {title}</Link> </MDBCardTitle>
    <MDBCardText>
      {description}
    </MDBCardText>
    <div className="flex-row ">
    <a href="#!" className="card-link">
        Status: {isCompleted === false ? "Open" : "Closed"}
      </a>
      
      <a href="#!" className="card-link"><MDBIcon icon="calendar-alt deep-purple-text" /> {publishedAt.slice(0,10)}
      </a>
      <a href="#!" className="card-link"><MDBIcon icon="users indigo-text" /> {memberLimit}
      </a>
      <a href="#!" className="card-link"><MDBIcon fab icon="gratipay pink-text" /> 0
      </a>
      <a href="#!" className="card-link"><MDBIcon icon="check-square green-text" /> 0  
      </a>

      <button className="card-link delete-card" onClick={ () => removeProject(id)}><MDBIcon icon="trash-restore-alt red-text" />
      </button>
      
      <Link to='#' className="card-link edit-card" onClick={toggle}><MDBIcon icon="edit" /></Link>
          <MDBModal isOpen={modal} toggle={toggle}>
          <MDBModalHeader toggle={toggle}>{title}</MDBModalHeader>
                <MDBModalBody>
                  {description}
                </MDBModalBody>
                <MDBModalFooter>
                    <button className='btn btn-primary' onClick={toggle}>Close</button>
                    <button className='btn btn-secondary' onClick={toggle}>Save Changes</button>
                </MDBModalFooter>
            </MDBModal>

    </div>
    </aside>
    </MDBCard>
  </MDBCard>
        </div>
    )
}
