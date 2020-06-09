import React from 'react';
import { withRouter } from "react-router";
import {Link } from 'react-router-dom';
import { signout, isAuthenticated} from '../auth/file.js';


class Navigation extends React.Component {

 render(){
	
		return (
	
<nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
<p className="navbar-brand logo text-primary" >Albanian Facebook</p>
</div>
    <ul className="nav navbar-tabs">
    <li className="nav-item">
		<Link className="nav-link" to="/"> Home </Link> 
	</li>
	<li className="nav-item">
			<Link 
			className="nav-link text-primary" 
			to={'/users/'}> Users 
			</Link>
		 
		</li>
	{!isAuthenticated() && (
		<React.Fragment>
			<li className="nav-item">
				<Link className="nav-link" to="/signup"> Signup </Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/signin"> Signin </Link> 
			</li>
		</React.Fragment>
	)}

	{isAuthenticated() && (
		<React.Fragment>
		<li className="nav-item">
			<span
			className="nav-link text-primary" style={{cursor: "pointer"}}
			onClick={() => signout(() => this.props.history.push('/'))}> 
			Signout 
			</span> 
		</li>
		<li className="nav-item">
			<Link 
			className="nav-link text-primary" 
			to={'/user/' + isAuthenticated().user._id}> {isAuthenticated().user.name} 
			</Link>
		 
		</li>
		</React.Fragment>

	)}
    </ul>
  </div>
</nav>
	)
	}
}

export default withRouter(Navigation);