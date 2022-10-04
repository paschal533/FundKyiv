import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Address, FundraiserItem } from "@/types";
import * as API from "@/services/api";
import { handleNewFundraiser, handleWithdraw } from "@/services/notifications";
import { MyDonations } from "@/types";

export const useFundraisers = () => {
  const [isLoadingFundraiser, setIsLoadingFundraiser] = useState(true);
  const [fundraisers, setFundraisers] = useState<FundraiserItem[]>([]);
  const FundraiserCurrency = "CELO";
  const [owner, setIsOwner] = useState(false);
  const [userDonations, setUserDonations] = useState<MyDonations | null>(null);

  const [loadDonations, setLoadDonations] = useState(true);
  const { currentAccount } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;
    const fetchFundraisers = async () => {
      setIsLoadingFundraiser(true);
      const items = await API.fetchFundraisers();

      if (!isMounted) return;
      setFundraisers(items);
      setIsLoadingFundraiser(false);
    };

    fetchFundraisers();

    return () => {
      isMounted = false;
    };
  }, [currentAccount]);

  // NOTE: Maybe subscribe to new blocks to update Fundraisers list in real time + New Fundraisers notifications
  //   useEffect(() => {
  //     provider.on("block", fetchFundraisers);
  //     return () => {
  //       provider.off("block", fetchFundraisers);
  //     };
  //   }, [fetchFundraisers]);

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
      // @ts-ignore TODO: fix typescript error
      setUserDonations(normalizedDonations);
      setLoadDonations(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Create a fundraiser
  const createAFundraiser = async (
    name: string,
    url: string,
    imageURL: string,
    description: string,
    beneficiary: Address
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
    isLoadingFundraiser,
    fundraisers,
    userDonations,
    FundraiserCurrency,
    loadDonations,
    setLoadDonations,
    setIsOwner,
    withdrawalFunds,
    getFundRaiserDetails,
    createAFundraiser,
    owner,
  };
};
