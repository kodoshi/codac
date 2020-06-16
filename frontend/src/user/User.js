import React from "react";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/fontawesome-free-solid";
import { Link } from 'react-router-dom';
import { listusers } from './apiUsers.js';
import profileimg from '../images/icon.jpg';


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



<h2 className="cont2 text-center  font1"><FontAwesomeIcon icon={faUsers} /> See All Users  </h2>
  <div className="cont2 row">

  {
    //loop on all users  
    this.state.users.map((user, i) => 
    <div className="cont4  text-dark col-md-4 " key={i}>
      <img 
      className= "card-img-top mb-4" 
      src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} 
      alt={user.name}
      style={{width: '20%'}}
      onError = {i => (i.target.src = `${profileimg}`)}
      />
      
      <h4 className="text-dark"><b><i>{user.name}</i></b> </h4>
      <p><i>{user.email}</i></p>  <Link to={`/user/${user._id}`} className="btn text-light bg-primary"> View Profile </Link>


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