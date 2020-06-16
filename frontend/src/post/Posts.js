import React from "react";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/fontawesome-free-solid";
import { Link } from 'react-router-dom';
import { listposts } from './apiPost.js';
import profileimg from '../profileimg/icon.jpg';


class Posts extends React.Component {
constructor(props) {
    super(props);

    this.state = {
     posts: []
    }
  }

/**
 * Handle the response object from listusers method
 * if no error set State with data and display user information in the right form
 * if error console log the err.
*/

componentDidMount() {
  listposts().then(data => {
    if (data.error) {
      console.log(data.error)
    }
    else 
      this.setState({posts: data});
  });
  
}


render() {

    return (
      <div className="">
      <div className="container">



<h2 className="cont2 text-center font1"><FontAwesomeIcon icon={faList} /> See All Posts  </h2>
  <div className="cont2 row">

  {
    //loop on all posts  
    this.state.posts.map((post, index) => 
    <div className="cont4  text-dark col-md-4 " key={index}>
          <div className="card-body">
            <h4 className="card-title text-dark"><b><i>{post.title}</i></b> </h4>
            <p className="card-text"><i>{post.body}</i></p>  <Link to={`/posts/${post._id}`} className="btn text-light bg-primary"> Read more </Link>
          </div> 
    </div> 
    )
  }

</div>
</div>
</div>
);
}
}

export default withRouter(Posts);