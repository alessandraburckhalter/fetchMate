import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import '../styles/mainPage.css'
import { Row, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { login } from '../redux/actions';

export default function MainPage() {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const history = useHistory('')
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('/api/v1/register/login',{
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
            console.log(data)
            if(data.error){
                alert(data.error)
            }else{
                alert('Logged In Successfully')
                dispatch(login(data.user))
                let path = "/hub"
                history.push(path)
            }
        })
    }


    return (
        
        <div id="top">
            <form className="login-form" onSubmit={handleLogin}>

                <fieldset>
                    <legend className="login-legend">LOGIN </legend>

                    <div className="input-block">
                        <label htmlFor="email">Email</label>
                        <input id="email" onChange={(e) => {setEmail(e.target.value)} } />
                    </div>

                    <div className="input-block">
                        <label htmlFor="password">
                            Password
                            </label>
                        <input
                            id="about"
                            onChange={(e) => {setPassword(e.target.value)} }
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
