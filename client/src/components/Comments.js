import React, {  useEffect, useState } from 'react';
import Navbar from './Navbar'
import Footer from './Footer'
import { MDBCard, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBRow } from 'mdbreact';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/comments.css'

export default function Comments({ project }) {
    const { projectId } = useParams()
    const user = useSelector(state => state.user)
    const [comments, setComments] = useState([])
    const [content, setContent] = useState("")
  

    const [modal, setModal] = useState(false);
     // Modal
     const toggle = () => {
        setModal(!modal);
    }

    const commentHandle = (e) =>{
        e.preventDefault()
        fetch(`/api/v1/projects/${projectId}/comments`,{
            method: 'POST',
            body: JSON.stringify({
                content: content
            }),
            headers:{'Content-Type' : 'application/json'}
        })
        .then(res=>res.json())
        .then(data=>{
            setComments(comments.concat([data.comment]))
            setContent("")
        })
    }

  
    useEffect(()=>{
        

        fetch(`/api/v1/projects/${projectId}/comments`)
            .then(res=>res.json())
            .then(data=>{
                setComments(data)
            })
    },[projectId])

    return (
        <>
            <Navbar />
        <div id="top">
            <MDBContainer md="12" className="projects-container">

                <MDBRow>
                    <MDBCol className="comments-col">
                    
                        <MDBCard className="card-body card-body-all-projects1 mb-5" >
                        <aside>
    
                            </aside>
                            <MDBCard className="card-body card-body-all-projects2">
                            <aside>
                            <MDBCardTitle className="project-title"><Link className="project-tilte" to="/interested"><MDBIcon icon="link" /> Project title </Link></MDBCardTitle>
                            <MDBCardText>
                                Project description<Link to="#" onClick={toggle}>Read More</Link> 
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
                            <MDBCardText>
                                {/* <h1 className="all-prjects-skills-title">Desirable Technical Skills</h1> 
                                {project.Skills.filter(skill => skill.category === 'technical').map((skill) => {
                                    console.log(skill)
                                    return <span className="all-projects-skills">{skill.name}</span>
                                    
                                })} */}
                                <br/><br/>
                                <h1 className="all-prjects-skills-title">Desirable Soft Skills</h1>
                                {/* {project.Skills.filter(skill => skill.category === 'soft').map((skill) => {
                                    console.log(skill)
                                    return <span className="all-projects-skills">{skill.name}</span>
                                    
                                })} */}
                                <br/><br/>
                            </MDBCardText>
                            <MDBCardText>
                            <h1 className="all-prjects-skills-title">Acceptable Spoken languages</h1>
                                {/* {project.Skills.filter(skill => skill.category === 'language').map((skill) => {
                                    console.log(skill)
                                    return <span className="all-projects-skills">{skill.name}</span>
                                    
                                })} */}
                            </MDBCardText>
                            <div className="flex-row ">
                                <a href="#!" className="card-link icon icon-all-projects-width">
                                 {/* {project.isCompleted === false ? 
                                 (<><MDBIcon icon="lock-open green-text" /> Available</>) : 
                                 (<><MDBIcon icon="lock black-text" /> Unavailable</>)} <span>Project Status</span> */}
                                </a>
                                <a href="#!" className="card-link icon icon-all-projects-width"><MDBIcon icon="calendar-alt deep-purple-text" /> 
                                {/* {Object.keys(project).length > 0 && project.publishedAt.slice(0, 10)} <span>Deadline</span> */}
                                </a>
                                {/* //todo GET PROJECT OWNER NAME ONTO CARD */}
                                <a href="#!" className="card-link icon icon-all-projects-width"><MDBIcon icon="user-alt black-text" /> 
                                {/* {project.User.firstName} {project.User.lastName} <span>Project owner</span> */}
                                </a>
                                <a href="#!" className="card-link icon icon-all-projects-width"><MDBIcon icon="users indigo-text" /> 
                                {/* {project.memberLimit} <span>Member's limit</span>  */}
                                </a>
                            </div>
                            </aside>
                            </MDBCard>
                        </MDBCard>
                        

                        <form onSubmit={commentHandle}>
                
                        <label htmlFor="defaultFormCardNameEx" className="grey-text font-weight-light">
                       Leave a comment
                        </label>
                        <input type="text-area" id="defaultFormCardNameEx" value={content} className="form-control" onChange={(e) => {setContent(e.target.value)}}/>
                        <br />
                    
                        <div className="text-center py-4 mt-3">
                        <button className="btn btn-outline-purple" type="submit">
                            Send
                            <MDBIcon far icon="paper-plane" className="ml-2" />
                        </button>
                        </div>
                    </form>
                    
                    <div>
                        <h1>Comments</h1>
                                 <div>
                                 {comments.length > 0 ? (comments.map((comment)=>{
                                return <h6>💬{comment.User.firstName} {comment.User.lastName}: {comment.content}</h6> 
                                })) : "No comments"} 
                                 </div>
                                 
                    </div>
                    </MDBCol>
                </MDBRow>
          
             
      
      </MDBContainer>

        </div>

        <Footer />
        </>
    )
}
