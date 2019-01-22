import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.scss';
import userService from '../../utils/userService';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      pw: ''
    }
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name] : e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    userService.login(this.state)
      .then(() => {
        this.props.handleSignupOrLogin();
        this.props.history.push('/');
      })
      .catch(err => alert('Invalid Credentials'));
  }

  render() {
    return (
      <div className="LoginPage">
        <form className="LoginPage__form" onSubmit={this.handleSubmit} >
            <input className="LoginPage__input" type="email" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
            <input className="LoginPage__input" type="password" placeholder="Password" value={this.state.pw} name="pw" onChange={this.handleChange} />
            <button className="LoginPage__button">Log In</button>&nbsp;&nbsp;&nbsp;
            <Link className="LoginPage__link" to='/'>Cancel</Link>
        </form>
      </div>
    );
  }
};

export default LoginPage;
