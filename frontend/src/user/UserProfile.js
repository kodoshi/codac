import React from "react";
import { isAuthenticated } from "../auth/file.js";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-solid";



class UserProfile extends React.Component {
constructor(props) {
    super(props);

    this.state = {
     user: "",
     userId: this.props.match.params.userId
    }
  }

componentDidMount() {
  
  fetch('http://localhost:4242/user/' + this.state.userId, {
    method: "GET",
    headers: {
    	Accept: "application/json",
    	"Content-Type": "application/json",
    	Authorization: `Bearer ${isAuthenticated().token}`
		  }
  })
  .then(response => {
    return response.json()
  })
  .then(data => {
    if (data.error) {
    	console.log("ERROR")
    }
    else 
      console.log(data)
  });

}

render() {
	return (
			<div className="container">
			<h2 className="mt-5 mb-5"> Profile </h2>
			<p><b> Username:</b> {isAuthenticated().user.name} </p> 

			<p><b> Email:</b> {isAuthenticated().user.email} </p>
			<p>{`Account created at ${new Date().toLocaleString()}`}</p> 

		</div>
		)
}

	
}

export default UserProfile;