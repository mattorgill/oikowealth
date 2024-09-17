import React, { useCallback, useContext, useMemo, useState } from "react";
import axios from 'axios';
//import { useNavigate } from "react-router-dom";

const GlobalContext = React.createContext();

export const GlobalProvider = ({children}) => {

    // const [incomes, setIncomes] = useState([]);
    // const [expenses, setExpenses] = useState([]);
    // const [error, setError] = useState(null);
    // const [sessionUser, setSessionUser] = useState(null);
    const BASE_URL = "http://localhost:5000/api/v1/";
    // const environmentVars = {
    //     base_url: BASE_URL,
    // };
    //const navigation = useNavigate()

    // const checkSession = useCallback(async () => {
    //     try {
    //       const response = await axios.get(`${BASE_URL}session`, {
    //         withCredentials: true // Important to include cookies
    //       });

    //       const isAuthenticated = response.data.authenticated;
          
    //     //   console.log("checkSession is returning ", isAuthenticated);
    //       if (isAuthenticated && (!sessionUser || sessionUser._id !== response.data.user._id)) {
    //             // console.log("session user is  ", response.data.user);
    //             setSessionUser(response.data.user);
    //       }
          
          
    //     //   console.log("session user is  ", response.data.user);
    //     //   console.log('data: ', response.data);
    //       return isAuthenticated;
    //     } catch (error) {
    //       console.error('Error checking session:', error);
    //       return false;
    //     }
    // }, [sessionUser]);

    // const registerUser = useCallback(async (user, navigate) => {
    //     try {
    //         const response = await axios.post(`${BASE_URL}register`, user, {withCredentials: true});

    //         if (response.status === 200) {
    //             // console.log("going home");
    //             navigate('/home');
    //         }
    //     } catch (error) {
    //         setError('Registration failed: ' + error.response.data.error);
    //     }
    // }, []);

    // const loginUser = useCallback(async (email, password, navigate) => {
    //     try {
    //         const response = await axios.post(`${BASE_URL}login`, {email, password}, {withCredentials: true});
    //         if (response.status === 200) {
    //             // console.log("login successful");
    //             navigate('/home');
    //         }
    //     } catch (error) {
    //         if (error.response) {
    //             // Handle known error structure
    //             setError('Login failed: ' + (error.response.data?.error || 'Unknown error'));
    //         } else if (error.request) {
    //             // The request was made but no response was received
    //             setError('Login failed: No response from server');
    //         } else {
    //             // Something happened in setting up the request
    //             setError('Login failed: ' + error.message);
    //         }
    //         console.error("Login error:", error);
    //     }
    // }, []);

    // const signoutUser = useCallback(async (navigate) => {
    //     try {
    //         const response = await axios.post(`${BASE_URL}signout`, {}, {withCredentials: true});
    //         if (response.status === 200) {
    //             navigate('/login');
    //         }
    //     } catch (error) {
    //         setError('Signout failed: ' + error.response.data.error);
    //     }
    // }, []);

    // const addIncome = useCallback(async (income) => {
    //     //const response = await axios.post(`${BASE_URL}add-income`, income)
    //     await axios.post(`${BASE_URL}add-income`, income)
    //         .catch((err) => {
    //             setError(err.response.data.message); // you set the error data to message fyi
    //         });
    //     getIncomes();
    // }, []);

    // const getIncomes = async () => {
    //     try {
    //         const response = await axios.get(`${BASE_URL}get-incomes`);
    //         setIncomes(response.data);
    //     } catch (err) {
    //         setError(err.response.data.message); // you set what's in the data
    //     }
    // };

    // const deleteIncome = async (id) => {
    //     try {
    //         await axios.delete(`${BASE_URL}delete-income/${id}`);
    //         getIncomes();
    //     } catch (err) {
    //         setError(err.response.data.message);
    //     }
    // };

    // const totalIncome = useMemo(() => {
    //     return incomes.reduce((acc, income) => acc + income.amount, 0);
    // }, [incomes]);

    // const addExpense = async (expense) => {
    //     // const response = await axios.post(`${BASE_URL}add-expense`, expense)
    //     await axios.post(`${BASE_URL}add-expense`, expense)
    //         .catch((err) => {
    //             setError(err.response.data.message); // you set the error data to message fyi
    //         });
    //     getExpenses();
    // };

    // const getExpenses = useCallback(async () => {
    //     try {
    //         const response = await axios.get(`${BASE_URL}get-expenses`);
    //         setExpenses(response.data);
    //     } catch (err) {
    //         setError(err.response.data.message);
    //     }
    // }, []);

    // const deleteExpense = async (id) => {
    //     try {
    //         await axios.delete(`${BASE_URL}delete-expense/${id}`);
    //         getExpenses();
    //     } catch (err) {
    //         setError(err.response.data.message);
    //     }
    // };

    // // const totalExpenses = () => {
    // //     let totalExpenses = 0;
    // //     expenses.forEach((expense) => {
    // //         totalExpenses += expense.amount;
    // //     });
    // //     return totalExpenses;
    // // };

    // // const totalBalance = () => {
    // //     return totalIncome() - totalExpenses()
    // // }
    // const totalExpenses = useMemo(() => {
    //     return expenses.reduce((acc, expense) => acc + expense.amount, 0);
    // }, [expenses]);

    // const totalBalance = useMemo(() => {
    //     return totalIncome - totalExpenses;
    // }, [totalIncome, totalExpenses]);

    // const recentlyAddedTransactions = useMemo(() => {

    //     const transactions = [...incomes, ...expenses];
    //     transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    //     return transactions.slice(0, 4);
    // }, [incomes, expenses]);

    // const transactionHistory = useMemo(() => {
    //     const history = [...incomes, ...expenses];
    //     history.sort((a, b) => new Date(b.date) - new Date(a.date));

    //     return history.slice(0, 4);
    // }, [incomes, expenses]);

    return (
        <GlobalContext.Provider value = {{
            BASE_URL
            // checkSession,
            // sessionUser,
            // registerUser,
            // loginUser,
            // signoutUser,
            // addIncome,
            // getIncomes,
            // incomes,
            // deleteIncome,
            // totalIncome,
            // addExpense,
            // getExpenses,
            // expenses,
            // deleteExpense,
            // totalExpenses,
            // totalBalance,
            // recentlyAddedTransactions,
            // transactionHistory,
            // error,
            // setError
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};