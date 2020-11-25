import './App.css';
import MainPage from './components/MainPage';
import ProfileSetup from './components/ProfileSetup';
import ProjectForm from './components/ProjectForm';
import SignUpPage from './components/SignUpPage';
import Test from './components/Test';

function App() {
  return (
    <div className="App">
      <ProfileSetup />
      <ProjectForm />
    </div>
  );
}

export default App;
