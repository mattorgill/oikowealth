import React from "react";
import styled from "styled-components";

import TransactionButton from "../Button/TransactionButton";
import { dateFormat } from "../../utils/dateFormat";
import { icons } from "../../utils/icons";
import { useCategoryContext } from "../../context/CategoryContext";

function TransactionItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type
}) {

    const {categories} = useCategoryContext();
    const categoryFilled = categories.find(c => c._id === category);
    // console.log('item: ', category);

    return (
        <TransactionItemStyled indicator={indicatorColor}>
            <div className="icon">
                {icons.find(icon => icon.name === categoryFilled.icon)?.icon}
            </div>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    
                    <div className="text">
                        <p>{icons.find(icon => icon.name === "dollar").icon} {amount}</p>
                        <p>{icons.find(icon => icon.name === "calendar").icon} {dateFormat(date)}</p>
                        <p>
                            {icons.find(icon => icon.name === "comment").icon}
                            {description}
                        </p>
                    </div>
                    
                </div>
            </div>
            <div className="btn-con">
                <TransactionButton
                    icon={icons.find(icon => icon.name === "trash").icon}
                    bPad={'.75rem'}
                    bRad={'50%'}
                    bg={'var(--primary-color'}
                    color={'#fff'}
                    iColor={'#fff'}
                    hColor={'var(--color-green'}
                    onClick={() => deleteItem(id)}
                />
            </div>
        </TransactionItemStyled>
    )
}

const TransactionItemStyled = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'indicator'
})`
    background: #FCF6F9;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.05);  
    border-radius: 10px;
    padding: 0.5rem; 
    margin-bottom: 0.75rem; 
    display: flex;
    align-items: center;
    gap: 0.75rem;  
    max-width: 100%;
    color: #222260;

    .icon {
        width: 50px;
        height: 50px;  
        border-radius: 10px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i {
            font-size: 1.8rem; 
        }
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        h5 {
            font-size: 1rem; 
            padding-left: .9rem;  /* Reduced padding */
            position: relative;
            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 0.6rem;
                height: 0.6rem;
                background: ${props => props.indicator};
            }
        }

        .inner-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text {
                display: flex;
                align-items: center;
                gap: 1rem; 
                p {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    color: var(--primary-color);
                    opacity: 0.8rem;
                    font-size: 0.9rem;
                }
            }
        }
    }
`;

export default TransactionItem