import React from 'react';

//Just used for logout and logo
const NavComponent = (props) => {
  return(
    <nav className='navbar-container'>
      <div className='navbar-logo'>
        <i className="fas fa-chalkboard-teacher"></i>
        <p>WhereYouAt</p>
        <li  
          className='navbar-items' 
          //Show/hide logout if user is logged in/out
          style={props.removeLogoutBtn ? { display: 'block' } : { display: 'none' }}
          onClick={(e) => props.logout(e)}>Logout</li>
      </div>
    </nav>
  )
}

export default NavComponent;
