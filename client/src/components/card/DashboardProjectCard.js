import { MDBCard, MDBCardText, MDBCardTitle, MDBIcon } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
    <a href="#!" className="card-link">
        Status: {isCompleted === false ? "Open" : "Closed"}
      </a>
      
      <a href="#!" className="card-link"><MDBIcon icon="calendar-alt deep-purple-text" /> {publishedAt.slice(0,10)}
      </a>
      <a href="#!" className="card-link"><MDBIcon icon="users indigo-text" /> {memberLimit}
      </a>
      <a href="#!" className="card-link"><MDBIcon fab icon="gratipay pink-text" /> {Object.keys(projectInfo).length > 0 && projectInfo.Members.length}
      </a>
      <a href="#!" className="card-link"><MDBIcon icon="check-square green-text" /> {acceptedMember && acceptedMember.length } 
      </a>
      <button className="card-link edit-card"><MDBIcon icon="edit" />
      </button>

      <button className="card-link delete-card" onClick={ () => removeProject(id)}><MDBIcon icon="trash-restore-alt red-text" />
      {console.log(acceptedMember)}  
      </button>
    </div>
    </aside>
    </MDBCard>
  </MDBCard>
        </div>
    )
}
