import Axios from 'axios'
import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow } from 'mdbreact'
import React, { useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import  { MapContainer, Marker, TileLayer  }  from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Leaflet from 'leaflet';
import mapMarkerImg from '../images/mapIcon.png';
import mapMarkerImg1 from '../images/mapIcon1.svg';
import '../styles/contact.css'


export default function Contact() {
  const [name, setName] = useState("")
  const [fromEmail, setFromEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")


  const sendEmail = (e) => {
    e.preventDefault()
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

  const mapIcon1 = Leaflet.icon({
    iconUrl: mapMarkerImg1,
    iconSize: [58, 68]
})

    return (
        <>
        <Navbar />
        <div >
        {/* <div id="section1" className="background">
            <div className="layer">
            <h1 className="faq-title">CONTACT US</h1>
            </div>
        </div> */}
        <MDBContainer className="my-5 contact-page-container">
      <h2 className="h1-responsive font-weight-bold text-center mt-5 contact-title">
        Contact <span className="green-color">U</span><span className="green-color">s</span>
      </h2>
      <p className="text-center w-responsive mx-auto pb-5">
        Have any questions? We'd love to hear from you.
      </p>
      <MDBRow>
        <MDBCol lg="5" className="lg-0 mb-4">
          <MDBCard>
            <MDBCardBody>
              <div className="form-header blue accent-1">
                <h3 className="mt-2 white-text pt-2 pb-2 ml-1">
                   Write to us:
                </h3>
              </div>
              <p className="dark-grey-text">
              We'll get back to you shortly!
              </p>
              <form className="form-contact" onSubmit={sendEmail}>
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
                  <button className="btn btn-light-blue" color="light-blue" type="submit">Submit</button>
                </div>

              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="7">

          <div
            id="map-container"
            className="rounded z-depth-1-half map-container"
            style={{ height: "400px" }}
          >
          <MapContainer   
                // center={[33.753746,-84.386330]}
                bounds={[
                  [33.753746, -84.386330],
                  [31.000000, -100.000000]
                ]}
                // zoom={14}
                style={{ width: '100%', height: '100%' }}

          >

            {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}

          <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

          <Marker 
                icon={mapIcon1}
                position={[33.753746, -84.386330]}
            ></Marker>

            <Marker 
                icon={mapIcon1}
                position={[31.000000, -100.000000]}
            ></Marker>

          </MapContainer>
          </div>
          <br />
          <MDBRow className="text-center row-contact">
            <MDBCol md="4">
              <button className="btn btn-primary button-location">
              <MDBIcon icon="map-marker-alt white-text" className="map-marker-icon" />
              </button>
              <h1 className="location-name mt-2">Atlanta, GA</h1>
              <h1 className="location-name">United States</h1>
            </MDBCol>
            <MDBCol md="4">
              <button className="btn btn-primary button-location">
                <MDBIcon icon="envelope" className="map-marker-icon" />
              </button>
              <p className="location-name mt-3"><a href="mailto:fetchmate2020@gmail.com">fetchmate2020@gmail.com</a></p>
            </MDBCol>
            <MDBCol md="4">
              <button className="btn btn-primary button-location">
              <MDBIcon icon="map-marker-alt white-text" className="map-marker-icon"/>
              </button>
              <h1 className="location-name mt-2">Houston, Texas</h1>
              <h1 className="location-name">United States</h1>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
      </MDBContainer>
      </div>
    <Footer />
    </>
    )
}
