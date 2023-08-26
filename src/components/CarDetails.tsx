import React, {FC, PropsWithChildren} from 'react';
import {ICar} from "../interfaces";

interface IProps extends PropsWithChildren {
    car:ICar

}
const CarDetails: FC<IProps> = ({car:{id,brand, price, year}}) => {

    return (
        <div>
            <div>ID:{id}
                <br/>
                Brand:{brand}
                <br/>
                Price:{price}
                <br/>
                Year:{year}
            </div>
        </div>
    );
};

export default CarDetails;