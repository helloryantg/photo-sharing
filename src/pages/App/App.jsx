import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.scss';
import userService from '../../utils/userService';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';

import SignupForm from '../../components/SignupForm/SignupForm';

class App extends Component {
  state = { user: null };

  handleLogout = () => {
    userService.logout();
    this.setState({user: null});
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }
  
  componentDidMount() {
    let user = userService.getUser();
    this.setState({user});
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" render={() =>
              <SignupForm />
            } />
            <Route exact path ='/signup' render={({history}) => 
              <SignupPage 
                history={history}
                handleSignupOrLogin={this.handleSignupOrLogin}
                />
              }/>
              <Route exact path='/login' render={(props) =>
                <LoginPage 
                  {...props}
                  handleSignupOrLogin={this.handleSignupOrLogin}
                />
              }/>

          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
