import React from 'react'
import { MDBContainer,   MDBIcon,  MDBBtn, MDBPageItem, MDBPagination, MDBPageNav, MDBJumbotron, MDBRow, MDBCol } from "mdbreact";
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/TestingPage.css'
import { Link } from 'react-router-dom';
import logo from '../images/logo3.png';

export default function Test() {
    return (
        <>
        {/* <Navbar /> */}
        <MDBRow className="no-gutters">
        <MDBCol md="5" className="no-gutters md-6">
        <div className="leftside d-flex justify-content-center align-items-center">
        <img src={logo} alt="logo" width="50%"/>
            <h2>Find the perfect partner for your next project</h2>
            </div>
        </MDBCol>

        <MDBCol md="7" className="no-gutters md-6">
        <div className="rightside d-flex justify-content-center align-items-center"> 
                <form className="login-form" >
                <fieldset>
                    <legend className="login-legend">Log into fetchMate </legend>
                    <div className="input-block">
                        <label htmlFor="email">Email</label>
                        <input id="email"  />
                    </div>
                    <div className="input-block">
                        <label htmlFor="password">
                            Password
                            </label>
                        <input
                            type="password"
                            id="about"
                            
                        />
                    </div>
                </fieldset>
                <button className="login-button btn-grad " type="submit">
                    Log In <MDBIcon icon="sign-in-alt ml-1" />
                </button>

                <div className="forgot-password"><Link to='/forgotpassword'><button className="forgot-password " type="submit">
                    Forgot Password?
                </button></Link>
                </div>

                <Link to="/register">
                <button className="newAccount-button" >
                            Create New Account <MDBIcon icon="user-plus ml-1" />
                </button></Link>
            </form>
            </div>
        </MDBCol>
    </MDBRow>

          

        {/* <Footer /> */}
        </>
    )
}
