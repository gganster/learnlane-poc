import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.jsx";

import Login from "./routes/login.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
