import React from "react";
import {Route, Switch} from "react-router-dom";
import HomePage from './home/HomePage';
import RegisterUser from './user/RegisterUser';
import LoginUser from './user/LoginUser';
import Navigation from './home/Navigation'; 
import UserProfile from './user/UserProfile';
import User from './user/User'; 
import EditUser from './user/EditUser';
import PrivateRoute from './auth/PrivateRoute'; 




class MainRouter extends React.Component {

render() {
	return (
	<div>
	<Navigation />
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route exact path="/signup" component={RegisterUser} />
			<Route exact path="/signin" component={LoginUser} />
			<PrivateRoute exact path="/user/edit/:userId" component={EditUser} />
			<PrivateRoute exact path="/user/:userId" component={UserProfile} />
			<Route exact path="/users" component={User} />
		</Switch>
	</div>
		)
}

	
}

export default MainRouter;