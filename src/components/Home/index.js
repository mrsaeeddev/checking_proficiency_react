import React, { Component } from 'react';

import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase/firebase.js';
import Navigation from '../Navigation';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const textareaStyle = {
  width:250 ,
  height:150 ,
}
const INITIAL_STATE = {
  title: '',
  content: '',
  hint: '',
  error: null,
};
class HomePage extends Component {
  constructor(props) {
    super(props);
          this.state = { ...INITIAL_STATE };
  }

onSubmit = (event) => {
    const {
      title,
      content,
      hint,
    } = this.state;

    const {
      history,
    } = this.props;

    db.ref('/notes').push().set({
      title:this.state.title,
      content:this.state.content,
      hint:this.state.hint,
    })
      .then(() => {
        alert('Note added sucessfully');
        this.setState({
          title:'',
          content:'',
          hint:'',
        })
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {

      const {
      title,
      content,
      hint,
      error,
    } = this.state;

    const isInvalid =
      title === '' 
      content === ''
      hint === '';

    return (
      <div>
              <h1>Add your notes here</h1>
      <form onSubmit={this.onSubmit}>
        <input
          value={title}
          onChange={event => this.setState(updateByPropertyName('title', event.target.value))}
          type="text"
          placeholder="Note title"
        />
        <br/>
        <br/>
        <textarea
          value={content}
          onChange={event => this.setState(updateByPropertyName('content', event.target.value))}
          type="text"
          placeholder="Enter content here"
          style={textareaStyle}
        >
        </textarea>
        <br/>
        <br/>
        <input
          value={hint}
          onChange={event => this.setState(updateByPropertyName('hint', event.target.value))}
          type="text"
          placeholder="Enter hint here"
        />
        <br />
        <br />
        <button disabled={isInvalid} type="submit">Add Note</button>
        { error && <p>{error.message}</p> }
      </form>
      </div>
    );
  }
}


const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);