import React, { useState } from 'react';
import axios from 'axios';

const AdminActions = ({ token }) => {
    const [userId, setUserId] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState('');

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(
                `http://localhost:8080/admin/users/${userId}/password`,
                { password: newPassword },
                config
            );
            setMessage(response.data);
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    const handleUserUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(
                `http://localhost:8080/admin/users/${userId}`,
                { username: newUsername, isAdmin },
                config
            );
            setMessage(response.data);
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    const handleUserDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(
                `http://localhost:8080/admin/users/${userId}`,
                config
            );
            setMessage(response.data);
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    const handleDatabaseInit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:8080/admin/init`,
                {},
                config
            );
            setMessage(response.data);
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    return (
        <div>
            <h3>Admin Actions</h3>
            <form onSubmit={handlePasswordChange}>
                <h4>Change Password</h4>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Change Password</button>
            </form>
            <form onSubmit={handleUserUpdate}>
                <h4>Update User</h4>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="New Username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                <label>
                    <input
                        type="checkbox"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                    Is Admin
                </label>
                <button type="submit">Update User</button>
            </form>
            <form onSubmit={handleUserDelete}>
                <h4>Delete User</h4>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
                <button type="submit">Delete User</button>
            </form>
            <form onSubmit={handleDatabaseInit}>
                <h4>Initialize Database</h4>
                <button type="submit">Initialize</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminActions;
