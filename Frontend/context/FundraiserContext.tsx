import React, { useState } from "react";
import { ethers } from "ethers";
import {
  handleConnect,
  handleDonation,
  handleNewFundraiser,
  handleNotEnough,
  handleWithdraw,
} from "../services/notifications";
import * as API from "../services/api";
import { MyDonations } from "../types/interfaces";

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
  const [currentAccount, setCurrentAccount] = useState<null | string>(null);
  const [isLoadingFundraiser, setIsLoadingFundraiser] = useState(false);
  const [donationValue, setDonationValue] = useState(0);
  const [owner, setIsOwner] = useState(false);
  const [userDonations, setUserDonations] = useState<MyDonations | null>(null);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [successModal, setSuccessModal] = useState(false);
  const [sending, setSending] = useState(false);
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

  // Donate to a fundraiser
  const submitFunds = async (address: string) => {
    try {
      if (!currentAccount) {
        return;
      }

      setSending(true);
      const signer = await API.getProvider();

      const instance = API.fetchFundraiserContract(address, signer);

      const ethRate = await API.getExchangeRate();
      const ethTotal = donationValue / ethRate;
      const donation = ethers.utils.parseUnits(ethTotal.toString(), 18);

      const tx = await instance.donate({
        value: donation,
        from: currentAccount,
      });
      setSending(false);
      setSuccessModal(true);
      handleDonation(donationValue);
      console.log(tx);
      // setDonationValue(0);
    } catch (error) {
      console.log(error);
      handleNotEnough();
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

  // TODO: Use API.getExchangeRate call to get the exchange rate
  const CELOAmount = (donationValue / exchangeRate || 0).toFixed(4);

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

  // Connect Wallet
  const connectWallet = async () => {
    const account = await API.connectWallet();

    if (account) {
      setCurrentAccount(account);
      handleConnect();
      // TODO: Fund a way to update the fundraiser when account is connected or changed
      window.location.reload();
    }
  };

  return {
    userDonations,
    setCurrentAccount,
    FundraiserCurrency,
    loadDonations,
    setLoadDonations,
    setIsOwner,
    withdrawalFunds,
    setSending,
    sending,
    setSuccessModal,
    successModal,
    CELOAmount,
    donationValue,
    setDonationValue,
    submitFunds,
    getFundRaiserDetails,

    createAFundraiser,

    connectWallet,
    currentAccount,
    owner,
    isLoadingFundraiser,
  };
};
