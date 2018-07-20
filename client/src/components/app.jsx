import React from 'react';
import axios from 'axios';
import NavComponent from '../components/NavComponent.jsx';
import ChatContainerComponent from '../components/ChatContainerComponent.jsx';
import Login from '../components/login.jsx';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      login: true,
      username: '',
      friends: [],
      loggedIn: false,
      loginError: '',
      latitude: '',
      longitude: '',
      removeLogoutBtn: true
    }
    // bind methods here
    this.navItemClicked = this.navItemClicked.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.getFriends = this.getFriends.bind(this);
    this.userLogin = this.userLogin.bind(this);
    this.logout = this.logout.bind(this);

    this.getLocation = this.getLocation.bind(this);
    this.signUpUser = this.signUpUser.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
    this.registerLocation = this.registerLocation.bind(this);
    this.pollForCenter = this.pollForCenter.bind(this);

    this.getCenter = this.getCenter.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      var crd = pos.coords;

      let long = crd.longitude
      let lat = crd.latitude
      this.registerLocation(long, lat);
    })
  }

  registerLocation(long, lat) {
    axios.post('/chat', {longitude: long, latitude: lat})
    .then((response) => {
      this.pollForCenter()
    }).catch((err) => {
        console.log(err);
      })
    }

  pollForCenter() {
    this.getCenter;
    setInterval(() => {
      this.getCenter();
    }, 5000);
  }

  getCenter() {
    axios.get('/chat')
      .then((response) => {
        this.setState({
          latitude: response.data.latitude,
          longitude: response.data.longitude
        })
      }).catch((err) => {
        console.log(err);
      })
  }


  signUpUser(username) {
    axios.post('/whereyouat', {
      username: username
    }).then(response => {
      this.setState({
        username: username,
        loggedIn: true,
        loginError: '',
        login: false
      })
    })
  }

  navItemClicked(e){
    e.preventDefault();
    this.setState({
      navItemShow: !this.state.navItemShow
    })
  }

  logout() {
    console.log('LOGOUT WAS CLICKED');
    this.setState({
      login: true,
      username: '',
      removeLogoutBtn: false,
      friends: [],
      loggedIn: false,
      loginError: '',
    })
  }

  userLogin(e) {
    e.preventDefault();

    this.setState({
      login: !this.state.login
    })
  }
  // use methods here
  loginUser(username) {
    console.log('success');
    axios.get(`/whereyouat/${username}`)
    .then((data) => {
      this.setState({
        username: username,
        loggedIn: true,
        loginError: '',
        login: false,
        removeLogoutBtn: true
      })
      this.getFriends(username);
    })
    .catch((err) => {
      //Set error message in login failure
      this.setState({
        loginError: 'User not found'
      })
    })
  }

  getFriends(username) {
    axios.get(`/whereyouat/${username}/friends`)
    .then((response) => {
      console.log('friend response data', response.data)
      if(response.data[0].friend === '') {
        this.setState({
          friends: []
        })
      } else {
        let newFriends = response.data.map((friendObject) => {
          return friendObject.friend;
        });

        this.setState({
          friends: newFriends
        })
      }
    })
  }

  deleteFriend(username, friend) {
    axios.delete(`/whereyouat/${username}/friends`, {
      data: {
        username: username,
        fromWho: friend
      }
    })
    .then((res)=> {
      this.getFriends(username)
      console.log('Sending Delete req to server');
    })
    .catch((res)=>{
      console.log('Sending Delete friend ERROR');
    })
  }

  componentDidMount() {
    window.onbeforeunload = this.disconnect;
  }

  disconnect(){
    axios.post('/chat/leave', {latitude: this.state.latitude, longitude: this.state.longitude});
  }


  render() {
    if(this.state.login){
      return (
        <div>
          <NavComponent
            username={this.state.username}
            userLogin={this.userLogin}
            navItemShow={this.state.navItemShow}
            navItemClicked={this.navItemClicked}
            loginUser={this.loginUser}
            loggedIn={this.state.loggedIn}
            loginError={this.state.loginError}
            logout={this.logout}
            getLocation={this.getLocation}
            signUpUser={this.signUpUser}
          />

          <Login
            username={this.state.username}
            userLogin={this.userLogin}
            navItemClicked={this.state.navItemClicked}
            loginUser={this.loginUser}
            loggedIn={this.state.loggedIn}
            loginError={this.state.loginError}
            logout={this.logout}
            getLocation={this.getLocation}
            signUpUser={this.signUpUser}
          />
        </div>
      )
    } else {
      return (
        <div>
          <NavComponent
            logout={this.logout}
            login={this.state.login}
            removeLogoutBtn={this.state.removeLogoutBtn}
            userLogin={this.userLogin}
            loginUser={this.loginUser}
            loggedIn={this.state.loggedIn}
            loginError={this.state.loginError}
            navItemShow={this.state.navItemShow}
            navItemClicked={this.navItemClicked}
          />

          <ChatContainerComponent
            deleteFriend={this.deleteFriend}
            getFriends={this.getFriends}
            username={this.state.username}
            friends={this.state.friends}
            long={this.state.longitude}
            lat={this.state.latitude}
            username={this.state.username}/>
        </div>
      )
    }

  }
}//test
export default App;
