import React from 'react';
import '../styles/mainPage.css'
import { Row, Col } from 'react-bootstrap'

export default function MainPage() {
    return (
        
        <div id="top">
            <form className="login-form">

                <fieldset>
                    <legend className="login-legend">LOGIN </legend>

                    <div className="input-block">
                        <label htmlFor="email">Email</label>
                        <input id="email" />
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

                <button className="confirm-button" type="submit">
                    Submit
                </button>
            </form>
        </div>
       
    )
}
