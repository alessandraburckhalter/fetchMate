import React, {useState} from 'react';
import '../styles/signUp.css'
import {Link, useHistory} from 'react-router-dom'
import Axios from 'axios';
import { MDBCol, MDBContainer, MDBFooter, MDBIcon, MDBRow } from 'mdbreact';
import logo from '../images/logo3.png'
import Footer from './Footer';



export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [title, setTitle] = useState('')
    const [emailSent, setEmailSent ] = useState(false);
    const formData = new FormData();
    const history = useHistory();
    
    
    const handleSubmit = (e)=>{
        
        console.log(profilePicture)
        e.preventDefault()
        formData.append('firstName', firstName)
        formData.append('lastName', lastName)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('profilePicture', profilePicture)
        fetch("/api/v1/user", {
            method: "POST",
            body: formData
           
        })
        .then(res => res.json())
            
        .then(data =>{
            console.log(profilePicture)
            if(data.error){
                alert(data.error)
                // setError(data.error)
            }else{
                console.log("register success") 
                //email 
                
                

            }
            
        })
        .then(result=>{
            Axios.post('http://localhost:3000/api/v1/email/welcome', {
                email
            })
                    .then(res =>{
                        if(res.data.success){
                            setEmailSent(true)
                            alert("success")
                        }else{
                            setEmailSent(false)
                        }
                    })
                    .catch(err =>{
                        console.log("something wrong")
                    })
                })
            .then((result) =>{
                let path = "/"
                history.push(path)
            })
                
    
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
                <aside>
                    <form className="signup-form" onSubmit={handleSubmit}>

                <fieldset>
                    <legend className="signup-legend">Sign Up </legend>

                    <div className="input-block">
                        <label htmlFor="firstName">First name</label>
                        <input value={firstName} id="firstName" onChange={(e)=> {setFirstName(e.target.value)}}/>
                    </div>

                    <div className="input-block">
                        <label htmlFor="lastName">
                            Last Name
                            </label>
                        <input
                            id="lastName"
                            value={lastName}
                            onChange={(e)=> {setLastName(e.target.value)}}
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="email">
                            Email
                            </label>
                        <input
                            icon="lock"
                            id="email"
                            value={email}
                            onChange={(e)=> {setEmail(e.target.value)}}
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="password">
                            Password
                            </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e)=> {setPassword(e.target.value)}}
                        />
                    </div>

                    <div className="input-block">
                        <label htmlFor="profilePicture">
                            Profile picture
                            </label>

                           
                                
                            <label htmlFor="profilePicture" className="new-image">
                            <MDBIcon icon="plus" />
                            </label>
                            {profilePicture ? profilePicture.name : ''}

                        <input
                            id="profilePicture" 
                            type="file"
                            onChange={(e)=> {setProfilePicture(e.target.files[0])}}
                            name="profilePicture"
                        />
                    </div>
                </fieldset>

                <button className="confirm-button" type="submit">
                    Submit  <MDBIcon far icon="paper-plane ml-1" />
                </button>
            </form>
            </aside>
            </div>
        </div>

        </div>
    )
}
