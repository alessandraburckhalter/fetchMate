
import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardText, MDBCardTitle, MDBContainer, MDBIcon, MDBInput, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from 'mdbreact'
import DatePicker from "react-datepicker";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import SkillSearchBar from '../SkillSearchBar';
import Axios from 'axios';
import { addSkillToSearchArray, clearSearchSkillArray, setSearchSkillArray } from '../../redux/actions';

export default function DashboardProjectCard(props) {
  const { id, owner, description, title, isCompleted, publishedAt, deadline, memberLimit, Skills} = props.project
  const [projectInfo, setProjectInfo] = useState([])
  const [acceptedMember, setAcceptedMember] = useState([])
  //edit project
  const [descriptionEdit, setDescriptionEdit] = useState(description);
  const [publishedAtEdit, setPublishedAtEdit] = useState(new Date(publishedAt));
  const [deadlineEdit, setDeadlineEdit]  = useState(new Date(deadline));
  const [memberLimitEdit, setMemberLimitEdit] = useState(memberLimit);
  
  const dispatch = useDispatch();
  const pickedSkillsArray = useSelector(state => state.searchSkillsToAdd)
  useEffect(() => {
    dispatch(clearSearchSkillArray())
  }, [])

  //? We need this one to get the info for the members
  useEffect(()=>{
    fetch(`/api/v1/projects/${id}`)
      .then(res=>res.json())
      .then(data=>{
        setProjectInfo(data)
      })
    },[id])

  const handleSubmit = () => {
    toggle()
    setDescriptionEdit('');
    setMemberLimitEdit(0);
    const projectSkillsArray = pickedSkillsArray.map(skill => skill.id)
    Axios.patch(`/api/v1/projects/${id}`,{
      description: descriptionEdit,
      publishedAt:publishedAtEdit,
      deadline:deadlineEdit,
      memberLimit:memberLimitEdit,
      projectSkillsArray
    })
      .then(res => {
        console.log(res)
        dispatch(clearSearchSkillArray());
        props.loadProject()
      })
      .catch(e => {
        console.log(e)
      })
  }

    const addAcceptedMember = () =>{
      const acceptMember = projectInfo.Members && projectInfo.Members.filter((acceptedMember)=>{
        return acceptedMember.TeamMember.approved === "approved"
      })
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

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    }
    const handleOpen = () => {
      setModal(true);
      dispatch(setSearchSkillArray(Skills))
    }

    useEffect(()=>{
        addAcceptedMember() 
    },[projectInfo])  
        
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
    <div className="flex-row d-flex">
    <a href="#!" className="card-link icon">
        Status: {isCompleted === false ? "Open" : "Closed"} <span>Project Status</span>
      </a>
      
      <a href="#!" className="card-link icon "><MDBIcon icon="calendar-alt deep-purple-text" />  {deadline.slice(0,10)} <span>Deadline</span>
      </a>
      <a href="#!" className="card-link icon icon-width"><MDBIcon icon="users indigo-text" /> {memberLimit} <span>Member's limit</span> 
      </a>
    
      <a href="#!" className="card-link icon icon-width"><MDBIcon fab icon="gratipay pink-text" /> {Object.keys(projectInfo).length > 0 && projectInfo.Members.length} <span>Applications</span>
      </a>
      <a href="#!" className="card-link icon icon-width"><MDBIcon icon="check-square green-text" /> {acceptedMember && acceptedMember.length }  <span>Approved</span>
      </a>

      <a href="#!" ><button className="card-link icon delete-card icon-width" onClick={ () => removeProject(id)}><MDBIcon icon="trash-restore-alt red-text" /><span>Delete</span> 
      </button></a>
      
              <Link to='#' className="card-link icon edit-card icon-width" onClick={handleOpen}><MDBIcon icon="edit" /><span>Edit</span> </Link>
              <MDBModal isOpen={modal} toggle={toggle}>
                <MDBModalHeader toggle={toggle}>{title}</MDBModalHeader>
                <MDBModalBody>
                <form>
                    <label htmlFor="defaultFormCardNameEx" className="labe-headline"><MDBIcon icon="share indigo-text" /> Describe your project</label>
                    <MDBInput type="textarea" label="Brief description of your project" outline value={descriptionEdit} onChange={(e) => { setDescriptionEdit(e.target.value) }} />

                    <h1 className=" label-skillbar"><MDBIcon icon="share indigo-text" /> What technical skills are you looking for?</h1>
                    <SkillSearchBar category='technical' />
                    <br />

                    <h1 className=" label-skillbar"><MDBIcon icon="share indigo-text" /> What soft skills are you looking for?</h1>
                    <SkillSearchBar category='soft' />
                    <br />

                    <h1 className=" label-skillbar"> <MDBIcon icon="share indigo-text" /> Any language preference?</h1>
                    <SkillSearchBar category='language' /><br />


                    <label htmlFor="defaultFormCardNameEx" className="labe-headline" >
                      How many people will be acceptable for this project?
                    </label>
                    <MDBInput label="Enter number" outline value={memberLimitEdit} onChange={(e) => { setMemberLimitEdit(e.target.value) }} />


                    <label htmlFor="defaultFormCardNameEx" className="labe-headline">
                      What is the deadline for this project?
                    </label>
                    <DatePicker selected={deadlineEdit} onChange={date => setDeadlineEdit(date)} /> <br /> <br />


                    <label htmlFor="defaultFormCardNameEx" className="labe-headline">
                      When would you like to publish this project?
                    </label>
                    <DatePicker selected={publishedAtEdit} onChange={date => setPublishedAtEdit(date)} /><br /> <br />
                  </form>
                </MDBModalBody>
                <MDBModalFooter>
                  <button className='btn btn-primary' onClick={toggle}>Close</button>
                  <button type="button" className='btn btn-secondary' onClick={handleSubmit}>Save Changes</button>
                </MDBModalFooter>
              </MDBModal>

            </div>
          </aside>
        </MDBCard>
      </MDBCard>
    </div>
  )
}
