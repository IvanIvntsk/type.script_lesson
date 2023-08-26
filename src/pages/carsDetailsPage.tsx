import React, {FC, PropsWithChildren, useEffect, useState} from 'react';

import {useAppLocation} from "../hooks/routerHooks";
import {ICar} from "../interfaces";
import {useParams} from "react-router-dom";
import {carServices} from "../services";
import CarDetails from "../components/CarDetails";


interface IProps extends PropsWithChildren {


}
const CarDetailsPage: FC<IProps> = () => {
    const {state} = useAppLocation<ICar>()
    const {id} = useParams()

    const [car, setCar] = useState<ICar>(null)

    useEffect(()=>{
        if (state){
            setCar(state)
        }else {
            carServices.getById(+id)
                .then(({data}) => setCar(data))
        }
    },[id, state])
    return (
        <div>
            {car && <CarDetails car={car}/>}
        </div>
    );
};

export default CarDetailsPage;