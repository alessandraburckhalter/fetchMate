import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom'
import '../styles/mainPage.css'
import { useDispatch } from 'react-redux'
import { login } from '../redux/actions';
import {  MDBCol, MDBContainer, MDBIcon, MDBRow } from 'mdbreact';
import logo from '../images/logo3.png';
import Footer from './Footer';
export default function MainPage() {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const history = useHistory('')
    const dispatch = useDispatch();
    const handleLogin = (e) => {
        e.preventDefault();
        fetch('/api/v1/user/login',{
            method: 'POST',
            body: JSON.stringify({
                password:password,
                email: email
            }),
            headers: {
                Accept:"application/json",
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                alert(data.error)
            }else{
                alert('Logged In Successfully')
                dispatch(login(data.user))
                // change path you want for test
                let path = "/dashboard"
                history.push(path)
            }
        }) 
    }
    return (
        <div>
    <MDBRow className="no-gutters">
        <MDBCol md="5" className="no-gutters ">
        <div className="leftside d-flex justify-content-center align-items-center">
        <img src={logo} alt="logo" width="50%"/>
            <h2>Find the perfect partner for your next project</h2>
            </div>
        </MDBCol>

        <MDBCol md="7" className="no-gutters md-6">
        <div className="rightside d-flex justify-content-center align-items-center"> 
                <form className="login-form" onSubmit={handleLogin}>
                <fieldset>
                    <legend className="login-legend">Log into fetchMate </legend>
                    <div className="input-block">
                        <label htmlFor="email">Email</label>
                        <input id="email" onChange={(e) => {setEmail(e.target.value)} } />
                    </div>
                    <div className="input-block">
                        <label htmlFor="password">
                            Password
                            </label>
                        <input
                            type="password"
                            id="about"
                            onChange={(e) => {setPassword(e.target.value)} }
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

        <div className="second-section text-center">
            <MDBContainer>
                <h1 className='text-center my-5 h1'>How does it work?</h1>
                <p className='text-center mb-5 w-responsive mx-auto lead grey-text'>
              Have an awesome project, but need some help to complete it? Here is the right place.
                </p>
            <MDBRow>
              <div className='col-md-4 mb-4'>
                <MDBIcon icon="user-alt -text indigo-text " size='4x' />
                <h4 className='font-weight-bold my-4'>Sign Up</h4>
                <p className='grey-text'>
                A fetchMate account is your passport to a new and exciting world of opportunities. The process is very simple, you will need to create a personal password and provide some basic information. You will then be redirected to the login page. After that, start exploring!
                </p>
              </div>
              <div className='col-md-4 mb-4'>
                <MDBIcon icon="file-upload orange-text" size='4x' />
                <h4 className='font-weight-bold my-4'>Publish a project</h4>
                <p className='grey-text'>
                On fetchMate you can publish a project that is already in progress or a project idea that you want to start. You can select the skills you are looking for in another developer, a deadline and also the number of people who can participate in this project with you. It's super easy.
                </p>
              </div>
              <div className='col-md-4 mb-4'>
                <MDBIcon far icon="handshake green-text"  size='4x'  color="#8257e6"/>
                <h4 className='font-weight-bold my-4'>Get a partner</h4>
                <p className='grey-text'>
                After you publish your project, it will be available for all fetchMate users to see. When people apply to participate in your project, you will be notified and they will be available on your dashboard for your evaluation. After accepting them, you can use our chat to contact them.
                </p>
              </div>
            </MDBRow>
            </MDBContainer> 
        </div>
        <Footer />
    </div>
    )
}