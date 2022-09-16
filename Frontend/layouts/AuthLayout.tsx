import { useContext, useEffect, useState } from "react";
import { FundraiserContext } from "../context/FundraiserContext";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  const { checkIfWalletIsConnect } = useContext(FundraiserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await checkIfWalletIsConnect();
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
