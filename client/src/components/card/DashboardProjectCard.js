import { MDBCard, MDBCardText, MDBCardTitle, MDBIcon } from 'mdbreact'
import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function DashboardProjectCard(props) {
    const { id, owner, description, title, isCompleted, publishedAt, deadline, memberLimit} = props.project
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
      <button className="card-link edit-card"><MDBIcon icon="edit" />
      </button>
      <button className="card-link delete-card"><MDBIcon icon="trash-restore-alt red-text" />
      </button>
    </div>
    </aside>
    </MDBCard>
  </MDBCard>
        </div>
    )
}
