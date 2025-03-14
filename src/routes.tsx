import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/_layouts/app";
import { Home } from "./pages/Home";
import { Room } from "./pages/Room";
import { Story } from "./pages/Story";
import { Result } from "./pages/Result";
import { Votes } from "./pages/Votes";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/rooms/:roomId",
        element: <Room />,
      },
      {
        path: "/rooms/:roomId/story",
        element: <Story />,
      },
      {
        path: "/rooms/:roomId/story/vote",
        element: <Votes />,
      },
      {
        path: "/rooms/:roomId/results",
        element: <Result />,
      },
    ],
  },
]);
