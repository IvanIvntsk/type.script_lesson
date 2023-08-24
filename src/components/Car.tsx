import React, {FC, PropsWithChildren} from 'react';
import {ICar} from "../interfaces";

interface IProps extends PropsWithChildren {
    car:ICar

}

const Car: FC<IProps> = ({car}) => {
    const {id, brand} = car
    return (
        <div>
            <div>id:{id}</div>
            <div>brand:{brand}</div>
        </div>
    );
};

export default Car;