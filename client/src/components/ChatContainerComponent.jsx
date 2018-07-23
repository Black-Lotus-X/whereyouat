import React from 'react';
import FriendsListComponent from '../components/FriendsListComponent.jsx';
import ChatClientComponent from '../components/ChatClientComponent.jsx';
import GoogleMapsComponent from '../components/GoogleMapsComponent.jsx';
import axios from 'axios';

class ChatContainerComponent extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      //chatArr is the array of chats that appears in chat. {user: 'username', message: 'blah blah blah'}
      chatArr: [],
      selectedFriend: '',
      chatInputIsVisible: true
    }

    //Kinda hacky. This array save the existing chat when you load a 
    //friend's favorite messages so chat can be restored
    this.savedChat = [];

    // bind methods here
    this.selectFriend = this.selectFriend.bind(this);
    this.handleRecieveMessage = this.handleRecieveMessage.bind(this);
    this.toggleChatInput = this.toggleChatInput.bind(this);
    
  }

  //Select a friend from your friends list to show that users friends
  selectFriend(username) {
    //If user already viewing favorited Messages, restore chat from savedChat.
    if (this.state.selectedFriend.length > 0 && this.state.selectedFriend === username) {
      let newChatArray = this.savedChat.slice();
      this.setState({
        selectedFriend: '',
        chatArr: newChatArray
      })
    } else {
      axios.get(`/whereyouat/${this.props.username}/messages`)
      // Get all messages from server. Filter out the ones from the selected 
      // friend and put them in chat array; Save existing chat to savedChat.
      .then((response) => {
        this.selectedFriend = username;
        let allMessages = response.data;
        this.savedChat = this.state.chatArr.slice();
        let favoriteMessages = [];
        for (let i = 0; i < allMessages.length; i++) {
          if (allMessages[i].fromWho === username) {
            favoriteMessages.push({
              user: allMessages[i].fromWho,
              message: allMessages[i].favoriteMessage
            });
          }
        }
        this.setState({
          chatArr: favoriteMessages,
          selectedFriend: username
        });
      })
    }
  }

  //Add new messages to the chat array
  handleRecieveMessage(dataRecievedFromServer) {
    console.log('UserInput entered: ', dataRecievedFromServer);

    let newArr = this.state.chatArr.slice();
    console.log('DATA RECEIVED FROM SERVER', dataRecievedFromServer);
    
    newArr.push(dataRecievedFromServer);


    this.setState({
      chatArr: newArr,
    })
  }

  //Turn off/on chat bar when favoriteMessage is shown/hidden
  toggleChatInput() {
    this.setState({
      chatInputIsVisible: !this.state.chatInputIsVisible
    })
  }

  render(){
    return(
      <div className='chat-container-component'>
        <FriendsListComponent
          selectedFriend={this.state.selectedFriend}
          username={this.props.username}
          deleteFriend={this.props.deleteFriend}
          friends={this.props.friends}
          selectFriend={this.selectFriend}
          toggleChatInput={this.toggleChatInput}/>
        <ChatClientComponent
          getUserCount={this.props.getUserCount}
          getFriends={this.props.getFriends}
          username={this.props.username}
          chatArr={this.state.chatArr}
          handleRecieveMessage={this.handleRecieveMessage}
          chatInputIsVisible={this.state.chatInputIsVisible}/>
        <GoogleMapsComponent
          long={this.props.long}
          lat={this.props.lat}/>
      </div>
    )
  }
}

export default ChatContainerComponent;
