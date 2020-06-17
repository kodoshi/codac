import React from "react";
import { withRouter } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/fontawesome-free-solid";
import { Link } from 'react-router-dom';
import { listposts } from './apiPost.js';
import defaultpost from '../images/post.jpg';


class Posts extends React.Component {
constructor(props) {
    super(props);

    this.state = {
     posts: []
    }
  }

/**
 * Handle the response object from listpost method
 * if no error set State with data and display post information in the right form
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
    this.state.posts.map((post, i) => {
      const postId = post.posted_by ? post.posted_by._id : ""
      const postName = post.posted_by ? post.posted_by.name : " Unknown"

    return <div className="cont4  text-dark col-md-4 " key={i}>
          <div className="card-body">
            <img 
        src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}?${new Date().getTime()}`} 
        alt={post.title}
        
        className="img-thumbnail mb-3"
        style={{width: 'auto', height: "200px"}}
        onError = {i => (i.target.src = `${defaultpost}`)}

        />
            <h4 className="card-title text-dark"><b><i>{post.title}</i></b> </h4>
            <p className="card-text"><i>{post.body.slice(0, 50)}</i></p>  
            <br />
            <p className="mark"> Posted by <Link to={`/user/${postId}`}> {postName} </Link> on {new Date(post.created_at).toDateString() }
              </p>
            
            <Link to={`/post/${post._id}`} className="btn text-light bg-primary"> Read more </Link>
            
          </div> 
    </div> 
     })}

</div>
</div>
</div>
);
}
}

export default withRouter(Posts);