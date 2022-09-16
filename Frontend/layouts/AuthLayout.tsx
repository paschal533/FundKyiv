import { useContext, useEffect, useState } from "react";
import { FundraiserContext } from "../context/FundraiserContext";
import { checkIfWalletIsConnect } from "../services/api";
interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  const { setCurrentAccount } = useContext(FundraiserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const account = await checkIfWalletIsConnect();
        setCurrentAccount(account);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
    // TODO: cancel the request if the component is unmounted
  }, []);

  if (isLoading) {
    // TODO: Show loading screen, temporarily to avoid sending not authenticated requests
    return null;
  }

  return <main>{children}</main>;
};

export default AuthLayout;
