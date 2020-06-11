import React from "react";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/fontawesome-free-solid";
import { Link } from 'react-router-dom';
import { listusers } from './apiUsers.js';
import profileimg from '../profileimg/icon.jpg';


class User extends React.Component {
constructor(props) {
    super(props);

    this.state = {
     users: []
    }
  }

/**
 * Handle the response object from listusers method
 * if no error set State with data and display user information in the right form
 * if error console log the err.
*/

componentDidMount() {
  listusers().then(data => {
    if (data.error) {
      console.log(data.error)
    }
    else 
      this.setState({users: data});
  });
  
}


render() {

    return (
      <div className="welcome">
      <div className="container">



<h2 className="control-group  cont2 text-center  font1"><FontAwesomeIcon icon={faUsers} /> See All Users  </h2>
  <div className="text-center cont2">

  {
    //loop on all users  
    this.state.users.map((user, index) => 
    <div className="jumbotron bg-light text-dark " key={index}>
      <img 
      className= "card-img-top" 
      src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} 
      alt={user.name}
      style={{width: '20%'}}
      onError = {index => (index.target.src = `${profileimg}`)}
      />
      
      <h2 className="text-dark"><b><i>{user.name}</i></b> </h2>
      <p><i>{user.email}</i></p>  <Link to={`/user/${user._id}`} className="btn text-light bg-dark"> View Profile </Link>


    </div> 
    )
  }

</div>

</div>
</div>


      );
  }


}

export default withRouter(User);