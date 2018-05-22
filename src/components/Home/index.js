import React, { Component } from 'react';

import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase/firebase.js';
import Navigation from '../Navigation';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: ''
    };
  }

  componentWillMount() {
    db.ref('/entry3').on('value',snapshot =>{
      this.state.users = snapshot.val();
      this.setState({users:this.state.users})
    });
  }

  render() {
  

    return (
      <div>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        { this.state.users}
      </div>
    );
  }
}


const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);