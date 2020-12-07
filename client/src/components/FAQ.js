import { MDBCard, MDBCardBody, MDBCollapse, MDBContainer, MDBIcon } from 'mdbreact';
import React, { useState } from 'react';
import Navbar from './Navbar';
import '../styles/faq.css';
import Footer from './Footer'
import NavbarPublic from './NavbarPublic';

export default function FAQ() {
    const [collapseID, setCollapseID] = useState(null)

    const toggleCollapse = newCollapseID => () => {
      if (collapseID === newCollapseID) {
          setCollapseID(null)
      } else {
          setCollapseID(newCollapseID)
      }
    }


    return (
        <>
        <NavbarPublic />
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
            /> How do I create a fetchMate account?
          </button>
          <MDBCollapse className="" id="collapse1" isOpen={collapseID}>
            <MDBCardBody className="">
              Pariatur cliche reprehenderit, enim eiusmod high life accusamus
              terry richardson ad squid. 3 wolf moon officia aute, non cupidatat
              skateboard dolor brunch. Food truck quinoa nesciunt laborum
              eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it
              squid single-origin coffee nulla assumenda shoreditch et. Nihil
              anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident. Ad vegan excepteur butcher vice
              lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven&apos;t heard of them
              accusamus labore sustainable VHS.
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
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. 3 wolf moon officia aute, non
              cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
              laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
              on it squid single-origin coffee nulla assumenda shoreditch et.
              Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident. Ad vegan excepteur butcher vice
              lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven&apos;t heard of them
              accusamus labore sustainable VHS.
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
              If you need to reset your password the first step is to go to the home page and select the option that states "forgot password". When this is clicked it will route you to the password reset page which will then prompt you to enter your email associated with the account. This will send a hyperlink to the email submitted and when clicked it will prompt you to change your password and also confirm the change. After your password has been entered you may then login with the newly created password.
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
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. 3 wolf moon officia aute, non
              cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
              laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
              on it squid single-origin coffee nulla assumenda shoreditch et.
              Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident. Ad vegan excepteur butcher vice
              lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven&apos;t heard of them
              accusamus labore sustainable VHS.
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
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. 3 wolf moon officia aute, non
              cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
              laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
              on it squid single-origin coffee nulla assumenda shoreditch et.
              Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident. Ad vegan excepteur butcher vice
              lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven&apos;t heard of them
              accusamus labore sustainable VHS.
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
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. 3 wolf moon officia aute, non
              cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
              laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
              on it squid single-origin coffee nulla assumenda shoreditch et.
              Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident. Ad vegan excepteur butcher vice
              lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven&apos;t heard of them
              accusamus labore sustainable VHS.
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
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. 3 wolf moon officia aute, non
              cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
              laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
              on it squid single-origin coffee nulla assumenda shoreditch et.
              Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident. Ad vegan excepteur butcher vice
              lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven&apos;t heard of them
              accusamus labore sustainable VHS.
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
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. 3 wolf moon officia aute, non
              cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
              laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
              on it squid single-origin coffee nulla assumenda shoreditch et.
              Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident. Ad vegan excepteur butcher vice
              lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven&apos;t heard of them
              accusamus labore sustainable VHS.
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
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. 3 wolf moon officia aute, non
              cupidatat skateboard dolor brunch. Food truck quinoa nesciunt
              laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird
              on it squid single-origin coffee nulla assumenda shoreditch et.
              Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident. Ad vegan excepteur butcher vice
              lomo. Leggings occaecat craft beer farm-to-table, raw denim
              aesthetic synth nesciunt you probably haven&apos;t heard of them
              accusamus labore sustainable VHS.
            </MDBCardBody>
          </MDBCollapse>
        </MDBCard>
        <hr className="hr-faq" />
            <h3 className="faq-contact-us"><MDBIcon icon="info-circle " /> Couldn't find an answer to your question? Please contact us at <a href="mailto:fetchmate2020@gmail.com"><span className="email-faq">fetchmate2020@gmail.com</span></a>.</h3>
      </MDBContainer>
    </MDBContainer>

    <Footer />
    </>
    )
}
