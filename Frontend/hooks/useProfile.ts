import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { FundraiserDetailsItem } from "@/types";
import * as API from "@/services/api";

const useProfile = () => {
  const [isLoadingUserDonations, setIsLoadingUserDonations] = useState(true);
  const [myDonations, setmyDonations] = useState<FundraiserDetailsItem[]>([]);
  const [totalDonations, setTotalDonations] = useState("");
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

  const getTotalDonations = async () => {
    const items = await Promise.all(
      myDonations.map(async (item) => {
        return item.userDonations;
      })
    );

    const donations: any[] = [];

    items.map((item) => {
      // @ts-ignore TODO: fix typescript error
      return item?.map((res) => donations.push(res.donationAmount));
    });

    setTotalDonations(
      donations.reduce((a, b) => Number(a) + Number(b), 0).toFixed(2)
    );
  };

  return {
    myDonations,
    isLoadingUserDonations,
    getTotalDonations,
    totalDonations,
  };
};

export default useProfile;
