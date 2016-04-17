import React from 'react';
import ReactDOM from 'react-dom';
const socket = io('http://localhost:3000');

class Messenger extends React.Component {

  constructor(props){

    // required
    super(props);

    this.props.Session = {
      project: {
        id: 'testProject',
        projectName: 'Time Machine'
      },
      users: [
        { id: 'testUser0', firstName: 'Brian', lastName: 'Dennis'},
        { id: 'testUser1', firstName: 'Jake', lastName: 'Dex'},
        { id: 'testUser2', firstName: 'Elon', lastName: 'Musk'},
        { id: 'testUser3', firstName: 'Albert', lastName: 'Einstein'},
      ]
    }
  }

  render(){
    return (
      <div id='messengerContainer'>
        <div id='titleContainer'>
          <h1>{this.props.thread}</h1>
        </div>
        <div>
          {this.props.Session.users.forEach( (user) => {
            return `${user.firstName} ${user.lastName}`;
          })}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Messenger thread={'testThread'} />, document.getElementById('app'));
