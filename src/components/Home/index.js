import React, { Component } from 'react';
import { FormControl, Button, FormGroup, Jumbotron } from 'react-bootstrap';
import withAuthorization from '../Session/withAuthorization';
import { db } from '../../firebase/firebase.js';
import Navigation from '../Navigation';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const textareaStyle = {
  width: 320,
  height: 150,
}

const formStyles = {
  width: 340,
  margin: 0,
  paddingTop: 30,
  paddingLeft:10,
  paddingRight: 10,
  borderRadius: 15,

}

const INITIAL_STATE = {
  title: '',
  content: '',
  hint: '',
  normalState: true,
  filterState: false,
  searchedVal: '',
  filterData: [],
  arrdata: [],
  error: null,
};
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.searchByName = this.searchByName.bind(this);
  }

  onSubmit = (event) => {
    const {
      title,
      content,
      hint,
      arrdata,
    } = this.state;

    const {
      history,
    } = this.props;

    db.ref('/notes').push().set({
      title: this.state.title,
      content: this.state.content,
      hint: this.state.hint,
    })
      .then(() => {
        alert('Note added sucessfully');
        this.setState({
          title: '',
          content: '',
          hint: '',
        })
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }


  componentWillMount() {
    let database = db.ref('/notes')
    database.on('child_added', snap => {
      let arrayToPushedData = this.state.arrdata;
      arrayToPushedData.push(snap.val());
      this.setState({
        arrdata: arrayToPushedData
      })

    })
  }
  searchByName = (text) => {
    let arrayToPushedData = this.state.arrdata;
    this.setState({ searchedVal: text.target.value })
    console.log(text.target.value)
    arrayToPushedData = arrayToPushedData.filter((data) => data.title.toLowerCase().indexOf(text.target.value) !== -1);
    console.log(arrayToPushedData)
    if (text == '') {
      this.setState({
        normalState: true,
        filterState: false
      })

    }
    else {
      this.setState({
        filterState: true,
        normalState: false,
        filterData: arrayToPushedData,
      })
    }
  }
  render() {

    const {
      title,
      content,
      hint,
      arrdata,
      error,
      searchedVal,
      normalState,
      filterState,
      filterData,
    } = this.state;

    const isInvalid =
      title === ''
    content === ''
    hint === '';

    return (
      <div>
        <FormControl
          value={this.state.searchedVal}
          onChange={(text) => this.searchByName(text)}
          type="text"
          placeholder="Search here"
        />
        <br />
        <Jumbotron style={formStyles}>
        <h3>Add your notes here</h3>
        
        <FormGroup onSubmit={this.onSubmit}>

          <br />
          <br />
          <FormControl
            value={title}
            onChange={event => this.setState(updateByPropertyName('title', event.target.value))}
            type="text"
            placeholder="Note title"
          />
          <br />
          <br />
          <FormControl
            value={content}
            onChange={event => this.setState(updateByPropertyName('content', event.target.value))}
            type="text"
            placeholder="Enter content here"
            style={textareaStyle}
          />
      
          <br />
          <br />
          <FormControl
            value={hint}
            onChange={event => this.setState(updateByPropertyName('hint', event.target.value))}
            type="text"
            placeholder="Enter hint here"
          />
          <br />
          <br />
          <Button disabled={isInvalid} type="submit">Add Note</Button>
          {error && <p>{error.message}</p>}
        </FormGroup>
        </Jumbotron>
        <div>
          {this.state.normalState && this.state.arrdata.map((v, i) => {
            return (
              <div key={i}>
                <p>{v.title}</p>
                <p>{v.content}</p>
                <p>{v.hint}</p>
              </div>)
          })}
        </div>
        <div>
          {this.state.filterState && this.state.filterData.map((v, i) => {
            return (
              <div key={i}>
                <p>{v.title}</p>
                <p>{v.content}</p>
                <p>{v.hint}</p>
              </div>)
          })}
        </div>
      </div>
    );
  }
}


const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);