import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

import { MainLayout } from "../assets/styles/Layouts";
import bg from '../assets/img/bg.jpg';
import NavigationPanel from "../components/Navigation/NavigationPanel";
import Dashboard from "../components/Dashboard/Dashboard";
import { useSessionContext } from "../context/SessionContext";
import { useTransactionContext } from "../context/TransactionContext";
import Admin from "../components/Admin/Admin";
import UserProfile from "../components/UserProfile/UserProfile";
import ManageCategories from "../components/Categories/Categories";
import { useCategoryContext } from "../context/CategoryContext";
import Transactions from "../components/Transaction/Transactions";
import Budget from "../components/Budget/Budget";



function Home({ onSignout }) {

    const [active, setActive] = useState(1);
    const {signoutUser, sessionUser} = useSessionContext();
    const {fetchTransactions, setTransactionError} = useTransactionContext();
    const { fetchCategories } = useCategoryContext();
    const navigate = useNavigate();

    useEffect(() => {
        fetchTransactions();
        fetchCategories();
    }, [fetchTransactions, fetchCategories]);

    const displayData = () => {

        switch(active) {
            case 1:
                return <Dashboard />;

            case 2:
                return <Transactions />;

            case 3:
                return <Budget />;

            case 4:
                return <ManageCategories />;

            case 5:
                return <Dashboard />;

            case 6:
                if (sessionUser !== null) {
                    // console.log("not null");
                    if (sessionUser.role === 'admin' || sessionUser.role === 'manager') {
                        return <Admin />;
                    }
                } 

                return <Dashboard />;

            case 7:
                return <UserProfile />;

            default:
                return <Dashboard />;
        }
    };

    const handleActivate = (itemId) => {

        if (active !== itemId) {
            setActive(itemId);
            setTransactionError('');
        }
    }

    const handleSignout = () => {
        signoutUser(navigate, onSignout);
    };

    return (
    <AppStyled bg={bg} className="App">
        {/* {orbMemo} */}
        <MainLayout>
        <NavigationPanel active={active} handleActivate={handleActivate} handleSignout={handleSignout} sessionUser={sessionUser} />
        <main>
            {displayData()}
        </main>
        </MainLayout>
    </AppStyled>
    );
}

const AppStyled = styled.div`
    height: 100vh;
    background-image: url(${props => props.bg});
    position: relative;
    main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar{
        width: 0;
    }
    }
`;

export default Home