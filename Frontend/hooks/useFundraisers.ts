import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { FundraiserItem } from "@/types";
import * as API from "@/services/api";

const useFundraisers = () => {
  const [isLoadingFundraiser, setIsLoadingFundraiser] = useState(true);
  const [fundraisers, setFundraisers] = useState<FundraiserItem[]>([]);
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

  return {
    isLoadingFundraiser,
    fundraisers,
  };
};

export default useFundraisers;
