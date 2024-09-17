import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSessionContext } from '../../context/SessionContext';

const UserProfile = () => {
    const { sessionUser, updateUserProfile, updateUserPassword } = useSessionContext();
    const [showPassword, setShowPassword] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        password: ''
    });

    useEffect(() => {
        if (sessionUser) {
            setFormData({
                firstName: sessionUser.firstName,
                lastName: sessionUser.lastName,
                password: '' // Leave blank initially for security
            });
        }
    }, [sessionUser]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();

        let currentUser = sessionUser;
        currentUser.firstName = formData.firstName;
        currentUser.lastName = formData.lastName;

        // console.log("handling profile submit");
       
        await updateUserProfile(currentUser);
        
        // Optionally handle success/failure feedback
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        // console.log("password submit");
        await updateUserPassword(sessionUser._id, { password: formData.password });
         
        // Optionally handle success/failure feedback
    };

    const handleChangePasswordClick = () => {
        setChangingPassword(true);
        setFormData({
            ...formData,
            password: '' // Clear the password field when changing it
        });
    };

    const handleBackToProfileClick = () => {
        setChangingPassword(false);
    };

    return (
        <UserProfileStyled>
            <h1>User Profile</h1>
            
                {!changingPassword && (
                    <ProfileForm onSubmit={handleProfileSubmit}>
                        <ProfileField>
                            <label>Email:</label>
                            <span>{sessionUser?.email}</span>
                        </ProfileField>
                        <ProfileField>
                            <label>Role:</label>
                            <span>{sessionUser?.role}</span>
                        </ProfileField>
                        <ProfileField>
                            <label>First Name:</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                        </ProfileField>
                        <ProfileField>
                            <label>Last Name:</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </ProfileField>
                        <SaveButton type="submit">Save Profile</SaveButton>
                        <ChangePasswordButton type="button" onClick={handleChangePasswordClick}>
                            Change Password
                        </ChangePasswordButton>
                    </ProfileForm>
                )}
                {changingPassword && (
                    <ProfileForm onSubmit={handlePasswordSubmit}>
                        <ProfileField>
                            <label>Password:</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                            />
                            
                            <ToggleButton type="button" onClick={togglePasswordVisibility}>
                                {showPassword ? 'Hide' : 'Show'}
                            </ToggleButton>
                            
                        </ProfileField>
                        <SaveButton type="submit">Update Password</SaveButton>
                        <ChangePasswordButton type="button" onClick={handleBackToProfileClick}>
                            Back to Profile
                        </ChangePasswordButton>
                    </ProfileForm>
                )}
            
        </UserProfileStyled>
    );
};

export default UserProfile;

const UserProfileStyled = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    flex-grow: 1;
    max-width: 600px;
    
    h1 {
        margin-bottom: 20px;
    }
`;

const ProfileForm = styled.form`
    display: flex;
    flex-direction: column;
`;

const ProfileField = styled.div`
    margin-bottom: 15px;
  
    label {
        font-weight: bold;
        margin-bottom: 10px;
        display: block;
    }
  
    input {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
  
    span {
        display: block;
        padding: 10px;
        background-color: #e9e9e9;
        border-radius: 4px;
    }
`;

const ToggleButton = styled.button`
    margin-bottom: 20px;
    margin-left: 5px;
    padding: 8px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const SaveButton = styled.button`
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #218838;
    }
`;

const ChangePasswordButton = styled.button`
    margin-top: 10px;
    padding: 10px;
    background-color: #ffc107;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #e0a800;
    }
`;