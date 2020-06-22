import React from "react";
import { isAuthenticated, signout } from "../auth/file.js";
import { withRouter } from "react-router-dom";
import { remove } from './apiUsers.js';


class DeleteUser extends React.Component {

/**
 * After we click Ok on the condfirmation screen
 * in this function we get the token and user id from the props and remove them
 * if error console log error 
 * else signout and redirect to homepage
*/

deleteaccount = ()=> {
	const tokenkey = isAuthenticated().token;
	const userId = this.props.userId
	remove(userId, tokenkey)
	.then(data => {
    if (data.error) {
      console.log(data.error)
    }
    else 
      
    {isAuthenticated() && isAuthenticated().user.role === "subscriber" ? 
      (
        signout(() => this.props.history.push("/"))
        
      ):

      this.props.history.push("/users")
  }
  	  
  });
}


/**
 * On delete button click, the confirmation screen will be displayed
 * when we click cancel the account will not be deleted
 * when we click Ok the account deleteaccount method will be called
 
*/

deleteConfirmation = () => {
	const answer = window.confirm("Are you sure you want to delete your account?")
	if (answer) {
		this.deleteaccount()
	}
}

render() {
	return (
    <div>
    <button onClick = {this.deleteConfirmation} className="btn btn-raised btn-danger mr-5">
          Delete Profile
    </button>
    </div>

	)
}

	
}

export default withRouter(DeleteUser);  