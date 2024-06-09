import React, {useState } from "react";
import './profile.css';
import axios from 'axios';
import Login from "../auth/Login";
import {useParams} from 'react-router-dom'; 

export function ViewProfile() {
	const urlUserName = useParams();
	const [image, setImage] = useState('');
	const [uName, setUname] = useState('');

	async function getImg(urlUserName) {
		try {
			const response = await axios.get(`http://localhost:8080/profile/getProfile/${urlUserName}`);
			const data = await response.json();
			await setUname(data.username);
			const r2 = await axios.get(`http://localhost:8080/items/`);
			const d2 = await response.json();
			for await (const obj of d2) {
				if(obj.name == uName){ //found photo
					setImage(obj.imageUrl);
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	getImg();
	if(image || uName) {//There is a profile
	return(
	<>
		<div className="profile-info">
			<h2 className="username-text">{uName}'s Profile</h2>
			{//not certain about this or if we will include alt text
			} 
			<div className="hero-info">
				<img className="profile-image" src={image} />
				<div>
					<h4>User: {uName}</h4>
					{//Not certain if we are still implementing but currently including option
					}
					{//<h5>Raiting:{raiting}</h5>
					}
				</div>
			</div>
		</div>
	</>);
	}
	else {
		return(<>
			<p className='failed-text'>Profile does not exist.</p>
		</>);
	}
}


export function Profile({username, raiting}) {
	const [message, setMessage] = useState('');
	const [image, setImage] = useState('');

	const uploadImg = async(e) => {
		try {
			const response = await axios.post('http://localhost:8080/items/add', {
				body: {name: {username}, desc: '', }, file: {image} 
			});
			setMessage('Uploaded Image');
		} catch(error) {
			setMessage('Failed to upload image');
			console.log(`Error Raised: ${error}`);
		}
	}

	async function getImg({username}) {
		try {
			const response = await axios.get(`http://localhost:8080/items/`);
			const data = await response.json();
			for await (const profile of data) {
				if(profile.name == username){ //found photo
					setImage(profile.imageUrl);
				}
			}
		} catch (error) {
			console.log(error);
		}
	}
	

	//If username is passed/ logged in
	if(username) {
		getImg({username});
		
		return (
		<>
			<div className="profile-info">
				<h2 className="username-text">{username}'s Profile</h2>
				{//not certain about this or if we will include alt text
				} 
				<div className="hero-info">
					<img className="profile-image" src={image} />
					<div>
						<h4>User: {username}</h4>
						{//Not certain if we are still implementing but currently including option
						}
						{//<h5>Raiting:{raiting}</h5>
						}
					</div>
				</div>
			</div>
			<div className='image-upload-form'>
				<form onSubmit={uploadImg}>
					<label>Image upload:</label>
					<input type="file" accept="image/*" value={image} onChange={(e) => setImage(e.target.value)}></input>
					<button type="submit">Upload</button>
				</form>
				{message && <p>{message}</p>}
			</div>
		</>);
	}
	else {//If not logged in
		return (
		<>
			<Login />
		</>);
	}
}

export default Profile;