import React from 'react';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core';
import Theme from './theme';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppContext from './components/contexts/app-context';
import Login from './components/login';
import Navbar from './components/navbar/navbar';

const App: React.FC = () => {
  let appContext = new AppContext();

  return (
    <MuiThemeProvider theme={Theme}>
      <div className="App">
        <Router>
          <Navbar context={appContext} />
          <div>
            <Route path="/" render={() => <Login context={appContext} />} />
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
