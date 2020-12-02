import React, { useEffect, useState } from 'react'
import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdbreact'
import '../styles/publicProfile.css'
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer'
import { useSelector } from 'react-redux';

export default function PublicProfile() {
  const { pendingId } = useParams()
  const [project, setProject] = useState([])
  const [owner, setOwner] = useState([])
  const user = useSelector(state => state.user);

  useEffect(() => {
    fetch(`/api/v1/projects/${pendingId}`)
      .then(res => res.json())
      .then(result => {
        setProject(result)
      })
      .catch(e => {
        console.log(e)
      })
    fetch(`/api/v1/hub/user/${project.owner}`)
      .then(res => res.json())
      .then(data => {
        setOwner(data)
        console.log(data)
      })
    
  }, [project.owner, pendingId])
  
    return (
      <>
      <Navbar />
        <div id="top">
            <MDBContainer>
              <MDBRow>
            <MDBCol  className="mt-5">
        <MDBCard testimonial className="card-profile card-public-profile">
        <div gradient='aqua' backgroundColor="red"/>
          <div className=''>
          <img
              src={owner.profilePicture} 
              alt='' className="rounded-circle hoverable border border-info public-profile" 
            />
          </div><br/>
          
          <MDBCardBody>
          <h2 className='card-title-public'> <MDBIcon icon="user indigo-text" /> {owner.firstName} {owner.lastName} </h2> <br/>
          <h2 className='card-title-public'><MDBIcon far icon="newspaper" /> {owner.title}</h2> 

          <br/>
          <hr />    
          <br/>

            <h4 class="card-title-public">
            <MDBIcon icon="cogs grey-text" /> Technical Skills <br/> {Object.keys(owner).length > 0 && owner.Skills.filter((userData)=>{
                return (userData.category === "technical")
                
              }).map((name)=>{
                return <span className="skills-dashboard">{name.name}</span>
              })}</h4><br/><br/>

          <h4 class="card-title-public">
            <MDBIcon icon="hand-holding-heart pink-text"/> Soft Skills <br/> {Object.keys(owner).length > 0 && owner.Skills.filter((userData)=>{
                return (userData.category === "soft")
                
              }).map((name)=>{
                return <span className="skills-dashboard">{name.name}</span>
              })}</h4> <br/><br/>


          <h4 class="card-title-public">
            <MDBIcon icon="language purple-text" /> Spoken languages <br/> {Object.keys(owner).length > 0 && owner.Skills.filter((userData)=>{
                return (userData.category === "language")
                
              }).map((name)=>{
                return <span className="skills-dashboard">{name.name}</span>
              })}</h4>
              </MDBCardBody>
        </MDBCard>
     </MDBCol>
      </MDBRow>
      </MDBContainer>
        </div>
        <Footer />
      </>
    )
}
