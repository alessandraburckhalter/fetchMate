import { MDBCard, MDBCardText, MDBCardTitle, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBPageItem, MDBPagination, MDBPageNav  } from 'mdbreact'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import '../styles/projects.css'
import IndividualProject from './card/IndividualProject'
import IndividualProjectPublic from './card/IndividualProjectPublic'
import Navbar from './Navbar';
import Footer from './Footer'
import NavbarPublic from './NavbarPublic'
import ScrollToTop from './ScrollToTop'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const user = useSelector(state => state.user)

  const loadProject = () =>{
    fetch('/api/v1/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
      })
  }
  useEffect(() => {
    loadProject()
  }, [])
  
  //* Loop over each projects skills and compare them to the user skills
  //* Return the projects that match from highest to lowest
  const sortBySkills = () => {
    fetch('/api/v1/projects/special')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setProjects(data)
    })
  }

  //* Looks at the number of comments for a project, and returns the projects sorted
  //* from highest # of comments to lowest number of comments
  const sortByPopular = () => {
    const popularSort = projects.sort((a, b) => {
      return b.Comments.length - a.Comments.length
    })
    console.log(popularSort)
  }

  //* Simply makes a query that will include all of the projects in the db...
  //* Both incomplete and complete 
  //TODO
  // const includeAllProjects = () => {
  //   fetch('/api/v1/projects?includeCompleted=true')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProjects(data)
  //     })
  // }



  return (
    <>
    <ScrollToTop />
      {user.loginInfo === null ? (
        <NavbarPublic />
      ) 
      : (
        <Navbar />
      )}
      {/* <div id="section1" className="background">
            <div className="layer">
            </div>
        </div> */}
        <div id="top">
          <MDBContainer className="projects-container">
            <h1 className="all-projects-title"><span className="green-color">All</span> Projects </h1>
          {/* <h1 className="all-projects-title">Projects</h1> */}
              <MDBCard className="mb-2 pt-2 mt-5 flex-row justify-content-around">
                  <a href="#!" className="card-link icon icon-all-projects-width">
                    <MDBIcon icon="cogs" onClick={sortBySkills}/><span>Sort by your skills</span>
                  </a>
                  {/* <a href="#!" className="card-link icon icon-all-projects-width">
                    <MDBIcon icon="fire" onClick={sortByPopular}/> <span>Sort by popular projects</span> 
                  </a> */}
                  <a href="#!" className="card-link icon icon-all-projects-width">
                    <MDBIcon icon="certificate" onClick={loadProject}/> <span>Sort by newest projects</span> 
                  </a>
                  {/* <a href="#!" className="card-link icon icon-all-projects-width">
                    <MDBIcon icon="check-double" onClick={includeAllProjects}/> <span>Include completed projects</span> 
                  </a> */}
              </MDBCard>
            {user.loginInfo ? (projects.map((project) => {
        return (
          <IndividualProject key={project.id} project={project} loadProject={loadProject}/>
            
        );
      })) : (projects.map((project) => {
        return (
          <IndividualProjectPublic key={project.id} project={project} />
            
        );
      }))} 

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
      </div>

      <Footer />
    </>
  )
}
