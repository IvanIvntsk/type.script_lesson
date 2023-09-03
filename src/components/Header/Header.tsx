import React from 'react';

import css from './Header.module.css'
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks/reduxHooks";

const Header = () => {
    const {me} = useAppSelector((state => state.auth))
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