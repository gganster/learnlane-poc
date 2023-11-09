import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import {Outlet, Link} from "react-router-dom";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon, Power } from "lucide-react";

const DashboardLayout = () => {
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Link to={"/dashboard"}><Button variant="ghost" className="mr-4">Home</Button></Link>
            <div className="ml-auto flex items-center space-x-4">
                {theme === "dark" ? (
                  <Button onClick={() => setTheme("light")} variant="ghost">
                    <Sun className="cursor-pointer" />
                  </Button>
                ) : (
                  <Button onClick={() => setTheme("dark")} variant="ghost">
                    <Moon className="cursor-pointer"/>
                  </Button>
                )}
              <Button variant="ghost" className="mr-4" onClick={logout}>
                <Power />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default DashboardLayout;