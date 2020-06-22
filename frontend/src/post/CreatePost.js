import React from "react";
import { isAuthenticated } from "../auth/file.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/fontawesome-free-solid";
import defaultpost from '../images/post.jpg';
import { withRouter } from "react-router";
import { create } from './apiPost.js';


class CreatePost extends React.Component {

constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      photo: "",
      user: {}, 
      error: "",
      fileSize: 0
      
    };
  }

  
/**
* On the Component Mount we will save FormData on the postData variable
* and set authenticated user to the state
*/

componentDidMount() {
  //post Form Data Browser API
this.postData = new FormData()
this.setState({user: isAuthenticated().user});
  
}

/**
* Validation of the create post page
* validate photo, title, content(body)
*/

validate (){
    const { title, body, fileSize} = this.state;
    if (fileSize > 10000) {
      this.setState({error: "Filesize should be less than 100kb "})
      return false;
    }
    if (title.length === 0 || body.length === 0) {
      this.setState({error: "All fields are required"})
      return false;
    }   
    return true;
}

handleChange = name => event => {
  this.setState({error: ""});
    
    //if the name is 'photo' take event.target.files the first []
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    //get the fileSize and save it to the state if the size is not defined get the default value of fileSize
    const fileSize = name === 'photo' ? event.target.files[0].size: 0;

    //save the values on the postData 
    this.postData.set(name, value)

    this.setState({[name]: value, fileSize});
  }

/**
* validate title, body and photo if they are correct go ti next step 
* handle server response from create method and if there is an error set it to the state
* if there is no error do the update and redirect to user profile page
*/

createpost () {
 if (this.validate()) {
 	//take the user id and token from the local storage
    const userId = isAuthenticated().user._id;
    const tokenkey = isAuthenticated().token;
    //this.postData --> send the postData to the backend
    create(userId, tokenkey, this.postData)
    .then(data => {
     if (data.error) 
      this.setState({error: data.error})
     else 
     //console.log("New Post:", data)
       this.props.history.push(`/`)

      })
   
 }
    
 
};

render() {

const photoUrl = this.state.id ? `${process.env.REACT_APP_API_URL}/user/photo/${this.state.id}?${new Date().getTime()}` : defaultpost;
    return (
<div className="edit">
      <div className="container cont">
        <h2 className="mt-5 mb-5 text-center font1">
          <FontAwesomeIcon icon={faPlusCircle} /> Add new Post
        </h2>
        <img 
        src={photoUrl} 
        alt={this.state.name}
        
        className="card-img-top mb-4"
        style={{width: '20%'}}
        onError = {index => (index.target.src = `${defaultpost}`)}

        />
        
         <div 
         className="alert alert-danger"
         style={{display: this.state.error ? "": "none"}}>
         {this.state.error}
         </div>
          <div className="form-group">
          <label className="text-light font">Post Photo: </label>
          <input
            type="file"
            onChange={this.handleChange("photo")}
            accept="image/*"
            className="form-control bg-light"
            
          />
        </div>

        <div className="form-group">
          <label className="text-light font">Title: </label>
          <input
            type="text"
            onChange={this.handleChange("title")}
            value={this.state.title}
            className="form-control bg-light"
            name="name"
            required
          />
        </div>
        <div className="form-group">
          <label className="text-light font">Post Body: </label>
          <textarea
            type="text"
            onChange={this.handleChange("body")}
            value={this.state.body}
            className="form-control bg-light"
            name="about"
            maxLength="500"
            required
          />
        </div>
        
        <button
          className="btn btn-raised btn-primary"
          onClick={() => this.createpost()}
        >
          Add new Post
        </button>
      </div>

     </div>



    );
  }

  
}

export default withRouter(CreatePost);