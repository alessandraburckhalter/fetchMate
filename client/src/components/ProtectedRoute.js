import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

export default function ProtectedRoute(props) {
    const user = useSelector(state => state.user);
    if (!user.checked) {
        return 'Loading!'
    }
    if(user.loginInfo === null){
        return <Redirect to ='/' />
    }
    return (
        <Route {...props} />
    )
}
