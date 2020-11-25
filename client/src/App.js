import React from 'react'
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import MainPage from './components/MainPage';
import ProfileSetup from './components/ProfileSetup';
import ProjectForm from './components/ProjectForm';
import Projects from './components/Projects';
import SignUpPage from './components/SignUpPage';
import Test from './components/Test';



function App() {
  return (
    
        <Switch>
          <Route exact path="/"/>
          <Route path="/register" component={SignUpPage}/>
          <Route path="/login" component={MainPage}/>
          <Route path="/hub" component={ProfileSetup}/>
          <Route path="/projectForm" component={ProjectForm}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/projects" component={Projects}/>
        </Switch>

  );
}

export default App;
