import React from 'react';

class NavbarItemsComponent extends React.Component {
  constructor(props){
    console.log('NavbarItems Props | ', props);
    super(props);
    this.state = {
      userInput: '',
      passInput: '',
      signedUp: true
    }
    // bind methods here
    this.navItemClicked = this.navItemClicked.bind(this);
    this.switchSignUpScreen = this.switchSignUpScreen.bind(this);
  }

  // place methods here
  navItemClicked(e){
    e.preventDefault();
    this.props.loginUser(this.state.userInput);
    this.setState({
      userInput: ''
    })
  }

  navItemClicked2(e){
    e.preventDefault();
    this.props.signUpUser(this.state.userInput);
    this.setState({
      userInput: ''
    })
  }

  switchSignUpScreen () {
    this.setState({
      signedUp: !this.state.signedUp
    })
  }

  logout(e){
    this.props.logout();
  }

  render(){
    if(this.props.loggedIn){
      return (
        <ul className='navbar-items'>
          <li className='title'>Where You At</li>
          <li onClick={(e) => this.props.logout(e)}>Logout</li>
        </ul>
      )
    } else {
      if(this.state.signedUp) {
        return (
          <div className='login-container'>
            <div className='login-box'>
              <div>
              <div className='login'>
                <h3 className='loginBut'>LogIn</h3>
                <h3 onClick={(e) => this.switchSignUpScreen()}>SignUp</h3>
              </div>
              </div>
              <label>{this.props.loginError}</label>
              <form action="">
                <div className='username-box'>
                  <label htmlFor="">Username</label>
                  <input type="text" placeholder='username'
                  onChange={(e) => {
                    this.setState({
                      userInput: e.target.value
                    })
                  }}
                  value={this.state.userInput}/>
                </div>
                <div className='password-box'>
                  <label htmlFor="">Password</label>
                  <input type="text" placeholder='password'
                  onChange={(e) => {
                    let input = e.target.value.split('');
                    for (let i = 0; i < input.length; i++) {
                      input[i] = '*';
                    }
                    input = input.join('');
                    console.log(input);
                    this.setState({
                      passInput: input
                    })
                  }}
                  value={this.state.passInput}/>
                </div>
                <div>
                  <button
                    className='login-btn'
                    onClick={(e) => {this.navItemClicked(e); this.props.getLocation()}}>Sign in</button>
                </div>
              </form>
            </div>
          </div>
        )
      } else {
        return (
          <div className='login-container'>
            <div className='signin-box'>
              <div className='login'>
                <h3 className='loginBut' onClick={(e) => this.switchSignUpScreen()}>LogIn</h3>
                <h3>SignUp</h3>
              </div>
              <label>{this.props.loginError}</label>
              <form action="">
                <div className='username-box'>
                  <label htmlFor="">Username</label>
                  <input type="text" placeholder='username'
                  onChange={(e) => {
                    this.setState({
                      userInput: e.target.value
                    })
                  }}
                  value={this.state.userInput}/>
                </div>
                <div className='password-box'>
                  <label htmlFor="">Password</label>
                  <input type="text" placeholder='password'
                  onChange={(e) => {
                    let input = e.target.value.split('');
                    for (let i = 0; i < input.length; i++) {
                      input[i] = '*';
                    }
                    input = input.join('');
                    console.log(input);
                    this.setState({
                      passInput: input
                    })
                  }}
                  value={this.state.passInput}/>
                </div>
                <div>
                  <button
                    className='login-btn'
                    onClick={(e) => {this.navItemClicked2(e); this.props.getLocation()}}>Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    }
  }
}

export default NavbarItemsComponent;
