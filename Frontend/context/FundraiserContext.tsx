import React, { useState, useContext } from "react";
import { handleNewFundraiser, handleWithdraw } from "@/services/notifications";
import * as API from "@/services/api";
import { MyDonations } from "@/types";
import { AuthContext } from "@/context/AuthContext";

type Context = ReturnType<typeof useFundraiserProvider>;

export const FundraiserContext = React.createContext<Context>({} as Context);

interface Props {
  children: React.ReactNode;
}

export const FundraiserProvider = ({ children }: Props) => {
  const value = useFundraiserProvider();

  return (
    <FundraiserContext.Provider value={value}>
      {children}
    </FundraiserContext.Provider>
  );
};

const useFundraiserProvider = () => {
  const FundraiserCurrency = "CELO";
  const { currentAccount } = useContext(AuthContext);
  const [isLoadingFundraiser, setIsLoadingFundraiser] = useState(false);
  const [owner, setIsOwner] = useState(false);
  const [userDonations, setUserDonations] = useState<MyDonations | null>(null);

  const [loadDonations, setLoadDonations] = useState(true);

  // Get a fundraiser details
  const getFundRaiserDetails = async (address: string) => {
    try {
      if (!currentAccount) {
        return;
      }
      setIsOwner(false);

      const signer = await API.getProvider();
      const instance = API.fetchFundraiserContract(address, signer);
      const userDonations = await instance.myDonations({
        from: currentAccount,
      });

      const isOwner = await instance.owner({ from: currentAccount });

      if (isOwner.toLowerCase() === currentAccount) {
        setIsOwner(true);
      }

      const normalizedDonations = await API.renderDonationsList(userDonations);
      setUserDonations(normalizedDonations);
      setLoadDonations(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Create a fundraiser
  const createAFundraiser = async (
    name,
    url,
    imageURL,
    description,
    beneficiary
  ) => {
    const signer = await API.getProvider();

    const contract = API.fetchContract(signer);

    const transaction = await contract.createFundraiser(
      name,
      url,
      imageURL,
      description,
      beneficiary
    );

    setIsLoadingFundraiser(true);
    await transaction.wait();
    handleNewFundraiser();
    setIsLoadingFundraiser(false);
  };

  // withdraw funds
  const withdrawalFunds = async (address: string) => {
    if (!currentAccount) {
      return;
    }

    const signer = await API.getProvider();

    const instance = API.fetchFundraiserContract(address, signer);
    await instance.withdraw({ from: currentAccount });

    handleWithdraw();
  };

  return {
    userDonations,
    FundraiserCurrency,
    loadDonations,
    setLoadDonations,
    setIsOwner,
    withdrawalFunds,
    getFundRaiserDetails,
    createAFundraiser,
    owner,
    isLoadingFundraiser,
  };
};
