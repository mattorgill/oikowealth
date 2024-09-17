import React, { useCallback, useContext, useState } from "react";
import axios from 'axios';

import { useGlobalContext } from "./GlobalContext";

const SessionContext = React.createContext();

export const SessionProvider = ({children}) => {

    const [sessionError, setSessionError] = useState(null);
    const [sessionUser, setSessionUser] = useState(null);
    const [users, setUsers] = useState([]);
    const {BASE_URL} = useGlobalContext();


    const checkSession = useCallback(async () => {
        try {
          const response = await axios.get(`${BASE_URL}session`, {
            withCredentials: true 
          });

          let isAuthenticated = false;
          if (response.status === 200) {
            isAuthenticated = response.data.authenticated;
          }
         
          
        //   console.log("checkSession is returning ", isAuthenticated);
          if (isAuthenticated) {
            if (!sessionUser || sessionUser._id !== response.data.user._id) {
                // console.log("session user is  ", response.data.user);
                setSessionUser(response.data.user);
            }
          } else {
            setSessionUser(null);
          }
          
          return isAuthenticated;

        } catch (error) {
          console.error('Error checking session:', error);
          if (error.response) {
            setSessionError('Error checking session:', error.response.data.message);
          } else {
            setSessionError('Error checking session:', error);
          }
          
          return false;
        }
    }, [sessionUser, BASE_URL]);

    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-users`, {withCredentials: true});
            setUsers(response.data);
        } catch (err) {
            setSessionError(err.response.data.message); // you set what's in the data
        }
    }, [BASE_URL]);

    const registerUser = useCallback(async (user, navigate, onRegister) => {
        try {
            // console.log("registering " + user);
            const response = await axios.post(`${BASE_URL}register`, user, {withCredentials: true});

            if (response.status === 200) {
                await onRegister();
                setSessionError('');
                navigate('/home');
            }
        } catch (error) {
            setSessionError('Registration failed: ' + error.response.data.message);
        }
    }, [BASE_URL]);

    const loginUser = useCallback(async (email, password, navigate, onLogin) => {
        try {
            const response = await axios.post(`${BASE_URL}login`, {email, password}, {withCredentials: true});
            
            if (response.status === 200) { 
                await onLogin();
                setSessionError('');
                navigate('/home');
            }
        } catch (error) {
            if (error.response) {
                // Handle known error structure
                setSessionError('Login failed: ' + (error.response.data?.message || 'Unknown error'));
            } else if (error.request) {
                // The request was made but no response was received
                setSessionError('Login failed: No response from server');
            } else {
                // Something happened in setting up the request
                setSessionError('Login failed: ' + error.message);
            }
            console.error("Login error:", error);
        }
    }, [BASE_URL]);

    const signoutUser = useCallback(async (navigate, onSignout) => {
        try {
            const response = await axios.post(`${BASE_URL}signout`, {}, {withCredentials: true});
            if (response.status === 200) {
                setSessionUser(null);
                await onSignout();
                navigate('/login');
            }
        } catch (error) {
            setSessionError('Signout failed: ' + error);
        }
    }, [BASE_URL]);

    const isValidPassword = (password) => {
        // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
        // return passwordRegex.test(password);
        if (password === 'test') {
            return false;
        }
        return true;
    };

    const updateUserRole = useCallback(async (user) => {

        const validRoles = ['admin', 'manager', 'user'];
        if (!validRoles.includes(user.role)) {
            setSessionError('Update failed: Invalid role specified');
            return false;
        }

        const success = await updateUser(user);
        return success;
    }, [BASE_URL]);

    const updateUser = useCallback(async (user) => {

        try {
            const response = await axios.put(`${BASE_URL}update-user/${user._id}`, {user}, {withCredentials: true});
            if (response.status === 200) {
                fetchUsers();
                return true;
            } else {
                setSessionError('Update failed: Unexpected response');
                return false;
            }
            
        } catch (error) {
            setSessionError('Update failed: ' + error);
            return false;
        }
        
    }, [BASE_URL]);

    const updateUserProfile = useCallback(async (user) => {
        
        // validate names??

        const success = await updateUser(user);
        return success;
    }, [BASE_URL]);

    const updateUserPassword = useCallback(async (userId, password) => {
        try {
            const response = await axios.put(`${BASE_URL}update-userPassword/${userId}`, password, {withCredentials: true});
            if (response.status === 200) {
                // fetchUsers();
                return true;
            } else {
                setSessionError('Update password failed: Unexpected response');
                return false;
            }
            
        } catch (error) {
            setSessionError('Update password failed: ' + error);
            return false;
        }
        
    }, [BASE_URL]);

    const resetUserPassword = async (userId) => {
        try {
            const response = await axios.put(`${BASE_URL}reset-userPassword/${userId}`, {withCredentials: true});
            if (response.status === 200) {
                return true;
            } else {
                setSessionError('Update failed: Unexpected response');
                return false;
            }
            
        } catch (error) {
            setSessionError('Update failed: ' + error);
            return false;
        }
        
    };

    return (
        <SessionContext.Provider value = {{
            checkSession,
            sessionUser,
            fetchUsers,
            users,
            registerUser,
            loginUser,
            signoutUser,
            isValidPassword,
            updateUser,
            updateUserRole,
            updateUserProfile,
            updateUserPassword,
            resetUserPassword,
            sessionError,
            setSessionError
        }}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSessionContext = () => {
    return useContext(SessionContext);
};