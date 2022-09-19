import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Footer, Navbar } from "@/components";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  const { isLoading, currentAccount } = useContext(AuthContext);

  if (isLoading) {
    // TODO: Show loading screen, temporarily to avoid sending not authenticated requests
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-nft-dark">
      <Navbar />
      <main className="pt-65">{children}</main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
