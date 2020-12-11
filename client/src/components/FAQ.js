import { MDBCard, MDBCardBody, MDBCollapse, MDBContainer, MDBIcon } from 'mdbreact';
import React, { useState } from 'react';
import Navbar from './Navbar';
import '../styles/faq.css';
import Footer from './Footer'
import NavbarPublic from './NavbarPublic';
import { useSelector } from 'react-redux';
import ScrollToTop from './ScrollToTop';
import { Link } from 'react-router-dom';

export default function FAQ() {
    const [collapseID, setCollapseID] = useState(null)

    const toggleCollapse = newCollapseID => () => {
      if (collapseID === newCollapseID) {
          setCollapseID(null)
      } else {
          setCollapseID(newCollapseID)
      }
    }

    const user = useSelector(state => state.user);


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
        <MDBContainer className="faq-container ">
            <h1 className="faq-title">Frequently <span className="green-color">asked</span> questions <i class="fas fa-comment-alt"></i></h1>
      <MDBContainer className="mb-5">
          <h1 className="faq-container-title"><MDBIcon  icon="question-circle blue-text" /> Questions you may have</h1>
          <h2 className="faq-subtitle">Click below for responses to frequently asked questions.</h2>
          <MDBCard className=" card-faq">
          <button className="faq-button" onClick={toggleCollapse("collapse1")}>
             <i
              className={
                collapseID === "collapse1"
                  ? "fa fa-angle-down "
                  : "fa fa-angle-right"
              }
            /> What is fetchMate?
          </button>
          <MDBCollapse className="" id="collapse1" isOpen={collapseID}>
            <MDBCardBody className="">
            fetchMate is a project hosting application built to help programmers find team members with specific development skills. Users can host a new project, join current projects, chat with team members, and even comment on different projects. It was built by developers for developers.
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
        <hr className="hr-faq" />

        <MDBCard className="mt-3 card-faq">
          <button className="faq-button" onClick={toggleCollapse("collapse10")}>
             <i
              className={
                collapseID === "collapse10"
                  ? "fa fa-angle-down "
                  : "fa fa-angle-right"
              }
            /> How do I create a fetchMate account?
          </button>
          <MDBCollapse className="" id="collapse10" isOpen={collapseID}>
            <MDBCardBody className="">
            Creating a fetchMate account is very easy. On our main page, just click on “create an account” button and fill out the form with the requested information. After that, just login. Easy, right? Then, let's go! Click <Link to="/register">here</Link> to create your fetchMate account.
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
        <hr className="hr-faq" />

        <MDBCard className="mt-3 card-faq">
          <button className="faq-button" onClick={toggleCollapse("collapse2")}>
             <i
              className={
                collapseID === "collapse2"
                  ? "fa fa-angle-down "
                  : "fa fa-angle-right"
              }
            /> How do I log into my fetchMate account?
          </button>
          <MDBCollapse id="collapse2" isOpen={collapseID}>
            <MDBCardBody>
            To login to your fetchMate account, just access our main page and fill in the login form with the registered email and password.
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
        <hr className="hr-faq" />

        <MDBCard className="mt-3 card-faq">
          <button className="faq-button" onClick={toggleCollapse("collapse3")}>
             <i
              className={
                collapseID === "collapse3"
                  ? "fa fa-angle-down "
                  : "fa fa-angle-right"
              }
            /> How do I change or reset my password?
          </button>
          <MDBCollapse id="collapse3" isOpen={collapseID}>
            <MDBCardBody>
              If you need to reset your password the first step is to go to the home page and select the option that states "forgot password". When this is clicked it will route you to the password reset page which will then prompt you to enter your email associated with the account. This will send a hyperlink to the email submitted and when clicked it will prompt you to change your password and also confirm the change. After your password has been entered you may then login with the newly created password. If you do not receive the email please check your different mailboxes as the email may be in the spam folder. This token will expire in three hours before you need to request a new one.
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
        <hr className="hr-faq" />

        <MDBCard className="mt-3 card-faq">
          <button className="faq-button" onClick={toggleCollapse("collapse4")}>
             <i
              className={ 
                collapseID === "collapse4"
                  ? "fa fa-angle-down "
                  : "fa fa-angle-right"
              }
            /> How do I publish a project?
          </button>
          <MDBCollapse id="collapse4" isOpen={collapseID}>
            <MDBCardBody>
            To publish a project just click on the option "publish a new project" available on your dashboard or through the navigation bar under "projects" choose the option "publish a project". After that, you will be redirected to fill out a form with your project information. When you click on "publish project" it will became visible on your dashboard and also on the "see all projects" page for everyone on the platform to see it.
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
        <hr className="hr-faq" />

        <MDBCard className="mt-3 card-faq">
          <button className="faq-button" onClick={toggleCollapse("collapse5")}>
             <i
              className={ 
                collapseID === "collapse5"
                  ? "fa fa-angle-down "
                  : "fa fa-angle-right"
              }
            /> How do I search for projects?
          </button>
          <MDBCollapse id="collapse5" isOpen={collapseID}>
            <MDBCardBody>
            You can search for projects on the "see all projects" page. If you want, you can sort your search for your skills or for the most recently published projects. 
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
        <hr className="hr-faq" />

        <MDBCard className="mt-3 card-faq">
          <button className="faq-button" onClick={toggleCollapse("collapse6")}>
             <i
              className={ 
                collapseID === "collapse6"
                  ? "fa fa-angle-down "
                  : "fa fa-angle-right"
              }
            /> I'm interested in a project. How can I aplly to work on it?
          </button>
          <MDBCollapse id="collapse6" isOpen={collapseID}>
            <MDBCardBody>
            If you saw a project that piqued your interest, just click on the option "I want to be part of this project". Your application will be sent to the project owner for evaluation. You can also check all the projects you have applied for in your dashboard in the "pending projects" section.
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
        <hr className="hr-faq" />

        <MDBCard className="mt-3 card-faq">
          <button className="faq-button" onClick={toggleCollapse("collapse7")}>
             <i
              className={ 
                collapseID === "collapse7"
                  ? "fa fa-angle-down "
                  : "fa fa-angle-right"
              }
            /> How can I updated my personal information and profile picture?
          </button>
          <MDBCollapse id="collapse7" isOpen={collapseID}>
            <MDBCardBody>
            To update your information just click on the "edit profile" option on your dashboard or in the navigation bar on the user icon. Your profile photo can be changed either on the dashboard or via the "edit profile" page, just click on the camera icon under your current profile photo.
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
        <hr className="hr-faq" />

        <MDBCard className="mt-3 card-faq">
          <button className="faq-button" onClick={toggleCollapse("collapse8")}>
             <i
              className={ 
                collapseID === "collapse8"
                  ? "fa fa-angle-down "
                  : "fa fa-angle-right"
              }
            /> How can I see who applied to work on my project?
          </button>
          <MDBCollapse id="collapse8" isOpen={collapseID}>
            <MDBCardBody>
            You can view all the projects you have applied for in your dashboard in the "pending projects" section. You can also see the projects you’ve published and are contributing to.
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
        <hr className="hr-faq" />

        <MDBCard className="mt-3 card-faq">
          <button className="faq-button" onClick={toggleCollapse("collapse9")}>
            <i
              className={ 
                collapseID === "collapse9"
                  ? "fa fa-angle-down "
                  : "fa fa-angle-right "
              }
            />  How can I delete my account?
          </button>
          <MDBCollapse id="collapse9" isOpen={collapseID}>
            <MDBCardBody>
              You can delete your account on the "edit profile" page.
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
        <hr className="hr-faq" />
            <h3 className="faq-contact-us"><MDBIcon icon="info-circle " /> Couldn't find an answer to your question? Please contact us at <a href="mailto:fetchmate.contact@gmail.com"><span className="email-faq">fetchmate.contact@gmail.com</span></a>.</h3> 
      </MDBContainer>
    </MDBContainer>

    <Footer />
    </>
    )
}
