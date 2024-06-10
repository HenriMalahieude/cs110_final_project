import React from "react";
import Login from "../auth/Login.js";
import Register from "../auth/Register.js";
import Search from "../search/search.js";
import './home.css'

function goToRegister() {
	window.location.href += 'register';
}

function goToLogin() {
	window.location.href += 'login';
}


export function Home({username}) {
	if(!username) {
	return (
	<>
		<div className="home-cont">
			<h2 className="title-text">Welcome to the General Question Board!</h2>
			<div className='login-content'>
				<button className="reg-log-button" onClick={goToRegister}>Register</button>
				<button className="reg-log-button" onClick={goToLogin}>Login</button>
				<br />				
			</div>
			<div className="search-section">
				<Search />
			</div>
		</div>

	</>);
	} else {
		return (
			<>
				<div className="home-cont">
					<h2 className="title-text">Welcome to the General Question Board!</h2>
					<div className="search-section">
						<Search />
					</div>
				</div>
		
			</>);
		
	}
}