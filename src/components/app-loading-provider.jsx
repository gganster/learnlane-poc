import { useAuth } from "./auth-provider"

const LoadingScreen = () => (
  <div className="h-screen w-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-gray-400">
    </div>
  </div>
);

export const AppLoadingProvider = ({children}) => {
  const {auth} = useAuth();

  if (auth.loading) return <LoadingScreen />;
  return children;
}
