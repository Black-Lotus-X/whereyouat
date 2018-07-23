import React from 'react';

class Login extends React.Component {
  constructor(props){
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

  //Login button or submit
  navItemClicked(e){
    e.preventDefault();
    this.props.loginUser(this.state.userInput);
    this.setState({
      userInput: ''
    })
  }

  //Signup button or submit
  navItemClicked2(e){
    e.preventDefault();
    this.props.signUpUser(this.state.userInput);
    this.setState({
      userInput: ''
    })
  }

  //Toggle between signup and login box
  switchSignUpScreen () {
    this.setState({
      signedUp: !this.state.signedUp
    })
  }

  //logout user
  logout(e){
    this.props.logout();
  }


  render(){
      //Show login screen if this is true. signedUp is a poor choice of variable name.
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
                    onClick={(e) => {if (this.state.userInput.length > 0) {this.navItemClicked(e); this.props.getLocation()}}}>Sign in</button>
                </div>
              </form>
            </div>
          </div>
        )
        //Else show signup screen
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
                    onClick={(e) => {if (this.state.userInput.length > 0) {this.navItemClicked2(e); this.props.getLocation()}}}>Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    }
  }

export default Login;
