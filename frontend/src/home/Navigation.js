import React from 'react';
import {Link, Switch} from 'react-router-dom';


class Navigation extends React.Component {

	render(){
		return (
			<div> 
			
			<Link to="/"> Home </Link> 
			<Link to="/signup"> Signup </Link> 
			<Link to="/signin"> Signin </Link> 

			
			</div>)
	}
}

export default Navigation;