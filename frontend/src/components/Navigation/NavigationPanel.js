import React from "react";
import styled from "styled-components";

import avatar from '../../assets/img/avatar.jpg'
import { menuItems } from "../../utils/menuItems";
import { signout } from "../../utils/icons";

function NavigationPanel({active, handleActivate, handleSignout, sessionUser}) {

    const userName = sessionUser ? sessionUser.firstName + ' ' + sessionUser.lastName : '';

    return (
        <NavigationPanelStyled>
            <div className="user-con">
                <img src={avatar} alt="" />
                <div className="text">
                    <h2>{userName}</h2>
                    <p>Your Money</p>
                </div>
            </div>
            <ul className="menu-items">
                {menuItems.map((item) => {
                    if (!sessionUser || sessionUser.role === 'user') {
                        if (item.id === 6) {
                            return;
                        }
                    }
                    return <li
                        key={item.id}
                        onClick={() => handleActivate(item.id)}
                        className={active === item.id ? 'active': ''}
                    >
                        {item.icon}
                        <span>{item.title}</span>
                    </li>
                })}
            </ul>
            <div className="bottom-nav">
                <ul>
                    <li onClick={handleSignout}>
                        {signout} 
                        <span>Sign Out</span>
                    </li>
                </ul>
            </div>

        </NavigationPanelStyled>
    )
}

const NavigationPanelStyled = styled.nav`
    padding: 2rem 1.5rem;
    max-width: 350px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2rem;
    .user-con{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    }
    .menu-items{
        flex: 1;
        display: flex;
        flex-direction: column;
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            margin: .6rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, .6);
                font-size: 1.4rem;
                transition: all .2s ease-in-out;
            }
        }
    }
    .active {
        color: rgba(34, 34, 96, 1) !important;
        i{
            color: rgba(34, 34, 96, 1) !important;
        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
    }
    .bottom-nav {
        /* flex: 1; */
        display: flex;
        justify-content: center;
        align-items: center;
        /* flex-direction: column; */
        li{
            display: inline-flex;
            align-items: center;
            margin: .1rem 0;
            font-weight: 500;
            cursor: pointer;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
        }
        li:hover{
            background-color: rgba(34, 34, 96, 0.04);
        }
        i{
            color: rgba(34, 34, 96, .6);
            font-size: 1.2rem;
            transition: all .2s ease-in-out;
        }
        span{
            margin-left: 5px;
        }
    }
`;

export default NavigationPanel