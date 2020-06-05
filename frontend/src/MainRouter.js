import React from "react";
import {Route, Switch} from "react-router-dom";
import HomePage from './home/HomePage';
import RegisterUser from './user/RegisterUser';
import LoginUser from './user/LoginUser';
import Navigation from './home/Navigation'; 


class MainRouter extends React.Component {

render() {
	return (
		<div>
		<Navigation />
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route  path="/signup" component={RegisterUser} />
			<Route  path="/signin" component={LoginUser} />



		</Switch>
	</div>
		)
}

	
}

export default MainRouter;