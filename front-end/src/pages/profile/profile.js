import React from "react";
import './profile.css';

export function Profile({username, imgSrc, raiting}) {
	return (
	<>
		<div className="profile-info">
			<h2 className="username-text">{username}'s Profile</h2>
			{//not certain about this or if we will include alt text
			} 
			<div className="hero-info">
				<img className="profile-image" src="logo192.png" />
				<div>
					<h4>User: {username}</h4>
					{//Not certain if we are still implementing but currently including option
					}
					<h5>Raiting:{raiting}</h5>
				</div>
			</div>
		</div>
	</>);
}