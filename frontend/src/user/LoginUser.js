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
  authenticate(tokenkey, next){
      if(typeof window !== "undifined"){
        //save the token to the localStorage
        localStorage.setItem("tokenkey", JSON.stringify(tokenkey))
        // redirect to userprofile page
        this.props.history.push("/"); 

        next();
      }
    }

loginuser() {
   
    const { email, password } = this.state;
    const user = {
      email,
      password
    }
    console.log(user)
    
 // send the http request to the server
fetch("http://localhost:4242/signin", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
      // take the response object from the server
    }).then(function(response) {
      return response.json()
    }).then(data => {
      //if there is an error change the error state
    if (data.error) this.setState({error: data.error})
      else 
      //authenticate
      this.authenticate(data)


  }).catch((err) =>{
        console.log(err)
    });

  };


  render() {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">
          <FontAwesomeIcon icon={faUser} /> Sign-in
        </h2>
         <div 
         className="alert alert-danger"
         style={{display: this.state.error ? "": "none"}}>
         {this.state.error}
         </div>

        <div className="form-group">
          <label className="text-muted">Email: </label>
          <input
            type="text"
            onChange={(event) => this.handleChange(event)}
            value={this.state.email}
            className="form-control"
            name="email"
            required
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Password: </label>
          <input
            type="password"
            onChange={(event) => this.handleChange(event)}
            value={this.state.password}
            className="form-control"
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
    );
  }
}

export default LoginUser;
