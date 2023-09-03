import React from 'react';

import css from './Header.module.css'
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {authServices} from "../../services/authServices";
import {authActions} from "../../redux/slices/authSlice";

const Header = () => {
    const {me} = useAppSelector((state => state.auth))
    const dispatch = useAppDispatch()
    if (authServices.getAccessToken()&&!me) {
        dispatch(authActions.me)
    }
    return (
        <div className={css.Header}>
            {
                me? <div>{me.username} - {new Date(me.last_login).toDateString()}</div>
            :
            <div>
                <Link to={'/login'}>Login</Link>
                <Link to={'/register'}>Register</Link>
            </div>
            }
        </div>
    );
};

export default Header;