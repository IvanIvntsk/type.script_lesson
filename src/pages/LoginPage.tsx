import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {IAuth} from "../interfaces/authInterface";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {useDispatch} from "react-redux";
import {authActions} from "../redux/slices/authSlice";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
    const {register, reset, handleSubmit} = useForm<IAuth>()
    const {errors} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const  login:SubmitHandler<IAuth> = async (user) => {
        const {meta:{requestStatus}} = await dispatch(authActions.login({user}))

        if (requestStatus === 'fulfilled'){
            reset()
            navigate('/cars')
        }
    }

    return (
        <form onSubmit={handleSubmit(login)}>
            <input type={'text'} placeholder={'username'} {...register('username')}/>
            <input type={'text'} placeholder={'password'} {...register('password')}/>
            <button>Login</button>
            {errors && <span>{errors.detail}</span>}
        </form>
    );
};

export default LoginPage;