import React from 'react';

class FriendsListComponent extends React.Component {
  constructor(props){
    super(props);
    // bind methods here
  }

  render(){
    return(
      <div className='friends-list-container'>
        <div className='socket-chat-title-box'>
          <h2>Friends List</h2>
        </div>
        <ul>
          {this.props.friends.map((friend, i) =>
            <div className='friendsList'>
                <i className="fas fa-user"></i>
                <li
                  onClick={(e) => this.props.deleteFriend(this.props.username, e.target.innerHTML)}
                  key={i}>{friend}</li>
                <i 
                className="fas fa-heart"
                onClick={(e) => {this.props.selectFriend(friend); this.props.toggleChatInput()}}
                style={(this.props.selectedFriend.length === 0 || this.props.selectedFriend === friend) ? {display: 'block'} : {display: 'none'}}></i>  
            </div>
          )}
        </ul>
        <div className='no-friends'>
          <i
            style={this.props.friends.length > 0 ? {display: 'none'} : {display: 'block'}}
            className="fas fa-sad-tear">
          </i>

        </div>
      </div>
    )
  }
}

export default FriendsListComponent;
