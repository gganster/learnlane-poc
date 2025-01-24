import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { initGA, trackPageView } from "./analytics"; // Import Google Analytics
import { Toaster } from "./components/ui/toaster";
import ProviderBundler from "./components/provider-bundler";
import { AppLoadingProvider } from "./components/app-loading-provider.jsx";
import { ThemeProvider } from "./components/theme-provider.jsx";
import { AuthProvider } from "./components/auth-provider.jsx";

import DashboardLayout from "./routes/dashboard/layout";
import AppLayout from "./routes/app/layout";
import LandingPage from "./routes/landing-page.jsx";
import Login from "./routes/login.jsx";
import DashboardHome from "./routes/dashboard/home.jsx";
import DashboardRoom from "./routes/dashboard/room/room[id]";
import AppHome from "./routes/app/home.jsx";
import AppInvite from "./routes/app/invite";
import AppRoom from "./routes/app/room[id]";
import AppChat from "./routes/app/roomChat";

const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <Login /> },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "/dashboard", element: <DashboardHome /> },
      { path: "/dashboard/rooms/:id", element: <DashboardRoom /> }
    ]
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { path: "/app", element: <AppHome /> },
      { path: "/app/invite/:id", element: <AppInvite /> },
      { path: "/app/rooms/:id", element: <AppRoom /> },
      { path: "/app/rooms/:id/chat", element: <AppChat /> }
    ]
  }
]);

const App = () => {
  useEffect(() => {
    initGA();

    trackPageView(window.location.pathname + window.location.search);

    const unsubscribe = router.subscribe((state) => {
      const path = state.location.pathname + state.location.search;
      trackPageView(path);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <ProviderBundler providers={[
        [AuthProvider],
        [ThemeProvider, { defaultTheme: "dark", storageKey: "vite-ui-theme" }],
        [AppLoadingProvider]
      ]}>
        <RouterProvider router={router} />
      </ProviderBundler>
      <Toaster />
    </>
  );
};

export default App;
