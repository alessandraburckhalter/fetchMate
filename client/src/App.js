import React, { useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Chat from './components/Chat';
import Comments from './components/Comments';

import ContributingProjects from './components/ContributingProjects';
import Contact from './components/Contact';

import Dashboard from './components/Dashboard';
import FAQ from './components/FAQ';
import Interested from './components/Interested';
import MainPage from './components/MainPage';
import ResetPassword from './components/ResetPassword';
import ProfileSetup from './components/ProfileSetup';
import ProjectForm from './components/ProjectForm';
import Projects from './components/Projects';
import PublicProfile from './components/PublicProfile';
import SignUpPage from './components/SignUpPage';
//import Test from './components/Test';
import { checked, login } from './redux/actions'
import ForgotPassword from './components/ForgotPassword';
import Privacy from './components/Privacy';
import Test from './components/Test';



function App() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()


  useEffect(() => {
    fetch('/api/v1/user/current/')
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        if (data.error) {
          console.log('no user')
          dispatch(checked())
        } else {
          // For any consistent state put into this fetch
          fetch('/api/v1/hub/current')
            .then(res => res.json())
            .then(data => {
              dispatch(login(data))
            })
        }
      })
  }, [dispatch])

  if (!user.checked) {
    return 'Loading!'
  }
  return (
    
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route path="/register" component={SignUpPage}/>
          <Route path="/forgotpassword" component={ForgotPassword}/>
          <Route exact path="/resetpassword" component={ResetPassword}/>
          <Route exact path="/projects" component={Projects}/>
          <Route exact path="/about" component={About}/>
          <Route exact path="/faq" component={FAQ}/>
          <Route exact path="/privacy" component={Privacy}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/test" component={Test}/>

          {user.loginInfo !== null && (
            <>
            <Route path="/hub" component={ProfileSetup}/>
            <Route path="/projectForm" component={ProjectForm}/>
            <Route exact path="/dashboard" component={Dashboard}/>

            <Route exact path="/dashboard/:projectId" component={Interested}/>
            <Route exact path="/dashboard/public/:pendingId" component={PublicProfile}/>
            <Route path="/dashboard/contribute/:contributeId" component={ContributingProjects}/>

            <Route path="/projects/:projectId" component={Comments}/>
            <Route path="/chat/:projectId" component={Chat}/>

            </>
          )}
          <Route>
            <Redirect to ='/' />
          </Route>
        </Switch>

  );
}

export default App;
