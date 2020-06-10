import React from "react";
import { isAuthenticated } from "../auth/file.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/fontawesome-free-solid";

import { withRouter } from "react-router";
import { update, readuserdata} from './apiUsers.js';


class EditUser extends React.Component {

constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      id: "", 
      error: ""
    };
  }

  

/**
* When the page will be loaded and we are on the Edit profile page all the user data will be read and set to the state
* if there is an error we will be redirect to the user profile
*/

componentDidMount() {
  //user Form Data Browser API
  this.userData = new FormData()
  const userId = this.props.match.params.userId;
  const tokenkey = isAuthenticated().token;
  readuserdata(userId, tokenkey)
  .then(data => {
    if (data.error) {
      this.props.history.push(`../${this.state.id}`)
    }
    else 
      this.setState({id: data._id, name: data.name, email:data.email});
  });

  
}

/**
* Validation of the edit profile page
* validate name, email and password
*/

validate (){
    const { name, email, password } = this.state;
    if (name.length === 0) {
      this.setState({error: "Name is required"})
      return false;
    }
    if (!/.+\@.+\..+/.test(email)) {
      this.setState({error: "Email should be in the right format"})
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({error: "Password must contain at least 6 characters"})
      return false;
    }
    return true;
}

handleChange = name => event => {
    
    //if the name is 'photo' take event.target.files the first []
    const value = name === 'photo' ? event.target.files[0] :event.target.value

    //save the values on the userData 
    this.userData.set(name, value)

    this.setState({[name]: value});
  }

/**
* validate name, email and password if they are correct go ti next step (u can use the current password || new one)
* handle server response from update method and if there is an error set it to the state
* if there is no error do the update and redirect to user profile page
*/

editprofile () {
 if (this.validate()) {
  const { name, email, password } = this.state;
    const user = {
        name,
        email,
        password: password || "undifined"
       }

    const userId = this.props.match.params.userId;
    const tokenkey = isAuthenticated().token;
    //this.userData --> send the userData to the backend
    update(userId, tokenkey, this.userData)
    .then(data => {
     if (data.error) 
      this.setState({error: data.error})
     else 
      this.props.history.push(`../${this.state.id}`)
    }) 
 }
    
 
};



render() {
    return (
<div className="edit">
      <div className="container cont ">
        <h2 className="mt-5 mb-5 text-center font1">
          <FontAwesomeIcon icon={faEdit} /> Edit Profile
        </h2>
        
         <div 
         className="alert alert-danger"
         style={{display: this.state.error ? "": "none"}}>
         {this.state.error}
         </div>
          <div className="form-group">
          <label className="text-light font">Profile Photo: </label>
          <input
            type="file"
            onChange={this.handleChange("photo")}
            accept="image/*"
            className="form-control bg-light"
            
          />
        </div>

        <div className="form-group">
          <label className="text-light font">Username: </label>
          <input
            type="text"
            onChange={this.handleChange("name")}
            value={this.state.name}
            className="form-control bg-light"
            name="name"
            required
          />
        </div>

        <div className="form-group ">
          <label className="text-light font">Email: </label>
          <input
            type="email"
            onChange={ this.handleChange("email")}
            value={this.state.email}
            className="form-control bg-light"
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <label className="text-light font">Password: </label>
          <input
            type="password"
            onChange={this.handleChange("password")}
            value={this.state.password}
            className="form-control bg-light"
            name="password"
            required
          />
        </div>
      
        <button
          className="btn btn-raised btn-primary"
          onClick={() => this.editprofile()}
        >
          Edit
        </button>
      </div>

     </div>



    );
  }

  
}

export default withRouter(EditUser);