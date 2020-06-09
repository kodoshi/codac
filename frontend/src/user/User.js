import React from "react";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/fontawesome-free-solid";
import { Link } from 'react-router-dom';
import { listusers } from './apiUsers.js';
import profileimg from '../profileimg/img.jpg';


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
      <div className="container bg-secondary">



<h2 className="control-group card container text-center bg-secondary font1"> <p><FontAwesomeIcon icon={faUsers} /></p>  See All Users  </h2>
  <div className="text-center">

  {
    this.state.users.map((user, index) => 
    <div className="jumbotron bg-light " key={index}>
      <img className= "card-img-top" src={profileimg} alt={user.name} style={{width: '15%'}}/>
      <h2 className="text-dark"><b><i>{user.name}</i></b> </h2>
      <p><i>{user.email}</i></p>  <Link to={`/user/${user._id}`} className="btn text-light bg-primary"> View Profile </Link>


    </div> 
    )
  }

</div>

</div>

      );
  }


}

export default withRouter(User);