import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/fontawesome-free-solid";

class LoginUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      [name]: value,
    });
  }

/**
* @param {*} tokenkey token that is saved in localStorage.
* @param {*} next allows the method to go to the next middleware
* Authenticate method: if the token exists save it to the localStorage.
* redirect to homepage
*/

  authenticate(tokenkey, next){
    if(typeof window !== "undefined")
      {
        localStorage.setItem("tokenkey", JSON.stringify(tokenkey))
        this.props.history.push("/"); 
        next();
      }
    }

/**
 * Login method: make a http request to the server.
 * take the response object from the server
 * if there is an error change the error state
 * if no error make the authentication and the right redirection after login 
*/

loginuser() {
   
    const { email, password } = this.state;
    const user = {
      email,
      password
    }
    console.log(user)
    
fetch(`${process.env.REACT_APP_API_URL}/signin`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function(response) {
      return response.json()
    }).then(data => {
    if (data.error) this.setState({error: data.error})
      else 
      this.authenticate(data)
    }).catch((err) =>{
        console.log(err)
    });

  };


  render() {
    return (
      <div className = "body">
      <div className="cont">
        <h2 className="mt-5 mb-5 text-center logo ">
          <FontAwesomeIcon icon={faUser} /> Sign-in
        </h2>
         <div 
         className="alert alert-danger"
         style={{display: this.state.error ? "": "none"}}>
         {this.state.error}
         </div>

        <div className="form-group">
          <label className="text-light">Email: </label>
          <input
            type="text"
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
          onClick={() => this.loginuser()}
        >
          Submit
        </button>
      </div>
   </div>
    );
  }
}

export default LoginUser;
