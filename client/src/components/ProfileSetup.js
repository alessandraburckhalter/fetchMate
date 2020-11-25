import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/profileSetup.css'
import SkillSearchBar from './SkillSearchBar';

export default function ProfileSetup() {
    const user = useSelector(state => state.user)


    return (
        <div id="top">
            <h1>{user.loginInfo.firstName} {user.loginInfo.lastName}</h1>
            <img src={user.loginInfo.profilePicture} alt="profilePicture"/>
            <SkillSearchBar/>
        </div>
    )
}
