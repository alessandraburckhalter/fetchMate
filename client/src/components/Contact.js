import Axios from 'axios'
import { MDBCard, MDBCardBody, MDBCol, MDBIcon, MDBInput, MDBRow } from 'mdbreact'
import React, { useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Contact() {
  const [name, setName] = useState("")
  const [fromEmail, setFromEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")


  const sendEmail = () => {
    Axios.post('/api/v1/email/contact',
      {
        email: fromEmail,
        subject: subject,
        name: name,
        message: message
      })
      .then(res => {
        if (res.data.success) {
          setFromEmail("")
          setSubject("")
          setName("")
          setMessage("")
          alert("success sending Email")
        } else {
          alert("Fail sending Email")
        }
      })
      .catch(err => {
        console.log("something wrong")
      })
  }
    return (
        <>
        <Navbar />
        <section className="my-5">
      <h2 className="h1-responsive font-weight-bold text-center my-5">
        Contact us
      </h2>
      <p className="text-center w-responsive mx-auto pb-5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit,
        error amet numquam iure provident voluptate esse quasi, veritatis
        totam voluptas nostrum quisquam eum porro a pariatur veniam.
      </p>
      <MDBRow>
        <MDBCol lg="5" className="lg-0 mb-4">
          <MDBCard>
            <MDBCardBody>
              <div className="form-header blue accent-1">
                <h3 className="mt-2">
                  <MDBIcon icon="envelope" /> Write to us:
                </h3>
              </div>
              <p className="dark-grey-text">
                We'll write rarely, but only the best content.
              </p>
              <form onSubmit={sendEmail}>
                <div className="md-form">
                  <MDBInput
                    icon="user"
                    label="Your name"
                    iconClass="grey-text"
                    type="text"
                    id="form-name"
                    value = {name}
                    onChange={(e)=> setName(e.target.value)}
                  />
                </div>
                <div className="md-form">
                  <MDBInput
                    icon="envelope"
                    label="Your email"
                    iconClass="grey-text"
                    type="text"
                    id="form-email"
                    value = {fromEmail}
                    onChange={(e)=> setFromEmail(e.target.value)}
                  />
                </div>
                <div className="md-form">
                  <MDBInput
                    icon="tag"
                    label="Subject"
                    iconClass="grey-text"
                    type="text"
                    id="form-subject"
                    value = {subject}
                    onChange={(e)=> setSubject(e.target.value)}
                  />
                </div>
                <div className="md-form">
                  <MDBInput
                    icon="pencil-alt"
                    label="Message"
                    iconClass="grey-text"
                    type="textarea"
                    id="form-text"
                    value = {message}
                    onChange={(e)=> setMessage(e.target.value)}
                  />
                </div>
                <div className="text-center">
                  <button color="light-blue" type="submit">Submit</button>
                </div>

              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="7">
          {/* <div
            id="map-container"
            className="rounded z-depth-1-half map-container"
            style={{ height: "400px" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d76765.98321148289!2d-73.96694563267306!3d40.751663750099084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spl!2spl!4v1525939514494"
              title="This is a unique title"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
            />
          </div> */}
          <br />
          <MDBRow className="text-center">
            <MDBCol md="4">
              <button tag="a" floating color="blue" className="accent-1">
                <MDBIcon icon="map-marker-alt" />
              </button>
              <p>New York, 94126</p>
              <p className="mb-md-0">United States</p>
            </MDBCol>
            <MDBCol md="4">
              <button tag="a" floating color="blue" className="accent-1">
                <MDBIcon icon="phone" />
              </button>
              <p>+ 01 234 567 89</p>
              <p className="mb-md-0">Mon - Fri, 8:00-22:00</p>
            </MDBCol>
            <MDBCol md="4">
              <button tag="a" floating color="blue" className="accent-1">
                <MDBIcon icon="envelope" />
              </button>
              <p>info@gmail.com</p>
              <p className="mb-md-0">sale@gmail.com</p>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </section>
    <Footer />
    </>
    )
}
