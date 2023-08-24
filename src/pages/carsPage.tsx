import React, {useEffect, useState} from 'react';

import Cars from "../components/Cars";
import CarForm from "../components/CarForm";
import {ICar} from "../interfaces";
import {carServices} from "../services";

const CarsPage = () => {
    const [cars, setCars] = useState<ICar[]>([])

    useEffect(() =>{
        carServices.getAll()
            .then(({data})=>setCars(data))
    },[])

    return (
        <div>
            <CarForm/>
            <Cars cars={cars}/>
        </div>
    );
};

export default CarsPage;