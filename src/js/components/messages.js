import React from 'react';
import ReactDOM from 'react-dom';
import GenerateSession from 'session';

class Messenger extends React.Component {

  constructor(){

    // required
    super();
    this.Session = SessionFunc();



  }

  render(){
    console.log(this.Session.toString());
    return <div id='messengerContainer'>

           </div>;
  }
}

ReactDOM.render(<Messenger />, document.getElementById('app'));
