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
        <MDBRow>
          <MDBCol md="2" className="ml-5">
          <img src={logo} alt="logo" className="img-fluid"/>
            <p>
              We help you to connect with people and find a partner for your project.
            </p>
        </MDBCol>

         <MDBCol md="3" className="text-justify d-flex justify-content-center">
            <ul >
            <h5 className="title ">Explore</h5> 
              <li className="list-unstyled">
              <i class="fas fa-chevron-right "></i> <Link to="/">Login</Link>
              </li>
              <li className="list-unstyled">
              <i class="fas fa-chevron-right"></i> <Link to="/register">Sign Up</Link>
              </li>
              <li className="list-unstyled">
              <i class="fas fa-chevron-right"></i> <a href="#!">About</a>
              </li>
              <li className="list-unstyled">
              <i class="fas fa-chevron-right"></i> <a href="#!">Projects</a>
              </li>
              <li className="list-unstyled">
              <i class="fas fa-chevron-right"></i> <a href="#!">FAQ</a>
              </li>
            </ul>
        </MDBCol>

        <MDBCol md="3" className="text-justify d-flex justify-content-center">
            <ul>
            <h5 className="title">Follow</h5>
              <li className="list-unstyled">
              <i class="fab fa-twitter"></i> <a href="#!">Twitter</a>
              </li>
              <li className="list-unstyled">
              <i class="fab fa-linkedin"></i> <a href="#!">LinkedIn</a>
              </li>
              <li className="list-unstyled">
              <i class="fab fa-discord"></i> <a href="#!">Discord</a>
              </li>
            </ul>
        </MDBCol>

        <MDBCol md="3" className="text-justify d-flex justify-content-center">
            <ul>
            <h5 className="title">Contact</h5>
              <li className="list-unstyled">
              <i class="fas fa-envelope"></i> <a href="#!">Email</a>
              </li>
              <li className="list-unstyled">
              <i class="fas fa-map-marker-alt"></i> <a href="#!">Atlanta</a><br /> <i class="fas fa-map-marker-alt"></i> <a href="#!">Texas</a>
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
