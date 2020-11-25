import React from 'react';
import '../styles/signUp.css'

export default function SignUpPage() {
    return (
            <div id="top">
            <form className="signup-form">

                <fieldset>
                    <legend className="signup-legend">SIGN UP </legend>

                    <div className="input-block">
                        <label htmlFor="firstName">First name</label>
                        <input id="firstName" />
                    </div>

                    <div className="input-block">
                        <label htmlFor="lastName">
                            Last Name
                            </label>
                        <input
                            id="lastName"
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="email">
                            Email
                            </label>
                        <input
                            id="email"
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="password">
                            password
                            </label>
                        <input
                            id="password"
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="profilePicture">
                            Profile picture
                            </label>
                        <input
                            id="profilePicture" type="file"
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
