import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import {ICar} from "../interfaces";
import {carServices} from "../services";
import Car from "./Car";

interface IProps extends PropsWithChildren {
cars:ICar[]

}

const Cars:FC<IProps> = ({cars}) => {

    return (
        <div>
            {cars.map(car => <Car key={car.id} car={car}/>)}
        </div>
    );
};

export default Cars;