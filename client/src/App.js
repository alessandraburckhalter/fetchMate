import { Provider } from 'react-redux';
import './App.css';
import MainPage from './components/MainPage';
import ProfileSetup from './components/ProfileSetup';
import SignUpPage from './components/SignUpPage';
import { store } from './redux/store'


function App() {
  return (
      <Provider store={store}>
    <div className="App">
      <MainPage />

    </div>
      </Provider>
  );
}

export default App;
