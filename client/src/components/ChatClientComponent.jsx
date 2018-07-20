import React from 'react';
import io from 'socket.io-client';
import axios from 'axios';

class ChatClientComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userInput: '',
      saveClickedFriend: '',
      numUsers: 0
    }

    this.socket = io();

    // bind methods here
    this.sendMessage = this.sendMessage.bind(this);
    this.saveFriend = this.saveFriend.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.disconnect = this.disconnect.bind(this);
    
    // listens to chat message event coming from server
    this.socket.on('chat message', (data) => {
      console.log('chat message data', data);
      this.handleMessage(data);
    });

    // listen for client connect
    this.socket.on('user count', (count) => {
      this.setState({
        numUsers: count
      }, () => console.log('number of active users: ', this.state.numUsers))
    });

    this.socket.on('disconnect', (count) => {
      this.setState({
        numUsers: count
      }, () => console.log('User Disconnected: ', this.state.numUsers))
    })
  }

  // PLACE METHODS HERE


  componentDidMount() {
    window.onbeforeunload = this.disconnect;
  }

  disconnect(){
    this.socket.disconnect();
    axios.post('/chat/leave', {latitude: this.state.latitude, longitude: this.state.longitude});
  }

  handleMessage(data) {
    this.props.handleRecieveMessage(data);
  }

  // click event for sending data to server
  sendMessage(e){
    e.preventDefault();
    // emit a chat message from your client to your server with the obj
    this.socket.emit('chat message', {
      user: this.props.username,
      message: this.state.userInput
    });
  }

  saveFriend(friend, username) {
    axios.get(`/whereyouat/${username}/friends`)
    .then((response) => {
      let newFriends = response.data.map((friendObject) => {
        return friendObject.friend;
      });
      this.setState({
        saveClickedFriend: friend
      })

      if (!newFriends.includes(friend)) {
        axios.post(`/whereyouat/${username}/friends`, {
          username: this.props.username,
          fromWho: friend
        }).then((res)=> {
          this.props.getFriends(username)
          console.log('Sending friend to server: ', res);
        })
      }
    }
  )}


  saveMessage(message, user) {
    console.log('trying to save message:', message);
    console.log('trying to save user', user)
    axios.post(`/whereyouat/${this.props.username}/messages`, {
      username: this.props.username,
      favoriteMessage: message,
      fromWho: user
    }).then((response) => {
      console.log('message saved');
    }).catch((err) => {
      console.log('messgae save failure');
    })
  }

  render(){
    return(
      <div className='chat-client-container'>
        <div className='socket-chat-title-box'>
          <h2>Welcome to Live Chat</h2>
          <p>Active users: {this.state.numUsers}</p>
        </div>
        <div className='socket-chat-container'>
          <ul id="messages">
            {this.props.chatArr.map((chat, i) => (
                <div>
                  <li
                    className='user'
                    onClick={(e) => this.saveFriend(e.target.innerHTML, this.props.username)}
                    key={i}>{chat.user}
                  </li>
                  <li
                  className='user-message' onClick={(e) => this.saveMessage(chat.message, chat.user)}>: {chat.message} </li>
                  <li className='save-icon-container'>
                    <i className="fas fa-save"></i>
                  </li>
                </div>
              )
            )}
          </ul>
        </div>
        <form action="" onSubmit={this.sendMessage}>
          <i className="fas fa-keyboard"></i>
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
