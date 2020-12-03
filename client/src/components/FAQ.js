import { MDBCard, MDBCardBody, MDBCollapse, MDBContainer } from 'mdbreact';
import React, { useState } from 'react';
import Navbar from './Navbar';
import '../styles/faq.css';
import Footer from './Footer'


export default function FAQ() {
    const [collapseID, setCollapseID] = useState("collapse10")

  const toggleCollapse = collapseID => () => setCollapseID(collapseID)
//   const collapse = "collapse9"

    return (
        <>
        <Navbar />
        <div id="section1">

        </div>
        <MDBContainer className="faq-container">
      <MDBContainer className="mt-5">
          <h1>Questions you may have</h1>
        <MDBCard className="mt-3 card-faq">
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

        <MDBCard className="mt-3 card-faq">
          <button className="faq-button" onClick={toggleCollapse("collapse9")}>
            <i
              className={ 
                collapseID === "collapse9"
                  ? "fa fa-angle-down "
                  : "fa fa-angle-right"
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

      </MDBContainer>
    </MDBContainer>

    <Footer />
    </>
    )
}
