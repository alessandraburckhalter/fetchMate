import React, { useState } from 'react';
import '../styles/signUp.css'
import { Link } from 'react-router-dom'
import { MDBCol, MDBIcon, MDBRow } from 'mdbreact';
import logo from '../images/logo3.png'



export default function ForgotPassword() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {

        e.preventDefault()

        fetch("/api/v1/user/resetpassword", {
            method: "POST",
            body: JSON.stringify({
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
                    alert(data.message)
                }

            })
    }

    return (
        <div>
            <MDBRow className="no-gutters">
                <MDBCol md="5" className="no-gutters ">
                    <div className="leftside d-flex justify-content-center align-items-center">
                        <img src={logo} alt="logo" width="50%" />
                        <h2>Create an account and start publishing or searching projects today!</h2>

                        <Link to="/" className="back-home">
                            <MDBIcon icon="angle-double-left" size={30} />
                        </Link>

                    </div>
                </MDBCol>

                <MDBCol md="7" className="no-gutters md-6">
                    <div className="rightside d-flex justify-content-center align-items-center">
                        <form className="signup-form" onSubmit={handleSubmit}>

                            <fieldset>
                                <legend className="signup-legend">Enter Your Email </legend>

                                <div className="input-block">
                                    <label htmlFor="Email">
                                        Email
                            </label>
                                    <input
                                        icon="lock"
                                        id="email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                </div>
                            </fieldset>

                            <button className="confirm-button" type="submit">
                                Submit  <MDBIcon far icon="paper-plane ml-1" />
                            </button>
                        </form>
                    </div>
                </MDBCol>
            </MDBRow>

        </div>
    )
}
