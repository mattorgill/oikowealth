import React from "react";
import styled from "styled-components";

// import { useGlobalContext } from "../../context/GlobalContext";
import { useTransactionContext } from "../../context/TransactionContext";

function History() {

    const {recentlyAddedTransactions, transactionHistory} = useTransactionContext();
    //const [...recentlyAdded] = recentlyAddedTransactions
    const [...history] = transactionHistory;

    return (
        <HistoryStyled>
            {/* <h2>Recently Added</h2>
            {recentlyAdded.map((item) => {
                const {_id, title, amount, type} = item
                return (
                    <div key={_id} className="history-item">
                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {title}
                        </p>

                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {
                                type === 'expense' ? `-${amount}` : `+${amount}`
                            }
                        </p>
                    </div>
                )
            })} */}
            <h2>Recent Transactions</h2>
            {history.map((item) => {
                const {_id, title, amount, type} = item
                return (
                    <div key={_id} className="history-item">
                       <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {title}
                        </p>

                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {
                                type === 'expense' ? `-${amount}` : `+${amount}`
                            }
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default History