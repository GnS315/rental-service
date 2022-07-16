import React from 'react';
import { useNavigate } from 'react-router-dom';
import cl from './MyButton.module.css'
const MyButton = ({children,link, ...props}) => {
    const navigate = useNavigate()
    return (
        <button
        className={cl.myBtn}
        onClick = {() => navigate(link)}
        {...props}
        >
            {children}
        </button>
    );
};

export default MyButton;