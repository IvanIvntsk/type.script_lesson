import React, {Dispatch, FC, PropsWithChildren, SetStateAction} from 'react';

import {SubmitHandler, useForm} from "react-hook-form";
import {ICar} from "../interfaces";
import {carServices} from "../services";

interface IProps extends PropsWithChildren {
setTrigger:Dispatch<SetStateAction<boolean>>
    carForUpdate:ICar
    setCarFroUpdate:Dispatch<SetStateAction<ICar>>
}

const CarForm:FC<IProps> = ({setTrigger,carForUpdate,setCarFroUpdate}) => {
    const {reset, register, handleSubmit, setValue} = useForm<ICar>()

    if (carForUpdate){
        setValue('brand', carForUpdate.brand)
        setValue('price', carForUpdate.price)
        setValue('year', carForUpdate.year)
    }

    const save:SubmitHandler<ICar> = async (car) => {
        await carServices.create(car)
        setTrigger(prev => !prev)
        reset()
    }

    const update:SubmitHandler<ICar> = async (car) => {
        await carServices.updateById(carForUpdate.id, car)
        setCarFroUpdate(null)
        setTrigger(prev => !prev)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(carForUpdate?update : save )}>
            <input type="text" placeholder={'brand'} {...register('brand')}/>
            <input type="text" placeholder={'price'} {...register('price')}/>
            <input type="text" placeholder={'year'} {...register('year')}/>
            <button>{carForUpdate? 'update':'save'}</button>
        </form>
    );
};

export default CarForm;