import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import {Toaster} from "./components/ui/toaster";
import { useAuth } from "./components/auth-provider.jsx";

import AutologinRoute from "./components/router/autologin";
import LogguedRoute from "./components/router/logged";

import ProviderBundler from "./components/provider-bundler";
import { AppLoadingProvider } from "./components/app-loading-provider.jsx";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider.jsx";
import { AuthProvider } from "./components/auth-provider.jsx";

import DashboardLayout from "./routes/dashboard/layout";
import AppLayout from "./routes/app/layout";

import Login from "./routes/login.jsx";
import DashboardHome from "./routes/dashboard/home.jsx";
import DashboardRoom from "./routes/dashboard/room/room[id]";

import AppHome from "./routes/app/home.jsx";
import AppInvite from "./routes/app/invite";
import AppRoom from "./routes/app/room[id]";

const router = createBrowserRouter([
  { path: "/", element: <AutologinRoute><Login /></AutologinRoute> },
  { path: "/login", element: <AutologinRoute><Login /></AutologinRoute> },
  { 
    path: "/dashboard", 
    element: <LogguedRoute><DashboardLayout /></LogguedRoute>,
    children: [
      { path: "/dashboard", element: <DashboardHome /> },
      { path: "/dashboard/profile", element: <div>Profile</div> },
      { path: "/dashboard/rooms/:id", element: <DashboardRoom />}
    ]
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { path: "/app", element: <LogguedRoute><AppHome /></LogguedRoute> },
      { path: "/app/invite/:id", element: <AppInvite />},
      { path: "/app/rooms/:id", element: <AppRoom />}
    ]
  }
]);

const App = () => {
  return (
    <>
      <ProviderBundler providers={[
        [AuthProvider], 
        [ThemeProvider, {defaultTheme: "dark", storageKey: "vite-ui-theme"}],
        [AppLoadingProvider]
      ]}>
        <RouterProvider router={router} />
      </ProviderBundler>
      <Toaster />
    </>
  );
}

export default App;
