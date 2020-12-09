import { MDBCol, MDBContainer, MDBFooter, MDBRow } from 'mdbreact'
import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../images/logo3.png';
import '../styles/footer.css'


export default function Footer() {
    return (
        <div>
            <MDBFooter className="font-large pt-5 mt-4 footer">
        <MDBContainer fluid className="text-center ">
        <MDBRow className="d-flex justify-content-center">

          <MDBCol md="2" className="logo-footer">
          <Link to="/"><img src={logo} alt="logo" className="img-footer" /></Link>
         

            <p>
              We help you to connect with people and find a partner for your project.
            </p>
        </MDBCol>

         <MDBCol md="3" sm="4" xs="4" className="text-justify d-flex justify-content-center">
            <ul >
            <h5 className="title ">Explore</h5> 
              <li className="list-unstyled">
              <i className="fas fa-chevron-right "></i> <Link to="/">Login</Link>
              </li>
              <li className="list-unstyled">
              <i className="fas fa-chevron-right"></i> <Link to="/register">Sign Up</Link>
              </li>
              <li className="list-unstyled">
              <i className="fas fa-chevron-right"></i> <Link to="/projects">Projects</Link>
              </li>
              <li className="list-unstyled">
              <i className="fas fa-chevron-right"></i> <Link to="/about">The Team</Link>
              </li>
              <li className="list-unstyled">
              <i className="fas fa-chevron-right"></i> <Link to="/faq">FAQ</Link>
              </li>
              <li className="list-unstyled">
              <i className="fas fa-chevron-right"></i> <Link to="/privacy">Privacy</Link>
              </li>
            </ul>
        </MDBCol>

        <MDBCol md="3" sm="4" xs="4"  className="text-justify d-flex justify-content-center">
            <ul>
            <h5 className="title">Follow</h5>
              <li className="list-unstyled">
              <i className="fab fa-twitter"></i> <a href="https://mobile.twitter.com/fetchmate" target="_blank">Twitter</a>
              </li>
              <li className="list-unstyled">
              <i className="fab fa-linkedin"></i> <a href="https://www.linkedin.com/company/fetchmate/" target="_blank" >LinkedIn</a>
              </li>
              <li className="list-unstyled">
              <i className="fab fa-discord"></i> <a href="https://discord.gg/NNVdMcDr" target="_blank">Discord</a>
              </li>
            </ul>
        </MDBCol>

        <MDBCol md="3" sm="4" xs="4"    className="text-justify d-flex justify-content-center">
            <ul>
            <h5 className="title"><Link to="/contact" >Contact</Link></h5>
              <li className="list-unstyled">
              <i className="fas fa-envelope"></i> <a href="mailto:fetchmate2020@gmail.com">Email</a>
              </li>
              <li className="list-unstyled">
              <i className="fas fa-map-marker-alt"></i> <Link to="/contact">Atlanta</Link><br /> <i className="fas fa-map-marker-alt"></i> <Link to="/contact">Texas</Link>
              </li>
            </ul>
        </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className=" text-right py-1 " >
        <MDBContainer fluid >
          &copy; {new Date().getFullYear()} Copyright
        </MDBContainer>
      </div>
    </MDBFooter>
        </div>
    )
}
