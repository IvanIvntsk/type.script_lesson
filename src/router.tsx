import {createBrowserRouter, Navigate} from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import CarsPage from "./pages/carsPage";
import CarsDetailsPage from "./pages/carsDetailsPage";

const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout/>,
        children:[
            {
                index: true,
                element:<Navigate to={'cars'}/>
            },
            {
                path: '/cars',
                element:<CarsPage/>,
                children:[
                    {
                        path:':id',
                        element:<CarsDetailsPage/>
                    }
                ]
            }
        ]
    }
])
export {router}