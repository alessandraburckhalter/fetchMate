import React from 'react'
import '../styles/test.css'

export default function Test() {
    return (
        <div id="test">
        <aside>
            <h1>test</h1>
        </aside>

        <div id="test2">
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
    </div>
    )
}
