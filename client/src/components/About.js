import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdbreact';
import React from 'react';
import '../styles/about.css'
import Footer from './Footer';
import Navbar from './Navbar';
import Alessandra from '../images/Alessandra.JPG';
import Derek from '../images/Derek.png';
import Pete from '../images/Pete.jpeg';
import Heeyoung from '../images/Heeyoung.jpg';
import Jacky from '../images/Jacky.jpg';

export default function About() {
    return (
        <div>
            <Navbar />
            <MDBContainer className="about-container">
          
            <h1 className='text-center  about-title'>Meet the <span className="fetch">fetch</span><span className="mate">Mate</span> team</h1>
            <p className='text-center w-responsive mx-auto under-title'>
            These are the people that make the magic happen. Get to know our team of awesome talent.
            </p>
            <MDBRow className='mb-lg-4 text-center text-md-left mt-5'>
              <MDBCol lg='6' md='12' className='mb-4'>
                <MDBCol md='6' className='float-left'>
                  <img
                    className='mx-auto mb-md-0 mb-4 rounded z-depth-1 img-fluid' src={Alessandra} alt='avatar pic'
                  />
                </MDBCol>
                <MDBCol md='6' className='float-right'>
                  <h4>
                    <strong className="alessandra">Alessandra Burckhalter</strong>
                  </h4>
                  <h6 className='font-weight-bold grey-text mb-4'>
                    Front-end Developer
                  </h6>
                  <p className='grey-text'>
                  Bilingual in spoken languages, and multilingual in programming languages.
                  </p>
                  <a href='https://www.linkedin.com/in/alessandra-burckhalter/' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='linkedin'
                      className='p-2 m-2 fa-lg fb-ic'
                    />
                  </a>
                  <a href='https://github.com/alessandraburckhalter' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='github black-text'
                      className='p-2 m-2 fa-lg git-ic'
                    />
                  </a>
                  <a href="mailto:ale.lptc@gmail.com" className="p-2 fa-lg email-ic">
                <MDBIcon icon="envelope indigo-text" />
                    </a>
                </MDBCol>
              </MDBCol>

              <MDBCol lg='6' md='12' className='mb-4'>
                <MDBCol md='6' className='float-left'>
                  <img
                    tag='img'
                    className='mx-auto mb-md-0 mb-4 rounded z-depth-1 img-fluid'
                    src={Derek}
                    alt='avatar pic'
                  />
                </MDBCol>

                <MDBCol md='6' className='float-right'>
                  <h4>
                    <strong>Derek James</strong>
                  </h4>
                  <h6 className='font-weight-bold grey-text mb-4'>
                    Software Engineer
                  </h6>
                  <p className='grey-text'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur.
                  </p>
                  <a href='https://www.linkedin.com/in/derek-james-40287610b/' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='linkedin'
                      className='p-2 m-2 fa-lg li-ic'
                    />
                  </a>
                  <a href='https://github.com/Derekjames93' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='github black-text'
                      className='p-2 m-2 fa-lg git-ic'
                    />
                  </a>
                  <a href="mailto:derekjames4610@gmail.com" className="p-2 fa-lg email-ic">
                <MDBIcon icon="envelope indigo-text" />
                    </a>
                </MDBCol>
              </MDBCol>
            </MDBRow>

            <MDBRow className='mb-lg-4 text-center text-md-left'>
              <MDBCol lg='6' md='12' className='mb-4'>
                <MDBCol md='6' className='float-left'>
                  <img
                    tag='img'
                    className='mx-auto mb-md-0 mb-4 rounded z-depth-1 img-fluid'
                    src={Heeyoung}
                    alt='avatar pic'
                  />
                </MDBCol>
                <MDBCol md='6' className='float-right'>
                  <h4>
                    <strong>Heeyoung Song</strong>
                  </h4>
                  <h6 className='font-weight-bold grey-text mb-4'>
                    Full-Stack Developer
                  </h6>
                  <p className='grey-text'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur.
                  </p>
                  <a href='https://www.linkedin.com/in/song8179/' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='linkedin'
                      className='p-2 m-2 fa-lg li-ic'
                    />
                  </a>
                  <a href='https://github.com/young8179' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='github black-text'
                      className='p-2 m-2 fa-lg git-ic'
                    />
                  </a>
                  <a href="hsong8179@gmail.com" className="p-2 fa-lg email-ic">
                <MDBIcon icon="envelope indigo-text" />
                    </a>
                </MDBCol>
              </MDBCol>
              <MDBCol lg='6' md='12' className='mb-4'>
                <MDBCol md='6' className='float-left'>
                  <img
                    tag='img'
                    className='mx-auto mb-md-0 mb-4 rounded z-depth-1 img-fluid'
                    src={Pete}
                    alt='avatar pic'
                  />
                </MDBCol>
                <MDBCol md='6' className='float-right'>
                  <h4>
                    <strong>Pete Looney</strong>
                  </h4>
                  <h6 className='font-weight-bold grey-text mb-4'>
                    Software & Industrial Engineer
                  </h6>
                  <p className='grey-text'>
                  Creative problem solver, and lifelong learner eager to use his expertise to resolve real-world issues.
                  </p>
                  <a href='https://www.linkedin.com/in/peter-looney-27b732166/' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='linkedin'
                      className='p-2 m-2 fa-lg tw-ic'
                    />
                  </a>
                  <a href='https://github.com/plooney81' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='github black-text'
                      className='p-2 m-2 fa-lg li-ic'
                    />
                  </a >
                  <a href="mailto:petelooney81@gmail.com" className="p-2 fa-lg email-ic">
                <MDBIcon icon="envelope indigo-text" />
                    </a>
                </MDBCol>
              </MDBCol>
            </MDBRow>

            <MDBRow className='mb-lg-4 text-center text-md-left'>
              <MDBCol lg='6' md='12' className='mb-4'>
                <MDBCol md='6' className='float-left'>
                  <img
                    tag='img'
                    className='mx-auto mb-md-0 mb-4 rounded z-depth-1 img-fluid'
                    src={Jacky}
                    alt='avatar pic'
                  />
                </MDBCol>
                <MDBCol md='6' className='float-right'>
                  <h4>
                    <strong>Jacky Cheung</strong>
                  </h4>
                  <h6 className='font-weight-bold grey-text mb-4'>
                    Software Engineer
                  </h6>
                  <p className='grey-text'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eos id officiis hic tenetur.
                  </p>
                  <a href='https://www.linkedin.com/in/jacky-cheung-a69768195/' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='linkedin'
                      className='p-2 m-2 fa-lg li-ic'
                    />
                  </a>
                  <a href='https://github.com/JC-2020' target='_blank' rel="noopener noreferrer">
                    <MDBIcon
                      fab
                      icon='github black-text'
                      className='p-2 m-2 fa-lg git-ic'
                    />
                  </a>
                  <a href="mailto:jackycheung74@gmail.com" className="p-2 fa-lg email-ic">
                <MDBIcon icon="envelope indigo-text " />
                    </a>
                </MDBCol>
              </MDBCol>
              </MDBRow>
        
          </MDBContainer>

    <Footer />
        </div>
    )
}
