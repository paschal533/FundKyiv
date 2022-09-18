import { useState, useEffect, useContext } from "react";
import { Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRef } from "react";
import Head from "next/head";

import { FundraiserContext } from "../context/FundraiserContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Button, Loader, Modal } from "../components";
import images from "../assets";

const AssetDetails = () => {
  const {
    owner,
    setSending,
    setLoadDonations,
    loadDonations,
    withdrawalFunds,
    getFundRaiserDetails,
    setSuccessModal,
    sending,
    successModal,
    CELOAmount,
    submitFunds,
    donationValue,
    userDonations,
    setDonationValue,
    currentAccount,
    connectWallet,
  } = useContext(FundraiserContext);

  const [paymentModal, setPaymentModal] = useState(false);
  const modalRef = useRef(null);
  const { theme } = useTheme();
  const router = useRouter();

  // check if it is clicked outside of modalRef
  const handleClickOutside = (e) => {
    if (modalRef?.current && !modalRef.current.contains(e.target)) {
      setPaymentModal(false);
    }
  };

  useEffect(() => {
    // disable body scroll when navbar is open
    if (paymentModal || successModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [paymentModal, successModal]);

  const fundraiser = router.query;

  useEffect(() => {
    const GetDonationList = async (address?: string) => {
      if (!address) {
        return;
      }

      try {
        setLoadDonations(true);
        await getFundRaiserDetails(address);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadDonations(false);
      }
    };

    GetDonationList(fundraiser.address as string);
  }, [fundraiser.address, setLoadDonations]);

  if (!fundraiser.address) {
    return <Loader />;
  }

  return (
    <div className="relative flex justify-center min-h-screen md:flex-col">
      <Head>Fundraiser Details</Head>
      <div className="relative flex-1 p-12 border-r flexCenter sm:px-4 md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1">
        <div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557 ">
          <Image
            alt="fundraiser-imageURL"
            src={fundraiser.imageURL as string}
            objectFit="cover"
            className="shadow-lg rounded-xl"
            layout="fill"
          />
        </div>
      </div>

      <div className="justify-start flex-1 p-12 sm:px-4 sm:pb-4">
        <div className="flex flex-row sm:flex-col">
          <h2 className="text-2xl font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-3xl">
            {fundraiser.name}
          </h2>
        </div>

        <div className="mt-10">
          <p className="text-xs font-normal font-poppins dark:text-white text-nft-black-1 minlg:text-base">
            Creator
          </p>
          <div className="flex flex-row items-center mt-3">
            <div className="relative w-12 h-12 mr-2 minlg:w-20 minlg:h-20">
              <Image
                alt="creator1"
                src={images.creator1}
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <p className="text-sm font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-lg">
              {shortenAddress(fundraiser.address)}
            </p>
          </div>
        </div>

        <div className="flex flex-col mt-10">
          <div className="flex flex-row w-full border-b dark:border-nft-black-1 border-nft-gray-1">
            <p className="mb-2 text-base font-medium font-poppins dark:text-white text-nft-black-1">
              Details
            </p>
          </div>
          <div className="mt-3">
            <p className="mb-4 text-base font-normal font-poppins dark:text-white text-nft-black-1">
              {fundraiser.description}
            </p>

            <a
              href={fundraiser.website}
              target="_blank"
              rel="noreferrer"
              className="font-poppins bg-[] dark:text-white text-nft-black-1 font-normal text-base"
            >
              <Button
                btnName="Learn more..."
                btnType="outline"
                classStyles="mx-2 rounded-lg"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-row mt-10 sm:flex-col">
          {currentAccount ? (
            <Button
              btnName="Make a donation"
              btnType="primary"
              classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
              handleClick={() => setPaymentModal(true)}
            />
          ) : (
            <Button
              btnName="Connect"
              btnType="primary"
              classStyles="mx-2 rounded-lg"
              handleClick={connectWallet}
            />
          )}
          {owner && (
            <Button
              btnName="withdraw funds"
              btnType="outline"
              classStyles="mx-2 rounded-lg"
              handleClick={() => withdrawalFunds(fundraiser.address)}
            />
          )}
        </div>
        {!loadDonations ? (
          <div>
            {currentAccount && (
              <div className="items-center justify-center w-full mt-8 text-center">
                <h1 className="text-2xl font-bold dark:text-white text-nft-black-1">
                  My Donations
                </h1>
                {userDonations !== null && userDonations.length > 0 ? (
                  userDonations.map((donation, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center justify-center w-full mt-4 text-center "
                      >
                        <p className="text-base font-normal dark:text-white text-nft-black-1">
                          ${donation.donationAmount}
                        </p>
                        <Link
                          className="donation-receipt-link"
                          href={{
                            pathname: "/receipts",
                            query: {
                              fundraiser: fundraiser.name,
                              donation: donation.donationAmount,
                              date: donation.date,
                            },
                          }}
                        >
                          <p className="px-6 py-2 ml-3 text-sm font-semibold text-white rounded-md nft-gradient minlg:text-lg minlg:py-4 minlg:px-8 font-poppins">
                            Request Receipt
                          </p>
                        </Link>
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

      {paymentModal && (
        <div
          onClick={handleClickOutside}
          className="fixed inset-0 z-10 flexCenter bg-overlay-black animated fadeIn"
        >
          <div
            ref={modalRef}
            className="flex flex-col w-2/5 bg-white rounded-lg md:w-11/12 minlg:w-2/4 dark:bg-nft-dark"
          >
            <div className="flex justify-end mt-4 mr-4 minlg:mt-6 minlg:mr-6">
              <div
                className="relative w-3 h-3 cursor-pointer minlg:w-6 minlg:h-6"
                onClick={() => setPaymentModal(false)}
              >
                <Image
                  src={images.cross}
                  layout="fill"
                  className={theme === "light" ? "filter invert" : undefined}
                />
              </div>
            </div>

            <div className="w-full p-4 text-center flexCenter">
              <h2 className="text-2xl font-normal font-poppins dark:text-white text-nft-black-1">
                Make A Donation
              </h2>
            </div>
            <div className="p-10 border-t border-b sm:px-4 dark:border-nft-black-3 border-nft-gray-1">
              <div className="flex flex-col justify-center text-center">
                <p className="font-normal text-center font-poppins dark:text-white text-nft-black-1 text-bold minlg:text-xl">
                  {fundraiser?.name}
                </p>

                <div className="flex items-center justify-center w-full my-5">
                  <div className="relative rounded-md w-28 h-28">
                    <Image
                      src={fundraiser.imageURL}
                      alt="fundraiser-imageUrl"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex-row w-full px-4 py-3 mt-4 text-base bg-white border rounded-lg outline-none dark:bg-nft-black-1 dark:border-nft-black-1 border-nft-gray-2 font-poppins dark:text-white text-nft-gray-2 flexBetween">
                    <input
                      title="Donation amount"
                      type="number"
                      value={donationValue}
                      onChange={(e) => setDonationValue(e.target.value)}
                      placeholder="Donation amount in USD"
                      className="flex-1 w-full bg-white outline-none dark:bg-nft-black-1 "
                    />

                    <p className="text-xl font-semibold font-poppins dark:text-white text-nft-black-1">
                      USD
                    </p>
                  </div>
                </div>

                <div className="mt-10 flexBetween">
                  <p className="text-base font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-xl">
                    Total CELO:
                  </p>
                  <p className="text-base font-normal font-poppins dark:text-white text-nft-black-1 minlg:text-xl">
                    {CELOAmount} <span className="font-semibold">CELO</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 flexCenter">
              <div className="flex flex-row sm:flex-col">
                <Button
                  btnName="Donate"
                  btnType="primary"
                  classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
                  handleClick={() => submitFunds(fundraiser.address)}
                />
                <Button
                  btnName="Cancel"
                  btnType="outline"
                  classStyles="rounded-lg"
                  handleClick={() => setPaymentModal(false)}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {sending && (
        <Modal
          header="Making donation"
          body={
            <div className="flex-col text-center flexCenter">
              <div className="relative w-52 h-52">
                <div className="flexCenter h-[10vh] w-full my-4">
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </div>
              </div>
            </div>
          }
          handleClose={() => setSending(false)}
        />
      )}

      {successModal && (
        <Modal
          header="Payment Successful"
          body={
            <div
              className="flex-col text-center flexCenter"
              onClick={() => setSuccessModal(false)}
            >
              <div className="relative w-52 h-52">
                <Image
                  alt="fundraiser"
                  src={fundraiser.imageURL as string}
                  objectFit="cover"
                  layout="fill"
                />
              </div>
              <p className="mt-10 text-sm font-normal font-poppins dark:text-white text-nft-black-1 minlg:text-xl">
                {" "}
                You successfully donated $ {donationValue} USD to{" "}
                <span className="font-semibold">{fundraiser.name}</span>
              </p>
            </div>
          }
          footer={
            <div className="flex-col flexCenter">
              <Button
                btnName="Print Receipt"
                btnType="primary"
                classStyles="sm:mr-0 sm:mb-5 rounded-xl"
                handleClick={() => setSuccessModal(false)}
              />
            </div>
          }
          handleClose={() => setSuccessModal(false)}
        />
      )}
    </div>
  );
};

export default AssetDetails;
