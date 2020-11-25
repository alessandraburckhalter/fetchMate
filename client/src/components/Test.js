import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import '../styles/test.css'
import { MDBRow, MDBIcon} from 'mdbreact';
import { LoremIpsum } from "lorem-ipsum";

export default function Test() {
    return (
        <div>
        <div id="test">
            <aside>
                <h1>fecthMate</h1>
                <h2>Find the perfect partner for your next project</h2>
            </aside>

            <div id="test2">
                <aside>
                    <form className="login-form">

                        <fieldset>
                            <legend className="login-legend">Log into fetchMate </legend>

                            <div className="input-block">
                                <label htmlFor="email">Email</label>
                                <input  id="email" /> 
                            </div>

                            <div className="input-block">
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="about"
                                />
                            </div>

                        </fieldset>

                        <button className="login-button" type="submit">
                            Log In
                        </button>

                        <div className="forgot-password">Forgot Password?</div>

                        <button className="newAccount-button" type="submit">
                            Create New Account
                        </button>
                    </form>
                </aside>
            </div>
        </div>

        <div className="section2 text-center">
            
        <h1 className='text-center my-5 h1'>How does it work?</h1>
            <p className='text-center mb-5 w-responsive mx-auto lead grey-text'>
              Have an awesome project, but need some help to complete it? Here is the right place.
            </p>
            <MDBRow>
              <div className='col-md-4 mb-4'>
                <MDBIcon icon="user-alt -text"  size='4x' />
                <h4 className='font-weight-bold my-4'>Sign Up</h4>
                <p className='grey-text'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                </p>
              </div>
              <div className='col-md-4 mb-4'>
                <MDBIcon icon="file-upload" size='4x' />
                <h4 className='font-weight-bold my-4'>Publish a project</h4>
                <p className='grey-text'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                </p>
              </div>
              <div className='col-md-4 mb-4'>
                <MDBIcon far icon="handshake"  size='4x' />
                <h4 className='font-weight-bold my-4'>Get a partner</h4>
                <p className='grey-text'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                </p>
              </div>
            </MDBRow>


        </div>

        </div>
    )
}
