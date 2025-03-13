import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/_layouts/app";
import { Home } from "./pages/Home";
import { Room } from "./pages/Room";
import { Story } from "./pages/Story";
import { Vote } from "./pages/Vote";

export const router = createBrowserRouter([
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
        path: "/rooms/:roomId/story/:storyId/vote",
        element: <Vote />,
      },
    ],
  },
]);
