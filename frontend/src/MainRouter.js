import React from "react";
import {Route, Switch} from "react-router-dom";
import HomePage from './home/HomePage';
import RegisterUser from './user/RegisterUser';
import LoginUser from './user/LoginUser';


class MainRouter extends React.Component {

render() {
	return (
		<div>
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route  path="/register" component={RegisterUser} />
			<Route  path="/login" component={LoginUser} />



		</Switch>
	</div>
		)
}

	
}

export default MainRouter;