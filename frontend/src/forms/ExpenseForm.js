import React, { useState } from "react";
import styled from "styled-components";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

import TransactionButton from "../components/Button/TransactionButton";
import { icons, plus } from "../utils/icons";
import { useTransactionContext } from "../context/TransactionContext";
import { useCategoryContext } from "../context/CategoryContext";

function ExpenseForm() {

    const {addExpense, transactionError, setTransactionError} = useTransactionContext();
    const {categories} = useCategoryContext();

    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        category: '',
        description: '',
        date: ''
    });
    const [selectedIcon, setSelectedIcon] = useState('');

    const { title, amount, category, description, date } = inputState;

    // const categoryIcons = new Set(categories.map(c => c.icon));
    const iconMap = new Map(icons.map(icon => [icon.name, icon]));

    const categoryIcons = categories
        .filter(category => category.type === 'expense')
        .map(category => {
            const matchedIcon = iconMap.get(category.icon);
            
            return {
                value: category.name,
                label: (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {matchedIcon?.icon}
                        <span style={{ marginLeft: '10px' }}>{category.name}</span>
                    </div>
                ),
            };
        });

    const handleInput = name => event => {
        setInputState({...inputState, [name]: event.target.value});
        setTransactionError('');
    };

    const handleCategoryChange = selectedOption => {
        
        setSelectedIcon(selectedOption);
        setInputState({...inputState, category: categories.find(category => category.name === selectedOption.value)});

        if (transactionError !== '') {
            setTransactionError('');
        }
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const success = await addExpense(inputState);
            if (success) {
                setInputState({
                    title: '',
                    amount: '',
                    category: '',
                    description: '',
                    date: ''
                });
            }
        } catch (err) {
            setTransactionError(err);
        }
    };

    return (
        <ExpenseFormStyled onSubmit={handleSubmit}>
            {transactionError && <p className='error'>{transactionError}</p>}
            <div className="input-control">
                <input 
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="Expense Title"
                    onChange={handleInput('title')} />
            </div>
            <div className="input-control">
                <input 
                    type="text"
                    value={amount}
                    name={'amount'}
                    placeholder="Amount"
                    onChange={handleInput('amount')} />
            </div>
            <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText="Enter a Date"
                    selected={date}
                    dateFormat="MM/dd/yyyy"
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }} 
                />
            </div>
            <div className="selects input-control">
                <Select
                    options={categoryIcons}
                    value={selectedIcon}
                    onChange={handleCategoryChange}
                    placeholder="--Choose a Category--"
                />
            </div>
            <div className="input-control">
                <textarea 
                    name='description'
                    value={description}
                    placeholder="Add Description"
                    cols="30"
                    rows="4"
                    onChange={handleInput('description')}></textarea>
            </div>
            <div className="submit-btn">
                <TransactionButton 
                    name={'Add Expense'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </ExpenseFormStyled>
    )
}


const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }

    }
    .input-control {
        input{
            width: 100%;
        }
    }
    .selects {
        display: flex;
        justify-content: flex-end;
        select {
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active {
                color: rgba(34, 34, 96, 1);
            }
        }
    }
    .submit-btn {
        button {
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover {
                background: var(--color-green) !important;
            }
        }
    }
`;

export default ExpenseForm