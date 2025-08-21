import { useEffect, useState } from "react";

const useAuthStatus = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const checkAuthStatus = async () => {
    setIsLoading(true);
    try {
      const authStatus = await chrome.runtime.sendMessage({
        type: "auth-status",
      });
      const { ok } = authStatus;
      setIsAuth(ok);
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);
  return {
    isLoading,
    isAuth,
    isError,
  };
};
export default useAuthStatus;
