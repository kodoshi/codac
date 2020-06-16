import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faHeart, faComment, faUser } from "@fortawesome/fontawesome-free-solid";
import Posts from '../post/Posts'; 
import { isAuthenticated } from "../auth/file.js";


class Homepage extends React.Component {
	render() {
		return (
			
			<div className="welcome">
			{!isAuthenticated() && (
				<div className=" cont1 text-center">
					<hr />
					<h2 className="logo">  Welcome to Albanian Facebook </h2>
					<p >  <FontAwesomeIcon icon={faCamera} />  Share your moments with friends</p>
					<p> <FontAwesomeIcon icon={faHeart} />  Like or unlike photos, posts, news </p>
					<p> <FontAwesomeIcon icon={faComment} />  Make different comments to your friend photos, posts  </p>
					<p> <FontAwesomeIcon icon={faUser} /> Make new friends </p>
					<hr />
				</div>
				)}
			{isAuthenticated() && (
			
				<div>
					
					<Posts />
				
				</div>
)}
			</div>

		);
	}


}

export default Homepage;