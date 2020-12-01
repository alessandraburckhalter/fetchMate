import { MDBCard, MDBCardText, MDBCardTitle, MDBCol, MDBRow } from 'mdbreact'
import React, {  useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

export default function IndividualProject({ project }) {
    const user = useSelector(state => state.user)
    // !! makes it a boolean
    const isMember = !!(project.Members.find(member => {
        return member.id === user.loginInfo.id
    }))
    const isOwner = project.User.id === user.loginInfo.id

    const [applied, setApplied] = useState(isMember)

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


    return (
        <div>
            <div key={project.id}>

                <MDBRow>

                    <MDBCol >
                        <MDBCard className="card-body" style={{ marginTop: "1rem" }}>
                            <MDBCardTitle><Link to="/interested">{project.title}</Link></MDBCardTitle>
                            <MDBCardText>
                                {project.description} {isOwner && '(owner)'}
                            </MDBCardText>
                            <MDBCardText>
                                Skills wanted: displays skills here
                            </MDBCardText>
                            <MDBCardText>
                                Acceptable spoken languages: displays languages here
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

                                    {
                                        isOwner ?
                                        <button className="inactive">
                                                You own this Project
                                        </button>
                                        :
                                        applied ?                                
                                            <button className="inactive" disabled>
                                                Applied to this project!
                                            </button>
                                            
                                            :
                                            <button className="participate-button" onClick={applyProject}>
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
                        </MDBCard>
                        {/* ============================================================================================== */}
                    </MDBCol>
                </MDBRow>
            </div>
        </div>
    )
}
