import React, {Dispatch, FC, PropsWithChildren, SetStateAction} from 'react';

import {ICar} from "../interfaces";
import {carServices} from "../services";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../hooks/reduxHooks";
import {carActions} from "../redux/slices/carSlice";

interface IProps extends PropsWithChildren {
    car:ICar

}

const Car: FC<IProps> = ({car}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const {id, brand} = car

    const delteCar = async ()  => {
        await dispatch(carActions.deleteCar({id}))
    }

    return (
        <div>
            <div>id:{id}</div>
            <div>brand:{brand}</div>
            <button onClick={()=>dispatch(carActions.setCatForUpdate({car}))}>update</button>
            <button onClick={delteCar}>delete</button>
            <button onClick={()=> navigate(id.toString(), {state:car})}>details</button>
        </div>
    );
};

export default Car;