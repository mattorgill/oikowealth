import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../assets/styles/Layouts";
import { icons } from "../../utils/icons";
import { useCategoryContext } from "../../context/CategoryContext";

function Budget() {
    const { categories } = useCategoryContext();
    const expenseCategories = categories.filter(category => category.type === 'expense');

    const [isEditing, setIsEditing] = useState(false);
    const [totalIncome, setTotalIncome] = useState(60000);
    const [expectedTaxPercentage, setExpectedTaxPercentage] = useState(10);
    const [monthlyIncome, setMonthlyIncome] = useState(totalIncome / 12);
    const [expectedTaxAmount, setExpectedTaxAmount] = useState((monthlyIncome * expectedTaxPercentage) / 100);
    const [totalBudget, setTotalBudget] = useState(monthlyIncome - expectedTaxAmount); // Editable total budget, default to 1000
    const [categoryBudgets, setCategoryBudgets] = useState(
        expenseCategories.map(category => ({
            ...category,
            percentage: 0,
            amount: 0
        }))
    );

    /*
        TODO:
            - total income and expected tax should be stored in the user and editable in the profile
            - do we want this to just be a monthly breakdown? or should income and tax be yearly but then show the monthly breakdown and budget is only monthly
            - need to budget amount field in categories
    */


    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        // TODO: Reset any changes made while editing if needed
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // TODO: Save the updated values
    };

    const handleTotalIncomeChange = (e) => {
        setTotalIncome(e.target.value);
        const newMonthly = e.target.value / 12;
        setMonthlyIncome(newMonthly);
        console.log("effect: ", newMonthly, " tax: ", expectedTaxPercentage);
        updateExpectedTax(newMonthly, expectedTaxPercentage);
    };

    const handleExpectedTaxPercentageChange = (e) => {
        const value = Math.min(e.target.value, 100);
        updateExpectedTax(monthlyIncome, value);
    };

    const handleExpectedTaxAmountChange = (e) => {
        const value = Math.min(e.target.value, monthlyIncome);
        updateExpectedTax(monthlyIncome, (value * 100) / monthlyIncome);
    };

    const updateExpectedTax = (income, tax) => {
        console.log(income, tax);
        setExpectedTaxPercentage(tax);
        setExpectedTaxAmount((tax / 100) * income);
        updateTotalBudget(income, tax);
    }

    const updateTotalBudget = (income, tax) => {
        setTotalBudget(income - tax);
    }

    const handleCategoryPercentageChange = (index, value) => {
        const updatedBudgets = [...categoryBudgets];
        const sumOfPercentages = categoryBudgets.reduce((sum, cat, i) => (i === index ? sum : sum + cat.percentage), 0);
        const maxAllowedPercentage = Math.max(0, 100 - sumOfPercentages);
        const newPercentage = Math.min(value, maxAllowedPercentage);
        updatedBudgets[index].percentage = newPercentage;
        updatedBudgets[index].amount = (newPercentage / 100) * totalBudget;
        setCategoryBudgets(updatedBudgets);
    };

    const handleCategoryAmountChange = (index, value) => {
        const updatedBudgets = [...categoryBudgets];
        const sumOfAmounts = categoryBudgets.reduce((sum, cat, i) => (i === index ? sum : sum + cat.amount), 0);
        const maxAllowedAmount = Math.max(0, totalBudget - sumOfAmounts);
        const newAmount = Math.min(value, maxAllowedAmount);
        updatedBudgets[index].amount = newAmount;
        updatedBudgets[index].percentage = (newAmount / totalBudget) * 100;
        setCategoryBudgets(updatedBudgets);
    };

    return (
        <BudgetPageStyled>
            <InnerLayout>
                <div className="header">
                    <h1>Budget</h1>
                    {!isEditing && <button className="edit-btn" onClick={handleEditClick}>Edit</button>}
                    {isEditing && (
                         <div className="edit-buttons">
                            <button className="save-btn" onClick={handleSaveClick}>Save</button>
                            <button className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
                        </div>
                    )}
                </div>
                <div className="totals">
                    <div className="editable-totals">
                        <div className="field">
                            <label>Gross Income:</label>
                            {isEditing ? (
                                <>
                                    <div>${monthlyIncome?.toFixed(2)}</div>
                                    <div className="yearly-income">
                                        (
                                        <input
                                            type="number"
                                            value={totalIncome}
                                            onChange={handleTotalIncomeChange}
                                        />
                                        yearly)
                                    </div>                                    
                                </>
                            ) : (
                                <span>${monthlyIncome?.toFixed(2)} (${totalIncome?.toFixed(2)} yearly)</span>
                            )}
                        </div>
                        <div className="field">
                            <label>Expected Tax:</label>
                            {isEditing ? (
                                <>
                                    <input
                                        type="number"
                                        value={expectedTaxAmount}
                                        onChange={handleExpectedTaxAmountChange}
                                    />
                                    <input
                                        type="number"
                                        value={expectedTaxPercentage}
                                        onChange={handleExpectedTaxPercentageChange}
                                        className="tax-input"
                                    /> %
                                </>
                            ) : (
                                <span>${expectedTaxAmount?.toFixed(2)} ({expectedTaxPercentage}%)</span>
                            )}
                        </div>
                    </div>
                    <div className="totalBudget">
                        <div className="field">
                            <label>Total Budget:</label>
                            <span>${totalBudget?.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <BudgetGrid>
                    <div className="grid-header">
                        <span>Category</span>
                        <span>Percentage</span>
                        <span>Amount</span>
                    </div>
                    {categoryBudgets.map((category, index) => (
                        <div className="category-row" key={category._id}>
                            <div className="category-name">{icons.find(icon => icon.name === category.icon).icon} {category.name}</div>
                            <div className="category-percentage">
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={category.percentage}
                                        onChange={(e) => handleCategoryPercentageChange(index, e.target.value)}
                                    />
                                ) : (
                                    <span>{category.percentage}%</span>
                                )}
                            </div>
                            <div className="category-amount">
                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={category.amount}
                                        onChange={(e) => handleCategoryAmountChange(index, e.target.value)}
                                    />
                                ) : (
                                    <span>${category.amount?.toFixed(2)}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </BudgetGrid>
            </InnerLayout>
        </BudgetPageStyled>
    );
}

const BudgetPageStyled = styled.div`
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .edit-btn, .save-btn, .cancel-btn {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
    }

    .save-btn {
        background-color: #28a745;
    }

    .cancel-btn {
        background-color: #dc3545;
    }

    .totals {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        margin-bottom: 1rem;

        .editable-totals {
            display: flex;
            flex-direction: center;
            justify-content: space-evenly;
            gap: .5rem;
        }

        .totalBudget {
            display: flex;
            justify-content: center;
        }

        .field {
            display: flex;
            align-items: center;
            justify-content: space-between;
            /* max-width: 100%; */
            background-color: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

            label {
                font-weight: bold;
                margin-right: .1rem;
            }

            span, input {
                /* font-size: 1rem; */
                margin-left: 0.1rem;
                margin-right: 0.1rem;
            }
            
            div {
                display: flex;
                flex-direction: center;
                padding: .2rem;
            }
        }

        .field .budget {
            color: #28a745;
            font-weight: bold;
        }

        .tax-input {
            width: 60px;
        }

        .budget-input {
            width: 100px;
        }
    }

    .category-row {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        align-items: center;
        padding: 1rem 0;
        background-color: #fff;
        border-bottom: 1px solid #eee;
        transition: background-color 0.2s ease;

        &:hover {
            background-color: #f0f8ff;
        }

        .category-name {
            padding-left: 0.5rem;
        }

        .category-percentage, .category-amount {
            text-align: center;
        }
    }

    .grid-header {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        font-weight: bold;
        padding-bottom: 1rem;
        border-bottom: 2px solid #ccc;
    }
`;

const BudgetGrid = styled.div`
    display: flex;
    flex-direction: column;

    .category-row {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        align-items: center;
        padding: 1rem 0;
        background-color: #fff;
        border-bottom: 1px solid #eee;
        transition: background-color 0.2s ease;

        &:hover {
            background-color: #f0f8ff;
        }

        .category-name {
            padding-left: 0.5rem;
        }

        .category-percentage, .category-amount {
            text-align: left;
        }
    }

    .grid-header {
        display: grid;
        text-align: left;
        grid-template-columns: 2fr 1fr 1fr;
        font-weight: bold;
        padding-bottom: .5rem;
        border-bottom: 2px solid #ccc;
    }
`;

export default Budget;