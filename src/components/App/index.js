import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import ContactPage from '../Contact';
import AboutPage from '../About';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import withAuthentication from '../Session/withAuthentication';
import * as routes from '../../constants/routes';

import './index.css';

const App = () =>
  <Router>
    <div className="app">
      

      <hr/>

      <Route exact path={routes.LANDING} component={() => <SignInPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      <Route exact path={routes.ABOUT} component={() => <AboutPage />} />
      <Route exact path={routes.CONTACT} component={() => <ContactPage />} />

      <hr/>

    </div>
  </Router>

export default withAuthentication(App);