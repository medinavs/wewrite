import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/_layouts/app";
import { Geral } from "./pages/Geral";
import { Home } from "./pages/Home";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/geral',
                element: <Geral />,
            },
        ],
    },
]);