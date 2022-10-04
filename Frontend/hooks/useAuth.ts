import { useEffect, useRef, useState } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import { notifyMetamaskIsNotFounded } from "@/services/notifications";

const useAuth = () => {
  const onboarding = useRef<MetaMaskOnboarding>();
  const [accounts, setAccounts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  /** Check if connected */
  useEffect(() => {
    let isMounted = true;

    function handleNewAccounts(newAccounts: string[]) {
      if (!isMounted) {
        return;
      }
      setAccounts(newAccounts);
    }

    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleNewAccounts);
      window.ethereum.on("accountsChanged", handleNewAccounts);
      return () => {
        isMounted = false;
        window.ethereum.removeListener("accountsChanged", handleNewAccounts);
      };
    } else {
      notifyMetamaskIsNotFounded();
    }
  }, []);

  const connectWallet = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setIsLoading(true);
      const newAccounts: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccounts(newAccounts);
      setIsLoading(false);
    } else {
      onboarding.current?.startOnboarding();
    }
  };

  const disconnectWallet = async () => {};

  return {
    accounts,
    currentAccount: accounts[0],
    isLoading,
    connectWallet,
    disconnectWallet,
  };
};

export default useAuth;
