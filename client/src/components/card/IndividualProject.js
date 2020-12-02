import { MDBCard, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader, MDBRow } from 'mdbreact'
import React, {  useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function IndividualProject({ project }) {
    const user = useSelector(state => state.user)
    // !! makes it a boolean
    const isMember = !!(project.Members.find(member => {
        return member.id === user.loginInfo.id
    }))
    const isOwner = project.User.id === user.loginInfo.id

    const [applied, setApplied] = useState(isMember)

    const [modal, setModal] = useState(false);

    const cancelApply = () =>{
        fetch(`/api/v1/projects/${project.id}/teamMember`, {
            method: 'DELETE',
            body: JSON.stringify({
                memberIdArray: user.loginInfo.id
            }),
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setApplied(false) 
            })    
    }
    const applyProject = (e) => {
        console.log(user)
        fetch(`/api/v1/projects/${project.id}/teamMember`, {
            method: 'POST',
            body: JSON.stringify({
                memberIdArray: user.loginInfo.id
            }),
            headers: {
                Accept: "application/json",
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setApplied(true) 
            })
    }

    // Modal
    const toggle = () => {
        setModal(!modal);
    }

    return (
        <div>
            <div key={project.id}>

                <MDBRow>
                    <MDBCol className="individual-col">
                    
                        <MDBCard className="card-body card-body-all-projects1 mb-5" >
                        <aside>
    
                            </aside>
                            <MDBCard className="card-body card-body-all-projects2">
                            <aside>
                            <MDBCardTitle className="project-title"><Link className="project-tilte" to="/interested"><MDBIcon icon="link" /> {project.title} </Link></MDBCardTitle>
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
                                <h1 className="all-prjects-skills-title">Desirable Technical Skills</h1> 
                                {project.Skills.filter(skill => skill.category === 'technical').map((skill) => {
                                    console.log(skill)
                                    return <span className="all-projects-skills">{skill.name}</span>
                                    
                                })}<br/><br/>
                                <h1 className="all-prjects-skills-title">Desirable Soft Skills</h1>
                                {project.Skills.filter(skill => skill.category === 'soft').map((skill) => {
                                    console.log(skill)
                                    return <span className="all-projects-skills">{skill.name}</span>
                                    
                                })}<br/><br/>
                            </MDBCardText>
                            <MDBCardText>
                            <h1 className="all-prjects-skills-title">Acceptable Spoken languages</h1>
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
                                <a href="#!" className="card-link icon icon-all-projects-width"><MDBIcon icon="calendar-alt deep-purple-text" /> {Object.keys(project).length > 0 && project.publishedAt.slice(0, 10)} <span>Deadline</span>
                                </a>
                                {/* //todo GET PROJECT OWNER NAME ONTO CARD */}
                                <a href="#!" className="card-link icon icon-all-projects-width"><MDBIcon icon="user-alt black-text" /> {project.User.firstName} {project.User.lastName} <span>Project owner</span>
                                </a>
                                <a href="#!" className="card-link icon icon-all-projects-width"><MDBIcon icon="users indigo-text" /> {project.memberLimit} <span>Member's limit</span> 
                                </a>
                                <div>

                                    {
                                        isOwner ?
                                        <button className=" inactive-own">
                                                You own this project
                                        </button>
                                        :
                                        applied ?
                                        <>                                
                                            <button className="inactive-applied" disabled>
                                                You applied to this project 
                                            </button>
                                            <button className='btn  cancel-application' onClick={cancelApply}>Cancel application</button>
                                        </>    
                                            :
                                            <button className=" participate-button" onClick={applyProject}>
                                                I want to be part of this project
                                            </button>
                                    }

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
