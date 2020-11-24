import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/profileSetup.css'

export default function ProfileSetup() {
    const user = useSelector(state => state.userInfo)


    return (
        <div id="top">
            <h1>{user.firstName} {user.lastName}</h1>
            <img src={user.profilePicture} alt="profilePicture"/>
            
        </div>
    )
}
