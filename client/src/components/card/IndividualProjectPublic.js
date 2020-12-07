import { MDBCard, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBRow } from 'mdbreact'
import React, {  useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import userPic from '../../images/user.jpg'

export default function IndividualProjectPublic({ project }) {
    const user = useSelector(state => state.user)
    // !! makes it a boolean
    
    
    const [modal, setModal] = useState(false);

    // Modal
    const toggle = () => {
        setModal(!modal);
    }

    return (
        <div>
            <div key={project.id}>

                <MDBRow>

                    <MDBCol >
                        <MDBCard className="card-body card-body-all-projects1 mb-5">

                        <aside>
    
                        </aside>
                        <MDBCard className="card-body card-body-all-projects2">
                        <div className="d-block d-md-flex mt-4">
          <img className="card-img-64 d-flex  mb-3" src={userPic} alt="" />
          <div body className="text-center text-md-left ml-md-3 ml-0">
          <h5 className="font-weight-bold mt-0 full-name-comments">
          {project.User.firstName} {project.User.lastName} <br/> {project.User.title}
            </h5>
              </div>
              </div>
              <br />
                        <aside>
                            <MDBCardTitle className="project-title"><Link className="project-tilte" to="/interested"><i class="fas fa-bookmark amber-text"></i>   {project.title} </Link></MDBCardTitle>
                            <MDBCardText>
                                {project.description.slice(0, 90)}{(project.description.length > 90 && "...")} <Link to="#" onClick={toggle}>Read More</Link> 
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
                            <h1 className="all-prjects-skills-title"><i class="fas fa-angle-right"></i> Desirable Technical Skills</h1>
                                {project.Skills.filter(skill => skill.category === 'technical').map((skill) => {
                                    console.log(skill)
                                    return <span className="all-projects-skills">{skill.name}</span>
                                    
                                })}<br/><br/>
                                <h1 className="all-prjects-skills-title"><i class="fas fa-angle-right"></i> Desirable Soft Skills</h1>
                                {project.Skills.filter(skill => skill.category === 'soft').map((skill) => {
                                    console.log(skill)
                                    return <span className="all-projects-skills">{skill.name}</span>
                                    
                                })}<br/><br/>
                            </MDBCardText>
                            <MDBCardText>
                            <h1 className="all-prjects-skills-title"><i class="fas fa-angle-right"></i> Acceptable Spoken languages</h1>
                                {project.Skills.filter(skill => skill.category === 'language').map((skill) => {
                                    console.log(skill)
                                    return <span className="all-projects-skills">{skill.name}</span>
                                    
                                })}
                            </MDBCardText>
                            <div className="flex-row ">
                                <a href="#!" className="card-link icon icon-all-projects-width">
                                {project.isCompleted === false ? 
                                 (<><MDBIcon icon="lock-open green-text" /> Available</>) : 
                                 (<><MDBIcon icon="lock black-text" /> Unavailable</>)} <span>Project Status</span>
                                </a>
                                <a href="#!" className="card-link icon icon-all-projects-width"><MDBIcon icon="calendar-alt deep-purple-text"/> {Object.keys(project).length > 0 && project.publishedAt.slice(0, 10)} <span>Deadline</span>
                                </a>
                                {/* //todo GET PROJECT OWNER NAME ONTO CARD */}
                                {/* <a href="#!" className="card-link icon icon-all-projects-width"><MDBIcon icon="user-alt black-text" />  {project.User.firstName} {project.User.lastName} <span>Project owner</span>
                                </a> */}
                                <a href="#!" className="card-link icon icon-all-projects-width"><MDBIcon icon="users indigo-text" /> {project.memberLimit} <span>Max members</span> 
                                </a>
                                <div>

                                    
                                        
                                            <button className="participate-button" onClick={toggle}>
                                                I want to be part of this project
                                            </button><MDBModal isOpen={modal} toggle={toggle}>
                                <MDBModalHeader toggle={toggle}>Privacy Measures</MDBModalHeader>
                                <MDBModalBody>
                            You need to be logged in to apply for projects. <br/> Click <Link to="/">here</Link> to login or <Link to="/signup">here</Link> to create an account.
                            </MDBModalBody>
                            <MDBModalFooter>
                                <button className='btn btn-primary' onClick={toggle}>Close</button>
                            </MDBModalFooter>
                        </MDBModal>
                                    

                                    {/* {   
                                        applied ?                                
                                            <button className="inactive" disabled>
                                                Applied to this project!
                                            </button>
                                            
                                            :
                                            <button className="participate-button" onClick={applyProject}>
                                                I want to be part of this project
                                            </button>
                                    } */}
                                </div>
                            </div>
                            </aside>
                            </MDBCard>
                        </MDBCard>
                        {/* ============================================================================================== */}
                    </MDBCol>
                </MDBRow>
            </div>
        </div>
    )
}
