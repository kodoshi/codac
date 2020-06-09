import React from "react";
import {Route, Switch} from "react-router-dom";
import HomePage from './home/HomePage';
import RegisterUser from './user/RegisterUser';
import LoginUser from './user/LoginUser';
import Navigation from './home/Navigation'; 
import UserProfile from './user/UserProfile'; 


class MainRouter extends React.Component {

render() {
	return (
		<div>
		<Navigation />
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route exact path="/signup" component={RegisterUser} />
			<Route exact path="/signin" component={LoginUser} />
			<Route exact path="/user/:userId" component={UserProfile} />




		</Switch>
	</div>
		)
}

	
}

export default MainRouter;