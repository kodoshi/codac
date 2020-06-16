import React from "react";
import { withRouter, Link } from "react-router-dom";
import profileimg from '../images/icon.jpg';
import defaultpost from '../images/post.jpg';




class UserProfileTabs extends React.Component {

render() {
	
	return (
	   <div>
	   	<div className="row">
	   		<div className="col-md-4">
				<h3 className="text-info"> Followers </h3>
		   		<hr/>
		    {this.props.followers.map((user, i) => 
		    	<div key={i} >
			    	
			    		<div>
			    			<Link to={`/user/${user._id}`}>
			    				<img
			    				className="float-left"
			    				height="30px"
       							src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} 
     							alt={user.name}
      							onError = {i => (i.target.src = `${profileimg}`)}
      							/>
      							<div>
		   							<p className="text-light lead"> {user.name} </p>
		    					</div>
      						</Link>
			    		</div>
			    	
		    	</div>
		    )}
		   </div>
		   <div className="col-md-4">
				<h3 className="text-info"> Following </h3>
		   		<hr/>
		    {this.props.following.map((user, index) => 
		    	<div key={index} >
			    	
			    		<div>
			    			<Link to={`/user/${user._id}`}>
			    				<img
			    				className="float-left mr-2"
			    				height="30px"
			    				
       							src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} 
     							alt={user.name}
      							onError = {index => (index.target.src = `${profileimg}`)}
      							/>
      							<div>
		   							<p className=" text-light lead"> {user.name} </p>
		    					</div>
      						</Link>
			    		</div>
			    	
			    	
		    	</div>
		    )}
		   </div>
		   <div className="col-md-4">
				<h3 className="text-info"> Posts </h3>
		   		<hr/>
		    {this.props.posts.map((post, i) => 
		    	<div key={i} >
			    	
			    		<div>
			    			<Link to={`/post/${post._id}`}>
			    				
      							<div>
		   							<p className="text-light lead"> {post.title} </p>
		    					</div>
      						</Link>
			    		</div>
			    	
		    	</div>
		    )}
		   </div>
		</div>
	  </div>

	);
}
}

export default withRouter(UserProfileTabs);