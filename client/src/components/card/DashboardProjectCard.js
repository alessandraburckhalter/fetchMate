
import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardText, MDBCardTitle, MDBContainer, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from 'mdbreact'

import { Dropdown, DropdownButton } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';

export default function DashboardProjectCard(props) {
    const { id, owner, description, title, isCompleted, publishedAt, deadline, memberLimit} = props.project
    const [projectInfo, setProjectInfo] = useState([])
    const [acceptedMember, setAcceptedMember] = useState([])
    
    

    
    const addAcceptedMember = () =>{
      console.log(projectInfo.Members)
      const acceptMember = projectInfo.Members && projectInfo.Members.filter((acceptedMember)=>{
        return acceptedMember.TeamMember.approved === "approved"
      })
      console.log(acceptMember)
      
          return setAcceptedMember(acceptMember) 
      
    }
        

       
    
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

    useEffect(()=>{
      fetch(`/api/v1/projects/${id}`)
        .then(res=>res.json())
        .then(data=>{
          setProjectInfo(data)
        })
    },[id])
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    }


    useEffect(()=>{

        addAcceptedMember() 
    },[projectInfo])  
          
          
          
        
        
    console.log(projectInfo)

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
    <a href="#!" className="card-link icon">
        Status: {isCompleted === false ? "Open" : "Closed"} <span>Project Status</span>
      </a>
      
      <a href="#!" className="card-link icon"><MDBIcon icon="calendar-alt deep-purple-text" />  {publishedAt.slice(0,10)} <span>Published date</span>
      </a>
      <a href="#!" className="card-link icon"><MDBIcon icon="users indigo-text" /> {memberLimit} <span>Member's limit</span> 
      </a>
    
      <a href="#!" className="card-link icon"><MDBIcon fab icon="gratipay pink-text" /> {Object.keys(projectInfo).length > 0 && projectInfo.Members.length} <span>Interested People</span>
      </a>
      <a href="#!" className="card-link icon"><MDBIcon icon="check-square green-text" /> {acceptedMember && acceptedMember.length }  <span>Approved</span>
      </a>

      <a href="#!" ><button className="card-link icon delete-card" onClick={ () => removeProject(id)}><MDBIcon icon="trash-restore-alt red-text" /><span>Delete</span> 
      </button></a>
      
      <Link to='#' className="card-link icon edit-card" onClick={toggle}><MDBIcon icon="edit" /><span>Edit</span> </Link>
          <MDBModal isOpen={modal} toggle={toggle}>
          <MDBModalHeader toggle={toggle}>{title}</MDBModalHeader>
                <MDBModalBody>
                  {description}
                </MDBModalBody>
                <MDBModalFooter>
                    <button className='btn btn-primary' onClick={toggle}>Close</button>
                    <button type="submit" className='btn btn-secondary' onClick={toggle}>Save Changes</button>
                </MDBModalFooter>
            </MDBModal>

    </div>
    </aside>
    </MDBCard>
  </MDBCard>
        </div>
    )
}
