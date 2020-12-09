import React, {  useEffect, useState } from 'react';
import Navbar from './Navbar'
import Footer from './Footer'
import { MDBCard, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBRow, MDBPageItem, MDBPagination, MDBPageNav  } from 'mdbreact';
import { Link, useParams } from 'react-router-dom';
import '../styles/comments.css'
import CommentList from './card/CommentList';

import userPic from '../images/user.jpg';
import ScrollToTop from './ScrollToTop';


export default function Comments() {
    const { projectId } = useParams()

    const [comments, setComments] = useState([])
    const [content, setContent] = useState("")
    const [project, setProject] = useState("")


  
    
    const [modal, setModal] = useState(false);
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
        //? Dependency doesn't depend on loadComments because we simply want to run the load comments when the component is rendered
        //? And we end up passing the loadComments function as a prop to be used elsewhere.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
            <ScrollToTop />
            <Navbar />
            <MDBContainer md="12" className="projects-container">
            <h1 className="faq-title">Discussion <span className="green-color">Forum</span></h1>

                <MDBRow>
                    <MDBCol className="comments-col">
                            <MDBCard className="card-body card-comments">
                            <div className="d-block d-md-flex mt-4">
                            <img className="card-img-64 d-flex  mb-3" src={userPic} alt="" />
                            <div className="text-center text-md-left ml-md-3 ml-0">
                            <h5 className="font-weight-bold mt-0 full-name-comments">
                            {Object.keys(project).length > 0 && project.User.firstName} {Object.keys(project).length > 0 && project.User.lastName}  <br/> {Object.keys(project).length > 0 && project.User.title}
                                </h5>
                                </div>
                                </div>
                                <br />
                            <MDBCardTitle className="project-title"><Link className="project-tilte" to="/interested"><i className="fas fa-bookmark amber-text"></i>  {project&& project.title} </Link></MDBCardTitle>
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
                            <p className="all-prjects-skills-title"><i className="fas fa-angle-right"></i> Desirable Soft Skills</p>
                            {Object.keys(project).length > 0 && project.Skills.filter((userData) => (userData.category === "soft")).map((name) => {
                                return <span className="all-projects-skills">{name.name}</span>
                            })}
                            </MDBCardText>
                            <MDBCardText>
                                <p className="all-prjects-skills-title"><i className="fas fa-angle-right"></i> Desirable Technical Skills</p> 
                                {Object.keys(project).length > 0 && project.Skills.filter((userData) => (userData.category === "technical")).map((name) => {
                                    return <span className="all-projects-skills">{name.name}</span>
                                })}
                            </MDBCardText>
                            <MDBCardText>
                            <p className="all-prjects-skills-title"><i className="fas fa-angle-right"></i> Acceptable Spoken languages</p>
                            {Object.keys(project).length > 0 && project.Skills.filter((userData) => (userData.category === "language")).map((name) => {
                                return <span className="all-projects-skills">{name.name}</span>
                            })}
                            </MDBCardText>
                            <br/>
                            <div className="flex-row ">
                                <a href="#!" className="card-link icon icon-all-projects-width">
                                </a>
                                <a href="#!" className="card-link icon icon-all-projects-width"><MDBIcon icon="calendar-alt deep-purple-text" /> {Object.keys(project).length > 0 && project.publishedAt.slice(0, 10)}     <span>Deadline</span>
                                </a>                              
                                <a href="#!" className="card-link icon icon-all-projects-width"><MDBIcon icon="users indigo-text" /> {project.memberLimit} <span>Max. members</span> 
                                </a>
                            </div>
                        </MDBCard>

                        <MDBContainer className="mt-5">
                            <div className="border-0 font-weight-bold">
                            <p className="mr-4 mb-0">Comments</p>
                            </div>
                            {comments.length > 0 ? (comments.map((comment)=>{
                                return <>
                                    <CommentList key={comment.id} comment={comment} loadComments={loadComments}/>
                                </> 
                            })) : "No comments"} 
                        </MDBContainer>
                    <MDBContainer>
                        <form onSubmit={commentHandle}>
                            <MDBContainer>
                                <div className="d-block  mt-4">
                                    <div className="text-center text-md-left ml-md-3 ml-0">
                                        <div className="form-group mt-4">
                                            <label htmlFor="quickReplyFormComment">Your comment</label>
                                            <textarea className="form-control" id="quickReplyFormComment" value={content} rows="5" onChange={(e) => {setContent(e.target.value)}}></textarea>
                                            <div className="text-center my-4">
                                                <button className="btn btn-primary" size="sm" >Post</button>
                                            </div>
                                        </div>
                                        <div className="d-block  mt-4">
                                            <div className="text-center text-md-left ml-md-3 ml-0">
                                            </div>
                                        </div>
                                    </div>
                                </div>            
                            </MDBContainer>
                        </form>

                        <MDBPagination className="d-flex justify-content-center mt-5">
                        <MDBPageItem disabled>
                            <MDBPageNav>
                            <span>First</span>
                            </MDBPageNav>
                        </MDBPageItem>
                        <MDBPageItem disabled>
                            <MDBPageNav aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                            <span className="sr-only">Previous</span>
                            </MDBPageNav>
                        </MDBPageItem>
                        <MDBPageItem active>
                            <MDBPageNav>
                            1 <span className="sr-only">(current)</span>
                            </MDBPageNav>
                        </MDBPageItem>
                        <MDBPageItem>
                            <MDBPageNav>
                            &raquo;
                            </MDBPageNav>
                        </MDBPageItem>
                        <MDBPageItem>
                            <MDBPageNav>
                            Last
                            </MDBPageNav>
                        </MDBPageItem>
                        </MDBPagination>
                    </MDBContainer>   
                    </MDBCol>
                </MDBRow>
        </MDBContainer>
        <Footer />
        </>
    )
}
