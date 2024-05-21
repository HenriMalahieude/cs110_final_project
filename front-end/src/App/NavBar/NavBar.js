import logo from './logo.svg'
import './NavBar.css'

export function NavBar() {
	return (<>
		<div className="navigation-bar">
			<div className="navbar-container" id="main-part">
				<div className="navbar-element"><a href="#home">Home</a></div>
				<div className="navbar-element"><a href="#board">Board</a></div>
			</div>
			<div className="navbar-logo">
				<img src={logo} alt="app logo"/>
			</div>
			<div className="navbar-container" id="profile-part">
				<div className="navbar-element"><a href="#profile">Profile</a></div>
			</div>
		</div>
	</>)
}