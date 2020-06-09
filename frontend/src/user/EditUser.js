import React from "react";
import { isAuthenticated, signout } from "../auth/file.js";
import { withRouter } from "react-router";
import { remove } from './apiUsers.js';


class EditUser extends React.Component {

constructor(props) {
    super(props);

    this.state = {
     user: ""
    }
  }

render() {
	return (
    <div className="container">
    <h2> Edit Profile </h2>
    </div>

	)
}

	
}

export default withRouter(EditUser);