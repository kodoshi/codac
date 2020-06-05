import React from 'react';
import {Link, Switch} from 'react-router-dom';


class Navigation extends React.Component {

	render(){
		return (
	
		


<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
<p class="navbar-brand logo text-primary" >Albanian Facebook</p>
</div>
    <ul class="nav navbar-tabs">
      <li className="nav-item">
				<Link className="nav-link" to="/"> Home </Link> 
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/signup"> Signup </Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/signin"> Signin </Link> 
			</li>
    </ul>
  </div>
</nav>










			)
	}
}

export default Navigation;