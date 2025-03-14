import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import Theme from "./themes/Theme";
import { ToastContainer } from "./components/ui/Toast";
import { Theme as RadixTheme } from "@radix-ui/themes";

export function App() {
  return (
    <Theme>
      <RadixTheme>
        <ToastContainer />
        <RouterProvider router={router} />
      </RadixTheme>
    </Theme>
  );
}
