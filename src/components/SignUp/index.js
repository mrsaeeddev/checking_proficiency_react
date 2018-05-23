import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { SignInLink } from '../SignIn';
import { FormControl, Button, FormGroup, Jumbotron } from 'react-bootstrap';

import { auth, db } from '../../firebase';
import * as routes from '../../constants/routes';

const formStyles = {
  width: 300,
  margin: 0,
  paddingTop: 50,
  paddingLeft: 10,
  paddingRight: 10,
  borderRadius: 15,
}

const SignUpPage = ({ history }) =>
  <div className="center-inline" >
    <h3>Register a new membership</h3>
    <SignUpForm history={history} />
    <SignInLink />
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(updateByPropertyName('error', error));
          });

      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '' ||
      email === '';

    return (
      <Jumbotron  style={formStyles}>
      <FormGroup  onSubmit={this.onSubmit}>
        <FormControl
          value={username}
          onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
        <br />
        <br />
        <FormControl
          value={email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <br />
        <br />
        <FormControl
          value={passwordOne}
          onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <br />
        <br />
        <FormControl
          value={passwordTwo}
          onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <br />
        <br />
        <Button  disabled={isInvalid} type="submit">
          Sign Up
        </Button>

        {error && <p>{error.message}</p>}
      </FormGroup>
      </Jumbotron>
    );
  }
}

const SignUpLink = () =>
  <p>
    Register a new membership
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up here</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};