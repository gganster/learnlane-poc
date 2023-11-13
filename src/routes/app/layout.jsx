import { Outlet } from "react-router-dom";
import { useAuth } from "@/components/auth-provider";

const AppLayout = () => {
  const { logout, user } = useAuth();

  return (
    <>
      <Outlet />
    </>
  )
};

export default AppLayout;