import { MDBCard, MDBCardText, MDBCardTitle, MDBCol, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBRow } from 'mdbreact'
import React, {  useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export default function IndividualProjectPublic({ project }) {
    const user = useSelector(state => state.user)
    // !! makes it a boolean
    
    

 

    const [modal, setModal] = useState(false);

   
    const applyProject = (e) => {
        alert("You need to login")
    }

    // Modal
    const toggle = () => {
        setModal(!modal);
    }

    return (
        <div>
            <div key={project.id}>

                <MDBRow>

                    <MDBCol >
                        <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
                            <MDBCardTitle><Link to="/interested">{project.title} </Link></MDBCardTitle>
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
                                Technical
                                {project.Skills.filter(skill => skill.category === 'technical').map((skill) => {
                                    console.log(skill)
                                    return <li>{skill.name}</li>
                                    
                                })}
                                Soft Skills
                                {project.Skills.filter(skill => skill.category === 'soft').map((skill) => {
                                    console.log(skill)
                                    return <li>{skill.name}</li>
                                    
                                })}
                            </MDBCardText>
                            <MDBCardText>
                                Acceptable Spoken languages
                                {project.Skills.filter(skill => skill.category === 'language').map((skill) => {
                                    console.log(skill)
                                    return <li>{skill.name}</li>
                                    
                                })}
                            </MDBCardText>
                            <div className="flex-row ">
                                <a href="#!" className="card-link">
                                    Status:{project.isCompleted === false ? ' open' : ' closed'}
                                </a>
                                <a href="#!" className="card-link">Published: {Object.keys(project).length > 0 && project.publishedAt.slice(0, 10)}
                                </a>
                                {/* //todo GET PROJECT OWNER NAME ONTO CARD */}
                                <a href="#!" className="card-link">Project Owner:{project.User.firstName} {project.User.lastName}
                                </a>
                                <a href="#!" className="card-link">Member Limit:{project.memberLimit}
                                </a>
                                <div>

                                    
                                        
                                            <button className="participate-button" onClick={applyProject}>
                                                I want to be part of this project
                                            </button>
                                    

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
                        </MDBCard>
                        {/* ============================================================================================== */}
                    </MDBCol>
                </MDBRow>
            </div>
        </div>
    )
}
