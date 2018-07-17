import React from 'react';

class NavbarItemsComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userInput: ''
    } 
    // bind methods here
    this.navItemClicked = this.navItemClicked.bind(this);
  }

  navItemClicked(e){
    e.preventDefault();
    this.props.loginUser(this.state.userInput);
  }
  // place methods here

  render(){
    if(this.props.loggedIn){
      return (
        <ul className='navbar-items'>
          <li className='title'>Where You At</li>
          <li onClick={(e) => this.navItemClicked(e)}>Logout</li>
        </ul>
      )
    } else {
      return (
        <div className='login-container'>
          <div className='login-box'>
            <div className='login'>
              <h3>Login</h3>
            </div>
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
                <input type="text" placeholder='password'/>
              </div>
              <div>
                <button
                  className='login-btn'
                  onClick={(e) => this.navItemClicked(e)}>Sign in</button>
              </div>
            </form>
          </div>
        </div>
      )
    }
  }
}

export default NavbarItemsComponent;