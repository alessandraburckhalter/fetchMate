import React, {  useEffect, useState } from 'react';
import Navbar from './Navbar'
import Footer from './Footer'
import { MDBCard, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBRow } from 'mdbreact';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/comments.css'
import CommentList from './card/CommentList';
import RichTextEditor from './RichTextEditor';


export default function Comments() {
    const { projectId } = useParams()
    const user = useSelector(state => state.user)
    const [comments, setComments] = useState([])
    const [content, setContent] = useState("")
    const [project, setProject] = useState("")

    const [commentEdit, setCommentEdit] = useState("")

  
    
    const [modal, setModal] = useState(false);
     // Modal
     const toggle = () => {
        setModal(!modal);
    }
    const [modalForComment, setModalForComment] = useState(false);
    const toggleForComment = () => {
        setModalForComment(!modalForComment);
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


    const loadComments = () =>{


        fetch(`/api/v1/projects/${projectId}/comments`)
            .then(res=>res.json())
            .then(data=>{
                setComments(data)
            })
            fetch(`/api/v1/projects/${projectId}`)
            .then(res=>res.json())
            .then(data=>{
                setProject(data)
            })

    }
    useEffect(()=>{
        loadComments()

    },[projectId])

    return (
        <>
            <Navbar />
            <div id="section1" className="background">
            <div className="layer">
            <h1 className="faq-title">Discussion Forum</h1>
            </div>
        </div>
            <MDBContainer md="12" className="projects-container">

                <MDBRow>
                    <MDBCol className="comments-col">
                    
                        {/* <MDBCard className="card-body card-body-all-projects1 mb-5" >
                        <aside>
    
                            </aside> */}
                            <MDBCard className="card-body ">
                            {/* <aside> */}
                            <MDBCardTitle className="project-title"><Link className="project-tilte" to="/interested"><MDBIcon icon="link" /> {project&& project.title} </Link></MDBCardTitle>
                            <MDBCardText>
                            {project&& project.description.slice(0, 90)}
                            {(project&& project.description.length > 90 && "...")}<Link to="#" onClick={toggle}>Read More</Link> 
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
                                          
                                            <br /><br />
                                            <h1 className="all-prjects-skills-title">Desirable Soft Skills</h1>
                                {Object.keys(project).length > 0 && project.Skills.filter((userData) => {
                                                return (userData.category === "soft")

                                            }).map((name) => {
                                                return <span className="all-projects-skills">{name.name}</span>
                                            })}
                                            
                                            
                            </MDBCardText>
                            <MDBCardText>
                                <h1 className="all-prjects-skills-title">Desirable Technical Skills</h1> 
                                {Object.keys(project).length > 0 && project.Skills.filter((userData) => {
                                                    return (userData.category === "technical")

                                                }).map((name) => {
                                                    return <span className="all-projects-skills">{name.name}</span>
                                                })}
                                    
                            </MDBCardText>
                            <MDBCardText>
                            <h1 className="all-prjects-skills-title">Acceptable Spoken languages</h1>
                            {Object.keys(project).length > 0 && project.Skills.filter((userData) => {
                                                return (userData.category === "language")

                                            }).map((name) => {
                                                return <span className="all-projects-skills">{name.name}</span>
                                            })}
                            </MDBCardText>

                            <br/>
                            <div className="flex-row ">
                                <a href="#!" className="card-link icon icon-all-projects-width">
                                 {/* {project.isCompleted === false ? 
                                 (<><MDBIcon icon="lock-open green-text" /> Available</>) : 
                                 (<><MDBIcon icon="lock black-text" /> Unavailable</>)} <span>Project Status</span> */}
                                </a>
                                <a href="#!" className="card-link icon icon-all-projects-width"><MDBIcon icon="calendar-alt deep-purple-text" /> 
                                {Object.keys(project).length > 0 && project.publishedAt.slice(0, 10)} <span>Deadline</span>
                                </a>
                                {/* //todo GET PROJECT OWNER NAME ONTO CARD */}
                                <a href="#!" className="card-link icon icon-all-projects-width"><MDBIcon icon="user-alt black-text" /> 
                                {Object.keys(project).length > 0 && project.User.firstName} {Object.keys(project).length > 0 && project.User.lastName} <span>Project owner</span>
                                </a>
                                <a href="#!" className="card-link icon icon-all-projects-width"><MDBIcon icon="users indigo-text" /> 
                                {project.memberLimit} <span>Member's limit</span> 
                                </a>
                            </div>
                            {/* </aside>
                            </MDBCard> */}
                        </MDBCard>

                        <MDBContainer className="mt-5">
                        <h1 className="mb-5">Comments </h1>
                       
                                
                                 {comments.length > 0 ? (comments.map((comment)=>{
                                return <>
                                    <CommentList key={comment.id} comment={comment} loadComments={loadComments}/>
                                </> 
                                })) : "No comments"} 
                                
                                  
                                 </MDBContainer>
                        

                        <form onSubmit={commentHandle}>
                
                        <label htmlFor="defaultFormCardNameEx" className="grey-text font-weight-light">
                       Leave a comment about this project 
                        </label>

                        <div className="input-group">
                            <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon">
                                    <i className="fas fa-pencil-alt prefix"></i>
                                    </span>
                                </div>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => {setContent(e.target.value)}}></textarea>
                            </div>
                            
                            <div className="text-center py-4 mt-3">
                            <button className="btn btn-outline-purple" type="submit">
                                Send
                                <MDBIcon far icon="paper-plane" className="ml-2" />
                            </button>
                            </div>

                    
                    </form>

                    {/* <RichTextEditor /> */}
                    
                   
                    </MDBCol>
                </MDBRow>
          
             
      
      </MDBContainer>

       

        <Footer />
        </>
    )
}
