import React from 'react';
import io from 'socket.io-client';

class ChatClientComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userInput: '',
      chatArr: [],
      currentUserSpeaking: ''
    }
    this.socket = io();

    // bind methods here
    this.sendMessage = this.sendMessage.bind(this);
    this.handleRecieveMessage = this.handleRecieveMessage.bind(this);
    
    // listens to chat message event coming from server
    this.socket.on('chat message', (data) => {
      console.log('chat message data', data);
      this.handleRecieveMessage(data)
    });
    // this.socket.on('chat message', (data) => {})
  }

  // place methods here


  handleRecieveMessage(dataRecievedFromServer) {
    console.log('UserInput entered: ', dataRecievedFromServer);

    let newArr = this.state.chatArr.slice();
    
    newArr.push([dataRecievedFromServer.user, dataRecievedFromServer.message]);


    this.setState({
      chatArr: newArr,
      currentUserSpeaking: dataRecievedFromServer.user
    }, () => console.log(this.state.chatArr))
  }

  // click event for sending data to server
  sendMessage(e){
    e.preventDefault();
    // emit a chat message from your client to your server with the obj
    this.socket.emit('chat message', {
      user: this.props.username,
      message: this.state.userInput 
    });

    // this.handleMessages({
    //   // maybe i should be passing the user name in here too?
    //   message: this.state.userInput
    // });
    //listen for events coming back from server
  }

  render(){
    return(
      <div className='chat-client-container'>
        <div className='socket-chat-title-box'>
          <h2>Welcome to Live Chat</h2>
        </div>
        <div className='socket-chat-container'>
          <ul id="messages">
            {this.state.chatArr.map((chat, i) =>
              <li key={i}>{chat[0]}: {chat[1]}</li>
            )}
          </ul>
        </div>
        <form action="" onSubmit={this.sendMessage}>
          <input
            onChange={(e) => this.setState({userInput: e.target.value})}
            id="messageInput" 
            placeholder='type message' 
            autoComplete="off" 
            required type='text' 
          />
        </form>
      </div>
    )
  }
}

export default ChatClientComponent;