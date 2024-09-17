import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

import TransactionButton from "../components/Button/TransactionButton";
import { plus } from "../utils/icons";
import { useTransactionContext } from "../context/TransactionContext";

function Form() {

    const {addIncome, transactionError, setTransactionError} = useTransactionContext();

    const [inputState, setInputState] = useState({
        title: '',
        amount: '',
        category: '',
        description: '',
        date: ''
    });

    const { title, amount, category, description, date } = inputState;

    const handleInput = name => event => {
        setInputState({...inputState, [name]: event.target.value});
        setTransactionError('');
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const success = await addIncome(inputState);
            console.log("add income ", success);
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
        <FormStyled onSubmit={handleSubmit}>
            {transactionError && <p className='error'>{transactionError}</p>}
            <div className="input-control">
                <input 
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder="Income Title"
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
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    <option value="" disabled >Select Category</option>
                    <option value="salary">Salary</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="other">Other</option>
                </select>
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
                    name={'Add Income'}
                    icon={plus}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-green'}
                    color={'#fff'}
                />
            </div>
        </FormStyled>
    )
}


const FormStyled = styled.form`
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

export default Form;