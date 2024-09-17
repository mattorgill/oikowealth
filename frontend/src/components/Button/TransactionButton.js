import React from "react";
import styled from "styled-components";

function TransactionButton({name, icon, onClick, bg, bPad, color, bRad}) {
    return (
        <TransactionButtonStyled style={{
            background: bg,
            padding: bPad,
            borderRadius: bRad,
            color: color,
        }} onClick={onClick}>
            {icon}
            {name}
        </TransactionButtonStyled>
    )
}

const TransactionButtonStyled = styled.button`
    outline: none;
    border: none;
    font-family: inherit;
    font-size: inherit;
    /* width: 50px;
    height: 50px; */
    display: flex;
    align-items: center;
    gap: .5rem;
    cursor: pointer;
    transition: all .2s ease-in-out;
`;

export default TransactionButton