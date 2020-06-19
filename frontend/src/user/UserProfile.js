  import React from "react";
import { isAuthenticated } from "../auth/file.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-solid";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { readuserdata } from './apiUsers.js';
import profileimg from '../images/icon.jpg';
import DeleteUser from './DeleteUser';
import FollowUnfollowUser from './FollowUnfollowUser';
import UserProfileTabs from './UserProfileTabs';
import { listbyuser } from '../post/apiPost';



class UserProfile extends React.Component {
constructor(props) {
    super(props);

    this.state = {
     user: {following: [], followers: []}, 
     following: false, 
     posts: []    
    }
  }


/**
* @param {string} user object  
* chekFollow method checks the user follow list 
* we need to have the authenticated user
* and match the follower user id with the authenticated user id
*/
checkFollow (user) {
  //we need to have the authenticated user
  const token = isAuthenticated()
  //get the user follow list and find each follower
  const match = user.followers.find(follower => {
    //one user have many followers
    //check if the user id is found ---> means the user is in the followers list 
    return follower._id === token.user._id
  })
  return match
}


/**
* @param {string} userId, id of the authenticated user  
* loadPosts method will load all the post that the single user has created
* We take the Tokenkey from the authenticated user
* we set userId and tokenkey as parameter on the listbyuser method extracted from apiPosts
* from listbyuser method we handle the server response
* in case of error --> console log the error
* else set data to the posts state
*/
loadPosts (userId) {
  //we need to have the authenticated user
  const tokenkey = isAuthenticated().token
  listbyuser(userId, tokenkey).then(data => {
    if(data.error){
      console.log(data.error)
    }
    else {
      this.setState({posts: data})
    }
  })
}


/**
* ClickFollow method takes another method as an argument wich will be called by the child Component
* we take the user id from the authenticated user
* we take the token fron the authenticated user
* we need to have the authenticated user
* callApi will handle the request from the server and check for errors, if there is any error -> set it to the state
* else set the user data to the state and pupolate following (if it was false would be true or oposite)
*/
clickFollow = callApi => {
  const userId = isAuthenticated().user._id;
  const tokenkey = isAuthenticated().token;
  //this metthod will give us the response follow or unfollow
  callApi(userId, tokenkey, this.state.user._id)
  .then(data => {
    if(data.error) this.setState({error: data.error})
    else this.setState ({user: data, following: !this.state.following})
  })
}


/**
* We take the postId from the props params
* We take the Tokenkey from the authenticated user
* we set those parameter to the readuserdata method that we extracted from apiUsers
* Handle the response object from readuserdata method
* if error make a redirection to the signin page -> it means you are not logged in
* if no error set State with data and display user information in the right form
*/

componentDidMount() {
  const userId = this.props.match.params.userId;
  const tokenkey = isAuthenticated().token;
  readuserdata(userId, tokenkey)
  .then(data => {
    if (data.error) {
      this.props.history.push("signin")
    }
    else{
       //based on the checkFollow method the following variable will return true or false
      let following = this.checkFollow(data)
      this.setState({user: data, following});
      //get all posts of the user
      this.loadPosts(data._id)
    }
     
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
  
const photoUrl = this.state.user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${this.state.user._id}?${new Date().getTime()}` : profileimg

	return (
    <div className="welcome">
    <div className="container">
       <h2 className= "control-group cont2 text-center  font1"><FontAwesomeIcon icon={faUser} /> User Profile:</h2>
 <div className="cont2 text-center">
          

  <div className="col md-12 font">
    <hr/>
      <img className="mb-4" src={photoUrl} alt={this.state.name} style={{width: '20%'}}  onError = {index => (index.target.src = `${profileimg}`)}/>
      <p><b><u> Username:</u></b> {this.state.user.name} </p> 
      <p><b><u> Email:</u></b> {this.state.user.email} </p>
      <p><b><u> About me:</u></b> {this.state.user.about} </p>
      <hr/>
      <p className="text-success"> <i>{`Account created at:  ${new Date(this.state.user.created_at).toDateString()}`}</i></p> 
      
     
      <hr/>
  </div>

{/* if the user is logged in and tha authenticated user id matches with the user Id in the state display the information below*/}    
    {isAuthenticated().user && isAuthenticated().user.role !== "admin" && isAuthenticated().user._id === this.state.user._id ? (
      <React.Fragment>
          <div className="row">
            <div className="col md-12 ">
              <hr/>
              <p className=" font text-warning"> <i>{`Account updated at: ${new Date(this.state.user.updated_at).toDateString()}`}</i></p> 
              <hr/>
            </div>
          </div>

          <div className="d-inline-block">
            <Link className="btn btn-raised btn-success mr-5" to={`/user/edit/${this.state.user._id}`}>
            Edit Profile
            </Link>
          </div>
          <div className="d-inline-block">
            <DeleteUser userId={this.state.user._id} />
          </div>
          <hr/>
      </React.Fragment>
        ): <FollowUnfollowUser following={this.state.following} onButtonClick={this.clickFollow} />
    }

{/* if the user is not logged in display FollowUnfollowUser Component with the following and onButtonClick props*/}    


    <div>
  {/* if the user is logged in and has the admin role display there 2 Buttons*/}    
      {isAuthenticated().user && isAuthenticated().user.role === "admin" && (
        <div class="card mt-5">
          <div className="card-body ">
            <h5 className="card-title text-dark"> Admin </h5>
            <p className="mb-2 text-danger"> Edit/Delete as an Admin </p>
            <Link
            className="btn btn-raised btn-success mr-5"
            to={`/user/edit/${this.state.user._id}`}
            >
              Edit Profile
            </Link>
            <DeleteUser userId={this.state.user._id} />
          </div>
        </div>
      )}
    </div>
     <hr/>
    <UserProfileTabs 
    followers={this.state.user.followers} 
    following={this.state.user.following}
    posts={this.state.posts}/>
</div>
</div>
</div>
)
}
}

export default withRouter(UserProfile);