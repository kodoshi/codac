import React from "react";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-solid";
import './style.css'; 

class RegisterUser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      error: ""
    };
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
      
    });
  }

  registertodb() {
   
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password,
    }
 // send the http request to the server
 fetch("http://localhost:4242/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
      // take the response object from the server
    }).then(function(response) {
      return response.json()
    }).then(data => {
      //if there is an error change the error
    if (data.error) this.setState({error: data.error})
      else 
      // redirect to ligin page 
        this.props.history.push("/signin"); 

  }).catch((err) =>{
        console.log(err)
    });

  };

  render() {
    return (
<div className="body">
      <div className="cont">
        <h2 className="mt-5 mb-5 text-center logo">
          <FontAwesomeIcon icon={faUser} /> Sign-up
        </h2>
        <h4> Please fill in all fields to create new user account </h4>
         <div 
         className="alert alert-danger"
         style={{display: this.state.error ? "": "none"}}>
         {this.state.error}
         </div>

        <div className="form-group">
          <label className="text-light">Username: </label>
          <input
            type="text"
            onChange={(event) => this.handleChange(event)}
            value={this.state.name}
            className="form-control bg-light"
            name="name"
            required
          />
        </div>

        <div className="form-group ">
          <label className="text-light">Email: </label>
          <input
            type="email"
            onChange={(event) => this.handleChange(event)}
            value={this.state.email}
            className="form-control bg-light"
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <label className="text-light">Password: </label>
          <input
            type="password"
            onChange={(event) => this.handleChange(event)}
            value={this.state.password}
            className="form-control bg-light"
            name="password"
            required
          />
        </div>
      
        <button
          className="btn btn-raised btn-primary"
          onClick={() => this.registertodb()}
        >
          Submit
        </button>
      </div>
     </div>

    );
  }
}

export default withRouter(RegisterUser);
