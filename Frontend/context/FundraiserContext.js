import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useToast, Button } from "@chakra-ui/react";
const cc = require("cryptocompare");

import {
  FundraiserFactoryAddress,
  FundraiserFactoryABI,
  FundraiserABI,
} from "./constants";

export const FundraiserContext = React.createContext();

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    FundraiserFactoryAddress,
    FundraiserFactoryABI,
    signerOrProvider
  );
const fetchFundraiserContract = (signerOrProvider, FundraiserAddress) =>
  new ethers.Contract(FundraiserAddress, FundraiserABI, signerOrProvider);

export const FundraiserProvider = ({ children }) => {
  const FundraiserCurrency = "CELO";
  const [currentAccount, setCurrentAccount] = useState("");
  const [fundraisers, setFundraiser] = useState([]);
  const [isLoadingFundraiser, setIsLoadingFundraiser] = useState(false);
  const [donationValue, setDonationValue] = useState(null);
  const [owner, setIsOwner] = useState(false);
  const [userDonations, setUserDonations] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [successModal, setSuccessModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [loadDonations, setLoadDonations] = useState(true);

  const toast = useToast();

  // fetch all fundraisers
  const fetchFundraisers = async () => {
    setIsLoadingFundraiser(true);

    const provider = new ethers.providers.JsonRpcProvider(
      "https://alfajores-forno.celo-testnet.org"
    );
    const contract = fetchContract(provider);

    const data = await contract.fundraisers(10, 0);

    const items = await Promise.all(
      data.map(async (item) => {
        const instance = fetchFundraiserContract(provider, item);
        const name = await instance.name();
        const description = await instance.description();
        const totalDonations = await instance.totalDonations();
        const imageURL = await instance.imageURL();
        const website = await instance.url();

        const amountInCELO = ethers.utils.formatEther(totalDonations.toString());
        const exchangeRate = await cc.price("CELO", ["USD"]);
        const dollarDonationAmount = exchangeRate.USD * amountInCELO;
        setExchangeRate(exchangeRate.USD);

        return {
          name,
          description,
          dollarDonationAmount,
          website,
          imageURL,
          address: item,
        };
      })
    );

    setFundraiser(items);
    setIsLoadingFundraiser(false);
  };

  useEffect(() => {
    fetchFundraisers();
  }, []);

  // Not Authenticated toast
  const handleNewNotification = () => {
    toast({
      position: "top-left",
      title: "Not Authenticated",
      description: "Please connect to a Matamask Wallet",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  // Authenticated toast
  const handleConnect = () => {
    toast({
      position: "top-left",
      title: "Wallet connect",
      description: "Wallet connected successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  // New Fundraiser toast
  const handleNewFundraiser = () => {
    toast({
      position: "top-left",
      title: "New Fundraiser",
      description: "Fundraiser Created",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  // Donation toast
  const handleDonation = () => {
    toast({
      position: "top-left",
      title: "Donation",
      description: `You have successfully donated $ ${donationValue} USD to the fundraiser`,
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  // New Beneficiary toast
  const handleNewBeneficiary = () => {
    toast({
      position: "top-left",
      title: "New Beneficiary",
      description: "You have successfully changed the beneficary",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  // Withdraw toast
  const handleWithdraw = () => {
    toast({
      position: "top-left",
      title: "Withdraw",
      description: "You have successfully withdrawn your funds",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  // Not Authenticated toast
  const handleNotEnuogh = () => {
    toast({
      position: "top-left",
      title: "Not enuogh fund",
      description: "Sorry you do not have enuogh fund to make this transaction",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  // Get a fundraiser details
  const GetFundRaiserDetails = async (address) => {
    try {
      setIsOwner(false);
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const instance = fetchFundraiserContract(signer, address);
      const userDonations = await instance.myDonations({
        from: currentAccount,
      });
      const isOwner = await instance.owner({ from: currentAccount });

      if (isOwner.toLowerCase() === currentAccount) {
        setIsOwner(true);
      }

      setUserDonations(userDonations);
      setLoadDonations(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Donate to a fundraiser
  const submitFunds = async (address) => {
    try {
      setSending(true);
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const instance = fetchFundraiserContract(signer, address);
      const ethRate = exchangeRate;
      const ethTotal = donationValue / ethRate;
      const donation = ethers.utils.parseUnits(ethTotal.toString(), 18);

      const tx = await instance.donate({
        value: donation,
        from: currentAccount,
      });
      setSending(false);
      setSuccessModal(true);
      handleDonation();
      console.log(tx);
      //setDonationValue(0);
    } catch (error) {
      console.log(error);
      handleNotEnuogh();
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
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(signer);

    const transaction = contract.createFundraiser(
      name,
      url,
      imageURL,
      description,
      beneficiary
    );

    setIsLoadingFundraiser(true);
    //await transaction.wait();
    handleNewFundraiser();
    setIsLoadingFundraiser(false);
  };

  // Render user donation list
  const renderDonationsList = async () => {
    try {
      var donations = userDonations;
      if (donations === null) return null;

      const totalDonations = donations.length;

      var donationList = [];
      var i;
      for (i = 0; i < totalDonations; i++) {
        const ethAmount = ethers.utils.formatEther(donations[i].toString());
        const exchangeRate = await cc.price("CELO", ["USD"]);
        const userDonation = (await exchangeRate.USD) * ethAmount;
        let donationDate;
        if (donations.dates[i] === undefined) {
          donationDate = "no date found";
        } else {
          donationDate = donations.dates[i].toString();
        }

        donationList.push({
          donationAmount: userDonation.toFixed(2),
          date: donationDate,
        });
      }

      return donationList;
    } catch (error) {
      console.log(error);
    }
  };

  const CELOAmount = (donationValue / exchangeRate || 0).toFixed(4);

  // withdraw funds
  const withdrawalFunds = async (address) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const instance = fetchFundraiserContract(signer, address);
    await instance.withdraw({ from: currentAccount });

    handleWithdraw();
  };

  // set a new beneficiary
  const setBeneficiary = async (beneficiary, address) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const instance = fetchFundraiserContract(signer, address);
    await instance.setBeneficiary(beneficiary, { from: currentAccount });

    handleNewBeneficiary();
  };

  // Connect Wallet
  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask.");

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(accounts[0]);
    handleConnect();
    window.location.reload();
  };

  // Check if wallet is connected
  const checkIfWalletIsConnect = async () => {
    if (!window.ethereum) return handleNewNotification();

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
      handleConnect();
    } else {
      handleNewNotification();
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  return (
    <FundraiserContext.Provider
      value={{
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
        renderDonationsList,
        submitFunds,
        GetFundRaiserDetails,
        fundraisers,
        createAFundraiser,
        fetchFundraisers,
        connectWallet,
        currentAccount,
        owner,
        isLoadingFundraiser,
      }}
    >
      {children}
    </FundraiserContext.Provider>
  );
};
