import React, { useCallback, useContext, useMemo, useState } from "react";
import axios from 'axios';

import { useGlobalContext } from "./GlobalContext";


const TransactionContext = React.createContext();

export const TransactionProvider = ({children}) => {

    const [transactions, setTransactions] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [transactionError, setTransactionError] = useState(null);
    const {BASE_URL} = useGlobalContext();

    const fetchTransactions = useCallback(async () => {
        try {
            const response = await axios.get(`${BASE_URL}get-transactions`, {withCredentials: true});
            setTransactions(response.data);
            setIncomes(response.data.filter(t => t.type === 'income'));
            setExpenses(response.data.filter(t => t.type === 'expense'));
        } catch (err) {
            setTransactionError(err.response.data.message); // you set what's in the data
        }
    }, [BASE_URL]);

    const addTransaction = useCallback(async (transaction) => {

        try {
            console.log(transaction);
            // transaction.category = transaction.category._id;
            const response = await axios.post(`${BASE_URL}add-transaction`, transaction, {withCredentials: true});
            fetchTransactions();
            return true;
        } catch (err) {
            // console.log("error ", err.response.data.message);
            setTransactionError(err.response.data.message); // you set the error data to message fyi
            return false;
        }
    }, [fetchTransactions, BASE_URL]);

    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`${BASE_URL}delete-transaction/${id}`, {withCredentials: true});
            fetchTransactions();
        } catch (err) {
            setTransactionError(err.response.data.message);
        }
    };

    const totalIncome = useMemo(() => {
        return incomes.reduce((acc, income) => acc + income.amount, 0);
    }, [transactions]);


    const totalExpenses = useMemo(() => {
        return expenses.reduce((acc, income) => acc + income.amount, 0);
}, [transactions]);

    const totalBalance = useMemo(() => {
        return totalIncome - totalExpenses;
    }, [totalIncome, totalExpenses]);

    const recentlyAddedTransactions = useMemo(() => {

        transactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return transactions.slice(0, 4);
    }, [transactions]);

    const transactionHistory = useMemo(() => {
        // const history = [...transactions, ...expenses];
        transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

        return transactions.slice(0, 4);
    }, [transactions]);

    return (
        <TransactionContext.Provider value = {{
            addTransaction,
            fetchTransactions,
            transactions,
            deleteTransaction,
            incomes,
            totalIncome,
            expenses,
            totalExpenses,
            totalBalance,
            recentlyAddedTransactions,
            transactionHistory,
            transactionError,
            setTransactionError
        }}>
            {children}
        </TransactionContext.Provider>
    );
}

export const useTransactionContext = () => {
    return useContext(TransactionContext);
};