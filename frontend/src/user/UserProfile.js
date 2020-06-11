import React from "react";
import { isAuthenticated } from "../auth/file.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-solid";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { readuserdata } from './apiUsers.js';
import profileimg from '../profileimg/icon.jpg';
import DeleteUser from './DeleteUser';





class UserProfile extends React.Component {
constructor(props) {
    super(props);

    this.state = {
     user: ""
    }
  }

/**
*
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
  const userId = this.props.match.params.userId;
//show the image on the edit user profile after upload, if no image show the default imgage
const photoUrl = this.state.user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${userId}?${new Date().getTime()}` : profileimg

	return (
    <div className="welcome">
    <div className="container">
            <h2 className= "control-group cont2 text-center  font1"><FontAwesomeIcon icon={faUser} /> User Profile:</h2>
            
                
       <div className="cont2 text-center">
          <img 
        src={photoUrl} 
        alt={this.state.name}
        className="card-img-top"
        style={{width: '20%'}}
        onError = {index => (index.target.src = `${profileimg}`)}
      />

            
			<p><b> Username:</b> {this.state.user.name} </p> 

			<p><b> Email:</b> {this.state.user.email} </p>
      <p><b> About me:</b> {this.state.user.about} </p>
			<p> <i>{`Account created at ${new Date(this.state.user.created_at).toDateString()}`}</i></p> 
      


     
      {isAuthenticated().user && isAuthenticated().user._id === this.state.user._id && (
        <>
         <div 
        className="d-inline-block mt-5">
          <Link 
          className="btn btn-raised btn-success mr-5"
          to={`/user/edit/${this.state.user._id}`}>
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