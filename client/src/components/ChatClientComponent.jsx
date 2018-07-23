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

    //When a user disconnects, update number of users in chat
    this.socket.on('disconnect', (count) => {
      this.setState({
        numUsers: count
      }, () => console.log('User Disconnected: ', this.state.numUsers))
    })
  }

  //Call disconnect() when user closes browser/navigates away
  componentDidMount() {
    window.onbeforeunload = this.disconnect;
  }

  //Decrease number of users in chat, Tell server to delete this users coordinates
  disconnect(){
    this.socket.disconnect();
    axios.post('/chat/leave', {latitude: this.state.latitude, longitude: this.state.longitude});
  }


  handleMessage(data) {
    this.props.handleRecieveMessage(data);
  }

  // click event for sending user's chat message to server
  sendMessage(e){
    e.preventDefault();
    // emit a chat message from your client to your server with the obj
    this.socket.emit('chat message', {
      user: this.props.username,
      message: this.state.userInput
    });
  }

  //save friend when you click on the friend in the chat
  saveFriend(friend, username) {
    //Check if you already have this friend (There are cleaner ways this can be implemented)
    axios.get(`/whereyouat/${username}/friends`)
    .then((response) => {
      let newFriends = response.data.map((friendObject) => {
        return friendObject.friend;
      });
      this.setState({
        saveClickedFriend: friend
      })

      if (!newFriends.includes(friend)) {
        //If not, add this frien
        axios.post(`/whereyouat/${username}/friends`, {
          username: this.props.username,
          fromWho: friend
        }).then((res)=> {
          //call getFriends to pull fresh friend list from server
          this.props.getFriends(username)
        })
      }
    }
  )}

  //save messsage to favorites when user clicks on it
  saveMessage(message, user) {
    axios.post(`/whereyouat/${this.props.username}/messages`, {
      username: this.props.username,
      favoriteMessage: message,
      fromWho: user
    }).then((response) => {
      console.log('message saved')
    }).catch((err) => {
      console.error('messgae save failure');
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
                  className='user-message'>: {chat.message} </li>
                  <li className='save-icon-container' onClick={(e) => this.saveMessage(chat.message, chat.user)}>
                    <i className="fas fa-save"></i>
                  </li>
                </div>
              )
            )}
          </ul>
        </div>
        <form action="" onSubmit={(e) => {this.sendMessage(e); this.setState({userInput: ''})}}>
          <i className="fas fa-keyboard"
          //Show/hide keyboard icon when showing/hiding favoriteMessages of a friend
          style={this.props.chatInputIsVisible ? {display: 'inline-block'} : {display: 'none'}}></i>
          <input
            onChange={(e) => this.setState({userInput: e.target.value})}
            id="messageInput"
            placeholder='type message'
            autoComplete="off"
            required type='text'
            value={this.state.userInput}
            //Show/hide chat input when showing/hiding favoriteMessages of a friend
            style={this.props.chatInputIsVisible ? {display: 'inline-block'} : {display: 'none'}}
          />
        </form>
      </div>
    )
  }
}

export default ChatClientComponent;
