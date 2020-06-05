import React from 'react';
import { withRouter } from "react-router";

import {Link, Switch} from 'react-router-dom';





class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     
    };
  }


  // sign out function 
  signout (next) {
  	// if the token exists 
	if(typeof window !== "undefined") 
		// remove token from localstorage
		localStorage.removeItem("tokenkey")
		next()
		//make the http request to the server
	return  fetch("http://localhost:4242/signout", {
		method: "GET"
	})
	.then((response) => {
		//console.log(response)
		return response.json()
	})
	.catch(err => {console.log(err)})
}

//check if the user is logged in 
isAuthenticated (){
	
	if(typeof window == "undefined"){
		return false
	}
	if(localStorage.getItem("tokenkey")){
		return JSON.parse(localStorage.getItem("tokenkey"))		
	}
	else {
		return false
	}
}; 

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
	{!this.isAuthenticated() && (
		<>
			<li className="nav-item">
				<Link className="nav-link" to="/signup"> Signup </Link>
			</li>
			<li className="nav-item">
				<Link className="nav-link" to="/signin"> Signin </Link> 
			</li>
		</>
	)}

			{this.isAuthenticated() && (
				<>
			<li className="nav-item">
				<a 
				className="nav-link text-primary" 
				style={{cursor: "pointer"}}
				onClick={() => this.signout(() => this.props.history.push('/'))}> Signout </a> 
			</li>
			<li className="nav-item">
				<a className="nav-link text-primary" 
				> {this.isAuthenticated().user.name} </a> 
			</li>
			</>
			)}
    </ul>
  </div>
</nav>










			)
	}
}

export default withRouter(Navigation);