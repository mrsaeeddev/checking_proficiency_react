import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FormControl,Button,FormGroup,Jumbotron } from 'react-bootstrap';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { auth } from '../../firebase';
import * as routes from '../../constants/routes';

const formStyles = {
  width: 300,
  margin: 0,
  paddingTop: 50,
  paddingLeft:10,
  paddingRight: 10,
  borderRadius: 15,

}

const SignInPage = ({ history }) =>
  <div>
    <h3>Sign In to start your session</h3>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});


const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <Jumbotron style={formStyles}>
      <FormGroup responsive onSubmit={this.onSubmit}>
        <FormControl
          value={email}
          onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <br />
        <br />
        <FormControl
          value={password}
          onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <br />
        <br />
        <Button disabled={isInvalid} type="submit">
          Sign In
        </Button>

        {error && <p>{error.message}</p>}
      </FormGroup>
      </Jumbotron>
    );
  }
}

const SignInLink = () =>
  <p>
    I already have membership
    {' '}
    <Link to={routes.SIGN_IN}>Log In here</Link>
  </p>
export default withRouter(SignInPage);

export {
  SignInForm,
  SignInLink
};
