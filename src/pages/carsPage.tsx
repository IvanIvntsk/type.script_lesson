import React, {useEffect, useState} from 'react';

import Cars from "../components/Cars";
import CarForm from "../components/CarForm";
import {ICar} from "../interfaces";
import {carServices} from "../services";
import {Outlet} from "react-router-dom";

const CarsPage = () => {
    const [cars, setCars] = useState<ICar[]>([])
    const [trigger, setTrigger] = useState<boolean>(null)
    const [carForUpdate, setCarForUpdate] = useState<ICar>(null)

    useEffect(() =>{
        carServices.getAll()
            .then(({data})=>setCars(data))
    },[trigger])

    return (
        <div>
            <Outlet/>
            <CarForm setTrigger={setTrigger} setCarFroUpdate={setCarForUpdate} carForUpdate={carForUpdate}/>
            <Cars cars={cars} setCarForUpdate={setCarForUpdate} setTrigger={setTrigger}/>
        </div>
    );
};

export default CarsPage;