import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { FundraiserDetailsItem } from "@/types";
import * as API from "@/services/api";

const useProfile = () => {
  const [isLoadingUserDonations, setIsLoadingUserDonations] = useState(true);
  const [myDonations, setmyDonations] = useState<FundraiserDetailsItem[]>([]);
  const { currentAccount } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;
    const fetchAllFundraiserDonations = async () => {
      if (currentAccount) {
        setIsLoadingUserDonations(true);
        const items = await API.fetchFundraisersDetails(10, 0, currentAccount);

        if (!isMounted) return;
        setmyDonations(items);
        setIsLoadingUserDonations(false);
      }
    };

    fetchAllFundraiserDonations();

    return () => {
      isMounted = false;
    };
  }, [currentAccount]);

  return {
    myDonations,
    isLoadingUserDonations,
  };
};

export default useProfile;
