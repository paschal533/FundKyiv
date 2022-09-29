import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { FundraiserItem, FundraiserDetailsItem } from "@/types";
import * as API from "@/services/api";

const useFundraisers = () => {
  const [isLoadingFundraiser, setIsLoadingFundraiser] = useState(true);
  const [isLoadingUserDonations, setIsLoadingUserDonations] = useState(true);
  const [fundraisers, setFundraisers] = useState<FundraiserItem[]>([]);
  const [myDonations, setmyDonations] = useState<FundraiserDetailsItem[]>([]);
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

    const fetchAllFundraiserDonations = async () => {
      if(currentAccount){
        setIsLoadingUserDonations(true)
        const items = await API.fetchFundraisersDetails(10, 0, currentAccount);

        if (!isMounted) return;
        setmyDonations(items);
        setIsLoadingUserDonations(false);
      }
    }

    fetchFundraisers();
    fetchAllFundraiserDonations();

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

  return {
    isLoadingFundraiser,
    fundraisers,
    myDonations,
    isLoadingUserDonations,
  };
};

export default useFundraisers;
