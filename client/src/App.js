import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
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
import { checked, login } from './redux/actions'
import ForgotPassword from './components/ForgotPassword';
import Privacy from './components/Privacy';
import ProtectedRoute from './components/ProtectedRoute';




function App() {
  const dispatch = useDispatch()


  useEffect(() => {
    fetch('/api/v1/user/current/')
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          dispatch(checked())
        } else {
          fetch('/api/v1/hub/current')
            .then(res => res.json())
            .then(data => {
              dispatch(login(data))
            })
        }
      })
  }, [dispatch])


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
            <ProtectedRoute path="/hub" component={ProfileSetup}/>
            <ProtectedRoute path="/projectForm" component={ProjectForm}/>
            <ProtectedRoute exact path="/dashboard" component={Dashboard}/>
            <ProtectedRoute exact path="/dashboard/:projectId" component={Interested}/>
            <ProtectedRoute exact path="/dashboard/public/:pendingId" component={PublicProfile}/>
            <ProtectedRoute path="/dashboard/contribute/:contributeId" component={ContributingProjects}/>
            <ProtectedRoute path="/projects/:projectId" component={Comments}/>
            <ProtectedRoute path="/chat/:projectId" component={Chat}/>
          <Route>
            <Redirect to ='/' />
          </Route>
        </Switch>
  );
}

export default App;
