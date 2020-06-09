import React from 'react';
import { withRouter } from "react-router";
import {Link } from 'react-router-dom';
import { isAuthenticated} from '../auth/file.js';



/**
 *  method: if the token exists in the localStorage remove it.
 * Make request to the server and take the json response of it.  
*/
  export const signout = next => {
  if(typeof window !== "undefined") 
    localStorage.removeItem("tokenkey")
    next()
  return  fetch("http://localhost:4242/signout", {
    method: "GET"
  })
  .then((response) => {
    return response.json()
  })
  .catch(err => {console.log(err)})
}



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
			<a 
			className="nav-link text-primary" style={{cursor: "pointer"}}
			onClick={() => signout(() => this.props.history.push('/'))}> 
			Signout 
			</a> 
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