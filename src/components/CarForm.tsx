import React, {FC, PropsWithChildren} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {ICar} from "../interfaces";
import {carServices} from "../services";

interface IProps extends PropsWithChildren {

}

const CarForm:FC<IProps> = () => {
    const {reset, register, handleSubmit, setValue} = useForm<ICar>()

    const save:SubmitHandler<ICar> = async (car) => {
        await carServices.create(car)
    }

    return (
        <form onSubmit={handleSubmit(save)}>
            <input type="text" placeholder={'brand'} {...register('brand')}/>
            <input type="text" placeholder={'price'} {...register('price')}/>
            <input type="text" placeholder={'year'} {...register('year')}/>
            <button>save</button>
        </form>
    );
};

export default CarForm;