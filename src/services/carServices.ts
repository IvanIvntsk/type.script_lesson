import {apiServices, IRes} from "./apiServices";
import {ICar} from "../interfaces";
import {urls} from "../constants";

const carServices = {
    getAll:():IRes<ICar[]> => apiServices.get(urls.cars.base),
    create:(data:ICar):IRes<ICar> => apiServices.post(urls.cars.base, data),
    getById:(id:number):IRes<ICar> => apiServices.get(urls.cars.byId(id)),
    updateById:(id:number, data:ICar):IRes<ICar> => apiServices.put(urls.cars.byId(id), data),
    deleteById:(id:number):IRes<void> => apiServices.delete(urls.cars.byId(id))
}

export {carServices}