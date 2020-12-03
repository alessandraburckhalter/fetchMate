import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import '../styles/mainPage.css'
import { useDispatch } from 'react-redux'

import { login } from '../redux/actions';
import { MDBContainer, MDBIcon, MDBRow, MDBCol } from 'mdbreact';
import logo from '../images/logo3.png';
import Footer from './Footer';




export default function MainPage() {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const history = useHistory('')
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('/api/v1/user/login', {
            method: 'POST',
            body: JSON.stringify({
                password: password,
                email: email
            }),
            headers: {
                Accept: "application/json",
                'Content-type': 'application/json'
            }
        })
            .then(res => res.json())

            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    alert('Logged In Successfully')
                    dispatch(login(data.user))
                    // change path you want for test
                    let path = "/dashboard"
                    history.push(path)
                }
            })
    }


    return (
        <>
            <MDBContainer id="">
                <MDBRow>
                    <MDBCol className="aside" sm="4">
                        <img src={logo} alt="logo" width="50%" />
                        <h2>Find the perfect partner for your next project</h2>
                    </MDBCol>
                    <MDBCol sm="8">
                        <div id="first-section-login">

                            <aside>
                                <MDBRow>
                                    <MDBCol>
                                        <form className="login-form" onSubmit={handleLogin}>

                                            <fieldset>
                                                <legend className="login-legend">Log into fetchMate </legend>

                                                <div className="input-block">
                                                    <label htmlFor="email">Email</label>
                                                    <input id="email" onChange={(e) => { setEmail(e.target.value) }} />
                                                </div>

                                                <div className="input-block">
                                                    <label htmlFor="password">
                                                        Password
                                                    </label>
                                                    <input
                                                        id="about"
                                                        onChange={(e) => { setPassword(e.target.value) }}
                                                    />
                                                </div>

                                            </fieldset>

                                            <button className="login-button btn-grad " type="submit">
                                                Log In <MDBIcon icon="sign-in-alt ml-1" />
                                            </button>

                                            <div className="forgot-password">Forgot Password?</div>

                                            <Link to="/register">
                                                <button className="newAccount-button" >
                                                    Create New Account <MDBIcon icon="user-plus ml-1" />
                                                </button></Link>

                                        </form>
                                    </MDBCol>
                                </MDBRow>
                                
                            </aside>
                        </div>
                    </MDBCol>
                </MDBRow>

            </MDBContainer>

            {/* small screen */}






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
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
                        </div>

                        <div className='col-md-4 mb-4'>
                            <MDBIcon icon="file-upload orange-text" size='4x' />
                            <h4 className='font-weight-bold my-4'>Publish a project</h4>
                            <p className='grey-text'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
                        </div>

                        <div className='col-md-4 mb-4'>
                            <MDBIcon far icon="handshake green-text" size='4x' color="#8257e6" />
                            <h4 className='font-weight-bold my-4'>Get a partner</h4>
                            <p className='grey-text'>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
                        </div>
                    </MDBRow>
                </MDBContainer>
            </div>

            <Footer />

        </>
    )
}
