import React, { Component } from 'react';
import './SignupForm.scss';
import userService from '../../utils/userService';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConf: ''
    };
  }

  handleChange = (e) => {
    this.props.updateMessage('');
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    userService.signup(this.state)
      .then(() => {
        this.props.handleSignupOrLogin();
        this.props.history.push('/');
      })
      .catch(err => this.props.updateMessage(err.message));
  }

  isFormInvalid() {
    return !(this.state.name && this.state.email && this.state.password === this.state.passwordConf);
  }

  render() {
    return (
      <div className="SignupForm">
        <div className="SignupForm__text">
          <h2>Create an account</h2>
          <p>Please fill in this form to create an account!</p>
        </div>

        <form className="SignupForm__form" onSubmit={this.handleSubmit} >
          <div className="SignupForm__input-first">
            <input className="SignupForm__input" type="text" placeholder="First Name" value={this.state.firstName} name="firstName" onChange={this.handleChange} />
            <input className="SignupForm__input" type="text" placeholder="Last Name" value={this.state.lastName} name="lastName" onChange={this.handleChange} />
          </div>
          <input className="SignupForm__input" type="email" placeholder="Email" value={this.state.email} name="email" onChange={this.handleChange} />
          <input className="SignupForm__input" type="password" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange} />
          <input className="SignupForm__input" type="password" placeholder="Confirm Password" value={this.state.passwordConf} name="passwordConf" onChange={this.handleChange} />
          <button className="SignupForm__button" disabled={this.isFormInvalid()}>Create account</button>&nbsp;&nbsp;
        </form>

        <div className="SignupForm__login">
            <p>Already have an account? <a href="/login">Login here</a>.</p>
        </div>
      </div>
    );
  }
};

export default SignupForm;
