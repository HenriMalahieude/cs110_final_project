import logo from './logo.svg'
import {NavLink} from 'react-router-dom';
import './NavBar.css'

export default function NavBar() {
	return (<>
		<div className="navigation-bar">
			<div className="navbar-container" id="main-part">
				<NavLink to="/">Home</NavLink>
				<NavLink to="/board">Board</NavLink>
				<NavLink to="/newQuestion">Post</NavLink>
			</div>
			<div className="navbar-logo">
				<img src={logo} alt="app logo"/>
			</div>
			<div className="navbar-container" id="profile-part">
				<NavLink to="/profile">Profile</NavLink>
				<NavLink to="/register">Register</NavLink>
				<NavLink to="/login">Log In</NavLink>
			</div>
		</div>
	</>)
}