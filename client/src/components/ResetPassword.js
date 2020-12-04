import React, {useEffect, useState} from 'react';
import '../styles/signUp.css'
import {Link, useHistory, useLocation, useParams} from 'react-router-dom'
import Axios from 'axios';
import { MDBCol, MDBContainer, MDBFooter, MDBIcon, MDBRow } from 'mdbreact';
import logo from '../images/logo3.png'
import Footer from './Footer';
import { useSelector } from 'react-redux';



export default function ResetPassword() {
    const user = useSelector(state => state.user)
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(""); 
    const [showPage, setShowPage] = useState(null)
    const history = useHistory();
    const location = useLocation();
    // const { userId, token } = 
    const query = new URLSearchParams(location.search)
    
    useEffect(() =>{
        console.log(query)
        //Get user.id and token from query param
        //Use token and id to send fetch request to server
        fetch(`/api/v1/user/confirmtoken`, {
            method: 'POST',
            body: JSON.stringify({
                //new api that takes user.id and token in params
                userId: query.get('userId'),
                token: query.get('token')
            }),
            headers: {
                Accept:"application/json",
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            //if token valid then show form
            if(data.success){
                setShowPage(true)
            }else{
                //else display token is not valid
                setShowPage(false)
            }
        })
        




        //
    })
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        
        fetch("/api/v1/user/newpassword", {
            method: "PATCH",
            body: JSON.stringify({
                userId: query.get('userId'),
                token: query.get('token'),
                password: password
            }),
            headers:{
                Accept: "application/json",
                'Content-type': 'application/json'
            }
           
        })
        .then(res => res.json())
            
        .then(data =>{
            if(data.error){
                alert(data.error)
                // setError(data.error)
            }else{
                console.log(data.success) 
                let path = "/"
                history.push(path)
            }
            
        })
    }
    if(showPage === null){
        return 'Loading!'
    }
    return (

        <div>
        <div id="left-side">
            <aside>
                <img src={logo} alt="logo" width="50%"/>
                <h2>Create an account and start publishing or searching projects today!</h2>

                <Link to="/" className="back-home">
                <MDBIcon icon="angle-double-left" size={30}  />
                </Link>
                
            </aside>

            <div id="right-side">
                {showPage === true ?(
                <aside>
                    <form className="signup-form" onSubmit={handleSubmit}>

                <fieldset>
                    <legend className="signup-legend">Enter New Password</legend>

                    <div className="input-block">
                        <label htmlFor="password">
                            Password
                            </label>
                        <input
                            icon="lock"
                            id="password"
                            value={password}
                            onChange={(e)=> {setPassword(e.target.value)}}
                        />
                    </div>
                    <div className="input-block">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                            </label>
                        <input
                            icon="lock"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e)=> {setConfirmPassword(e.target.value)}}
                        />
                    </div>
                    
                </fieldset>

                <button className="confirm-button" type="submit">
                    Submit  <MDBIcon far icon="paper-plane ml-1" />
                </button>
            </form>
            </aside>

                ):(
                    <>
                    <h3>Password reset token expired!</h3>
                    <br></br>
                    <h3>Please go back to login page</h3>
                    </>
                )}
            </div>
        </div>

        </div>
    )
}
