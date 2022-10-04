import { useContext } from "react";
import Link from "next/link";
import { Spinner } from "@chakra-ui/react";
import { AuthContext } from "@/context/AuthContext";
import { ProfileContext } from "@/context/ProfileContext";

const Donations = () => {
  const { totalDonations, isLoadingUserDonations, myDonations } =
    useContext(ProfileContext);
  const { currentAccount } = useContext(AuthContext);
  return (
    <div>
      {!isLoadingUserDonations ? (
        <div>
          {currentAccount && (
            <div className="items-center justify-center w-full mt-8 text-center">
              <h1 className="text-2xl font-bold dark:text-white text-nft-black-1">
                My Donations
              </h1>
              {myDonations !== null &&
              myDonations.length > 0 &&
              Number(totalDonations) > 0 ? (
                myDonations.map((donation, index) => {
                  if (donation.userDonations == null) return;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-center w-full mt-4 text-center "
                    >
                      <h1 className="text-md font-bold mt-4 dark:text-white text-nft-black-1">
                        {donation.name.slice(0, 18)}
                      </h1>
                      {donation.userDonations?.map(
                        (details: any, index: any) => {
                          return (
                            <div key={index}>
                              <p className="text-base font-normal dark:text-white text-nft-black-1">
                                ${details.donationAmount}
                              </p>
                              <div className="cursor-pointer">
                                <Link
                                  className="donation-receipt-link"
                                  href={{
                                    pathname: "/receipts",
                                    query: {
                                      fundraiser: donation.name,
                                      donation: donation.dollarDonationAmount,
                                      date: details.date,
                                    },
                                  }}
                                >
                                  <p className="px-6 cursor-pointer py-2 ml-3 text-sm font-semibold text-white rounded-md nft-gradient minlg:text-lg minlg:py-4 minlg:px-8 font-poppins">
                                    Request Receipt
                                  </p>
                                </Link>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </div>
                  );
                })
              ) : (
                <p className="mt-4 text-base font-normal dark:text-white text-nft-black-1">
                  No donation record found
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="items-center justify-center w-full mt-4 text-center">
          <h1 className="text-2xl font-bold dark:text-white text-nft-black-1">
            My Donations
          </h1>
          <div className="sm:mb-8 mb-0 flexCenter h-[2vh] mt-8 w-full">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Donations;
