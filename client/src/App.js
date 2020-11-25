import React from 'react'
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import MainPage from './components/MainPage';
import ProfileSetup from './components/ProfileSetup';
import ProjectForm from './components/ProjectForm';
import SignUpPage from './components/SignUpPage';
import Test from './components/Test';



function App() {
  return (
    
        <Switch>
          <Route exact path="/"/>
          <Route path="/register" component={SignUpPage}/>
          <Route path="/login" component={MainPage}/>
          <Route path="/hub" component={ProfileSetup}/>
        </Switch>


      
      
  );
}

export default App;
