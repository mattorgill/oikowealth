import React, { useState } from "react";
import styled from "styled-components";

import { InnerLayout } from "../../assets/styles/Layouts";
import TransactionItem from "../TransactionItem/TransactionItem";
import TransactionForm from "../../forms/TransactionForm";
import { useTransactionContext } from "../../context/TransactionContext";

function Transactions() {
    const { transactions, deleteTransaction, totalExpenses, totalIncome } = useTransactionContext();
    const [selectedTab, setSelectedTab] = useState("income");
    const [showForm, setShowForm] = useState(false);

    const handleTabChange = (type) => {
        setSelectedTab(type);
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    return (
        <TransactionStyled>
            <InnerLayout>
                <div className="header">
                    <h1>Transactions</h1>
                    <Tabs>
                        <TabButton active={selectedTab === "income" ? 1 : 0} onClick={() => handleTabChange("income")}>
                            Income
                        </TabButton>
                        <TabButton active={selectedTab === "expense" ? 1 : 0} onClick={() => handleTabChange("expense")}>
                            Expense
                        </TabButton>
                    </Tabs>
                </div>
    
                <div className="total-add-container">
                    <h4 className="total-transactions">
                        Total {selectedTab === "income" ? "Income: " : "Expenses: "} 
                        <span>${selectedTab === "income" ? totalIncome : totalExpenses}</span>
                    </h4>
                    <button className="add-button" onClick={toggleForm}>
                        {showForm ? "Cancel" : "Add Transaction"}
                    </button>
                </div>
    
                <div className="content-container">
                    <div className="transactions-list">
                        {transactions.filter(t => t.type === selectedTab).map((transaction) => {
                            const {_id, type, title, amount, date, category, description} = transaction;
                            return (
                                <TransactionItem
                                    key={_id}
                                    id={_id}
                                    type={type}
                                    title={title}
                                    description={description}
                                    amount={amount}
                                    date={date}
                                    category={category}
                                    indicatorColor={selectedTab === 'income' ? "var(--color-green)" : "var(--color-accent)"}
                                    deleteItem={deleteTransaction}
                                />
                            );
                        })}
                    </div>
    
                    {showForm && (
                        <div className="form-container">
                            <TransactionForm transactionType={selectedTab} />
                        </div>
                    )}
                </div>
            </InnerLayout>
        </TransactionStyled>
    )};

    const TransactionStyled = styled.div`
    display: flex;
    flex-direction: column;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .total-add-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
    }

    .total-transactions {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .add-button {
        padding: 0.6rem 1.2rem;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .content-container {
        display: flex;
        align-items: flex-start; /* Align form and list at the top */
        gap: 2rem; /* Space between transaction list and form */
        margin-top: 1rem;
    }

    .transactions-list {
        flex: 2; /* Take more space for the transactions list */
        max-height: 60vh;
        overflow-y: auto;
    }

    .form-container {
        flex: 1; /* Take less space for the form */
        max-width: 40%; /* Ensure form doesn't take too much width */
    }
`;

const Tabs = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 4px;
`;

const TabButton = styled.button`
    padding: 5px 10px;
    font-size: 1rem;
    background-color: ${(props) => (props.active ? "#007bff" : "#f0f0f0")};
    color: ${(props) => (props.active ? "#fff" : "#000")};
    cursor: pointer;
    border-radius: 4px;
    &:hover {
        background-color: #0056b3;
        color: #fff;
    }
`;

export default Transactions;