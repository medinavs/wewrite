import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import Theme from "./themes/Theme";

export function App() {
  return (
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  );
}
