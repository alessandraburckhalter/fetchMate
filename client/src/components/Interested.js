import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdbreact'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Interested() {
    const { projectId } = useParams()
    const [project, setProject] = useState("")
    // const publish = project.publishedAt
    useEffect(()=>{
      
        fetch(`/api/v1/projects/${projectId}`)
          .then(res =>res.json())
          .then(data =>{
            setProject(data)
            
          })
        
      }, [projectId, setProject])
  

    return (
      <div id="top">

        <MDBContainer>
          <MDBRow>
          
        
          <MDBCol >
            <h1 >{project.title}</h1>
          <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
        <MDBCardText>
          {project.description}
        </MDBCardText>
        <div className="flex-row ">
        <a href="#!" className="card-link">
            Status: {project.isCompleted === true ? "Close" : "Open"}
          </a>
          <a href="#!" className="card-link">Published: {Object.keys(project).length > 0 && project.publishedAt.slice(0,10)} 
          </a>
          
        </div>
      </MDBCard>
     
    
      <h1>Interested People</h1>
      <MDBCol md="6" lg="4">
        <MDBCard personal className="my-5">
          
          <MDBCardBody>
            <img src="#" alt="profilePicture" />
            <MDBCardTitle>
              <a href="#!" className="title-one">
              Full Name
              </a>
            </MDBCardTitle>
            
            <hr />
            <a href="#!" className="card-meta">
                Skills: display skills
            </a><br/>
            <a href="#!" className="card-meta">
                Spoken languages: display languages
            </a> <br/>
            <button className="card-link">Accept
             </button> <button className="card-link">Decline
             </button>
          </MDBCardBody>
        </MDBCard>
      
        <MDBCard personal className="my-5">
          
          <MDBCardBody>
            <img src="#" alt="profilePicture" />
            <MDBCardTitle>
              <a href="#!" className="title-one">
              Full Name
              </a>
            </MDBCardTitle>
            
            <hr />
            <a href="#!" className="card-meta">
                Skills: display skills
            </a><br/>
            <a href="#!" className="card-meta">
                Spoken languages: display languages
            </a>
            <br/>
            <button className="card-link">Accept
             </button> <button className="card-link">Decline
             </button>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
     
      
      </MDBCol>
        </MDBRow>
        </MDBContainer>
            </div>
    )
}
    

