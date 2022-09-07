import { useState, useEffect, useContext } from "react";
import { Spinner } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRef } from "react";

//import { FundraiserContext } from "../context/FundraiserContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Button, Loader, Modal } from "../components";
import images from "../assets";

const AssetDetails = () => {
  const {
    owner,
    setSending,
    setLoadDonations,
    loadDonations,
    setIsOwner,
    withdrawalFunds,
    GetFundRaiserDetails,
    setSuccessModal,
    sending,
    successModal,
    CELOAmount,
    submitFunds,
    donationValue,
    setDonationValue,
    currentAccount,
    renderDonationsList,
    connectWallet,
  } = useContext(FundraiserContext);
  const [fundraiser, setFundraiser] = useState({
    imageURL: "",
    name: "",
    description: "",
    address: "",
  });
  const [paymentModal, setPaymentModal] = useState(false);
  const [myDonations, setMyDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef(null);
  const { theme } = useTheme();
  const router = useRouter();

  
  // check if it is cliked outside of modalRef
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setPaymentModal(false);
    }
  };

  const PaymentBodyCmp = ({ fundraiser, fundraiserCurrency }) => (
    <div className="flex flex-col text-center justify-center">
      <p className="font-poppins text-center dark:text-white text-nft-black-1 text-bold minlg:text-xl font-normal">
        {fundraiser?.name}
      </p>

      <div className="my-5 flex w-full justify-center items-center">
        <div className="relative w-28 h-28 rounded-md">
          <Image src={fundraiser.imageURL} alt="fundraiser-imageUrl" layout="fill" objectFit="cover" />
        </div>
      </div>

      <div>
         
        <div className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flexBetween flex-row">
          <input
            title="Donation amount"
            type="number"
            value={donationValue}
            onChange={(e) => setDonationValue(e.target.value)}
            placeholder="Donation amount in USD"
            className="flex-1 w-full dark:bg-nft-black-1 bg-white outline-none "
          />

          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            CELO
          </p>
        </div>
      </div>

      <div className="flexBetween mt-10">
        <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">
          Total CELO:
        </p>
        <p className="font-poppins dark:text-white text-nft-black-1 text-base minlg:text-xl font-normal">
          {CELOAmount}{" "}
          <span className="font-semibold">{fundraiserCurrency}</span>
        </p>
      </div>
    </div>
  );

  useEffect(() => {
    // disable body scroll when navbar is open
    if (paymentModal || successModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [paymentModal, successModal]);

  useEffect(() => {
    if (!router.isReady) return;

    setFundraiser(router.query);

    setIsLoading(false);
  }, [router.isReady, router.query.address, router.query]);

  useEffect(() => {
    const GetDonationList = async (address) => {
      try {
        setLoadDonations(true);
        await GetFundRaiserDetails(address);
        const donations = await renderDonationsList();
        setMyDonations(donations);
        setLoadDonations(false);
      } catch (error) {
        console.log(error);
      }
    };

    GetDonationList(fundraiser.address);
  }, [fundraiser.address, setLoadDonations]);

  if (isLoading) return <Loader />;

  return (
    <div className="relative flex justify-center md:flex-col min-h-screen">
      <div className="relative flex-1 flexCenter sm:px-4 p-12 border-r md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1">
        <div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557 ">
          <Image
            alt="fundraiser-imageURL"
            src={fundraiser.imageURL}
            objectFit="cover"
            className=" rounded-xl shadow-lg"
            layout="fill"
          />
        </div>
      </div>

      <div className="flex-1 justify-start sm:px-4 p-12 sm:pb-4">
        <div className="flex flex-row sm:flex-col">
          <h2 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl minlg:text-3xl">
            {fundraiser.name}
          </h2>
        </div>

        <div className="mt-10">
          <p className="font-poppins dark:text-white text-nft-black-1 text-xs minlg:text-base font-normal">
            Creator
          </p>
          <div className="flex flex-row items-center mt-3">
            <div className="relative w-12 h-12 minlg:w-20 minlg:h-20 mr-2">
              <Image
                alt="creator1"
                src={images.creator1}
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-lg font-semibold">
              {shortenAddress(fundraiser.address)}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col">
          <div className="w-full border-b dark:border-nft-black-1 border-nft-gray-1 flex flex-row">
            <p className="font-poppins dark:text-white text-nft-black-1 font-medium text-base mb-2">
              Details
            </p>
          </div>
          <div className="mt-3">
            <p className="font-poppins mb-4 dark:text-white text-nft-black-1 font-normal text-base">
              {fundraiser.description}
            </p>

            <a href={fundraiser.website} target="_blank" className="font-poppins bg-[] dark:text-white text-nft-black-1 font-normal text-base">
              <Button
                btnName="Learn more..."
                btnType="outline"
                classStyles="mx-2 rounded-lg"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col mt-10">
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
              <div className="mt-8 w-full justify-center items-center text-center">
                <h1 className="dark:text-white text-nft-black-1 font-bold text-2xl">
                  My Donations
                </h1>
                {myDonations?.length > 0 ? (
                  myDonations.map((donation, index) => {
                    return (
                      <div key={index} className="mt-4 flex w-full justify-center items-center text-center ">
                        <p className="dark:text-white text-nft-black-1 font-normal text-base">
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
                          <p className="nft-gradient text-sm minlg:text-lg ml-3 rounded-md py-2 px-6 minlg:py-4 minlg:px-8 font-poppins font-semibold text-white">
                            Request Receipt
                          </p>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <p className="dark:text-white mt-4 text-nft-black-1 font-normal text-base">
                    No donation record found
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full mt-4 justify-center text-center items-center">
            <h1 className="dark:text-white text-nft-black-1 font-bold text-2xl">
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
      className="flexCenter fixed inset-0 z-10 bg-overlay-black animated fadeIn"
    >
      <div
        ref={modalRef}
        className="w-2/5 md:w-11/12 minlg:w-2/4 dark:bg-nft-dark bg-white flex flex-col rounded-lg"
      >
        <div className="flex justify-end mt-4 mr-4 minlg:mt-6 minlg:mr-6">
          <div
            className="relative w-3 h-3 minlg:w-6 minlg:h-6 cursor-pointer"
            onClick={() => setPaymentModal(false)}
          >
            <Image
              src={images.cross}
              layout="fill"
              className={theme === "light" ? "filter invert" : undefined}
            />
          </div>
        </div>

        <div className="flexCenter w-full text-center p-4">
          <h2 className="font-poppins dark:text-white text-nft-black-1 font-normal text-2xl">
             Make A Donation
          </h2>
        </div>
        <div className="p-10 sm:px-4 border-t border-b dark:border-nft-black-3 border-nft-gray-1">
          <div className="flex flex-col text-center justify-center">
            <p className="font-poppins text-center dark:text-white text-nft-black-1 text-bold minlg:text-xl font-normal">
              {fundraiser?.name}
            </p>

            <div className="my-5 flex w-full justify-center items-center">
              <div className="relative w-28 h-28 rounded-md">
                <Image src={fundraiser.imageURL} alt="fundraiser-imageUrl" layout="fill" objectFit="cover" />
              </div>
            </div>

            <div>
              
              <div className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flexBetween flex-row">
                <input
                  title="Donation amount"
                  type="number"
                  value={donationValue}
                  onChange={(e) => setDonationValue(e.target.value)}
                  placeholder="Donation amount in USD"
                  className="flex-1 w-full dark:bg-nft-black-1 bg-white outline-none "
                />

                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  CELO
                </p>
              </div>
            </div>

            <div className="flexBetween mt-10">
              <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base minlg:text-xl">
                Total CELO:
              </p>
              <p className="font-poppins dark:text-white text-nft-black-1 text-base minlg:text-xl font-normal">
                {CELOAmount}{" "}
                <span className="font-semibold">CELO</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flexCenter p-4">
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
    </div>)}

      {sending && (
        <Modal
          header="Making donation"
          body={
            <div className="flexCenter flex-col text-center">
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
              className="flexCenter flex-col text-center"
              onClick={() => setSuccessModal(false)}
            >
              <div className="relative w-52 h-52">
                <Image
                  alt="fundraiser"
                  src={fundraiser.imageURL}
                  objectFit="cover"
                  layout="fill"
                />
              </div>
              <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal mt-10">
                {" "}
                You successfully donated $ {donationValue} USD to{" "}
                <span className="font-semibold">{fundraiser.name}</span>
              </p>
            </div>
          }
          footer={
            <div className="flexCenter flex-col">
              <Button
                btnName="Print Receipt"
                btnType="primary"
                classStyles="sm:mr-0 sm:mb-5 rounded-xl"
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
