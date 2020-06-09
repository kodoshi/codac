import React from "react";
import { isAuthenticated } from "../auth/file.js";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { readuserdata } from './apiUsers.js';
import profileimg from '../profileimg/img.jpg';
import DeleteUser from './DeleteUser';





class UserProfile extends React.Component {
constructor(props) {
    super(props);

    this.state = {
     user: ""
    }
  }

/**
 * Handle the response object from readuserdata method
 * if no error set State with data and display user information in the right form
 * if error make a redirection to the signin page -> it means you are not logged in
*/

componentDidMount() {
  const userId = this.props.match.params.userId;
  const tokenkey = isAuthenticated().token;
  readuserdata(userId, tokenkey)
  .then(data => {
    if (data.error) {
      this.props.history.push("signin")
    }
    else 
      this.setState({user: data});
  });
}

componentWillReceiveProps(props) {
  const userId = this.props.match.params.userId;
  const tokenkey = isAuthenticated().token;
  readuserdata(userId, tokenkey)
  .then(data => {
    if (data.error) {
      this.props.history.push("signin")
    }
    else 
      this.setState({user: data});
  });
}


render() {
	return (
    <div className="welcome">
    <div className="container">
            <h2 className= "control-group container text-center bg-secondary font1">User Profile:</h2>
            
                
            <div className="container text-center bg-secondary font">
         <img className= "card-img-top" src={profileimg} alt={this.state.user.name} style={{width: '15%'}}/>


            
			<p><b> Username:</b> {this.state.user.name} </p> 

			<p><b> Email:</b> {this.state.user.email} </p>
			<p> <i>{`Account created at ${new Date(this.state.user.created_at).toDateString()}`}</i></p> 
      


     
      {isAuthenticated().user && isAuthenticated().user._id === this.state.user._id && (
        <>
         <div 
        className="d-inline-block mt-5">
          <Link 
          className="btn btn-raised btn-success mr-5"
          to={`/user/edit/` + this.state.user._id}>
          Edit Profile
          </Link>
        </div>
        <div 
        className="d-inline-block mt-5">
          <DeleteUser userId={this.state.user._id} />
        </div>
          </>
        )}
       </div>

		

      </div>
            </div>

		)
}

	
}

export default withRouter(UserProfile);