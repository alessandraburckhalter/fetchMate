import React, {useEffect} from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import ContribuingProjects from './components/ContribuingProjects';
import Dashboard from './components/Dashboard';
import Interested from './components/Interested';
import MainPage from './components/MainPage';
import ProfileSetup from './components/ProfileSetup';
import ProjectForm from './components/ProjectForm';
import Projects from './components/Projects';
import PublicProfile from './components/PublicProfile';
import SignUpPage from './components/SignUpPage';
import Test from './components/Test';
import { checked, login } from './redux/actions'



function App() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()


  useEffect(() => {
    fetch('/api/v1/user/current/')
    .then(res => res.json())
    .then(data => {
      // console.log(data)
      if(data.error){
        console.log('no user')
        dispatch(checked())
      }else{
        dispatch(login(data.user))
      }
    })
  },[dispatch])

  if(!user.checked){
    return 'Loading!'
  }
  return (
    
        <Switch>
          <Route exact path="/" component={MainPage}/>
          <Route path="/register" component={SignUpPage}/>
          
          
          {user.loginInfo !== null && (
            <>
            <Route path="/hub" component={ProfileSetup}/>
            <Route path="/projectForm" component={ProjectForm}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/projects" component={Projects}/>
            <Route path="/interested" component={Interested}/>
            <Route path="/test" component={Test}/>
            <Route path="/public" component={PublicProfile}/>
            <Route path="/contribuing" component={ContribuingProjects}/>
            </>
          )}
          <Route>
            <Redirect to ='/' />
          </Route>
        </Switch>

  );
}

export default App;
