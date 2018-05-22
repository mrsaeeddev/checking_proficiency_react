import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from '../Session/AuthUserContext';
import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

const Navigation = () =>
  <AuthUserContext.Consumer>
    {
      <NavigationAuth />
    }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Main Page</Link></li>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ABOUT}>About Us</Link></li>
    <li><Link to={routes.CONTACT}>Contact Us</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>


export default Navigation;
