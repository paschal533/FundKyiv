import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import { shortenAddress } from "@/utils/shortenAddress";
import images from "@/assets";
import { Flex, Text } from "@chakra-ui/react";
import { Button } from "@/components";
import { ProfileContext } from "@/context/ProfileContext";
import Donations from "@/components/Donations";

const Home = () => {
  const { currentAccount, connectWallet } = useContext(AuthContext);
  const { getTotalDonations, totalDonations, myDonations } =
    useContext(ProfileContext);

  useEffect(() => {
    if (myDonations) {
      getTotalDonations();
    }
  }, [myDonations]);

  if (!currentAccount) {
    return (
      <>
        <Head>
          <title>Login | Dashboard</title>
        </Head>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="80vh"
          overflowX="hidden"
          overflowY="hidden"
          bgGradient="linear(to-br, teal.400, purple.700)"
        >
          <Text fontSize="5xl" fontWeight="semiBold" color="white">
            Profile Page
          </Text>
          <div className="flex items-center justify-center w-full">
            <Button
              btnName="Connect"
              btnType="primary"
              classStyles="mx-2 rounded-lg"
              handleClick={connectWallet}
            />
          </div>
        </Flex>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="relative flex justify-center min-h-screen md:flex-col">
        <div className="relative flex-1 p-12 border-r flexCenter sm:px-4 md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1">
          <div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557 ">
            <Image
              alt="fundraiser-imageURL"
              src="https://openseauserdata.com/files/d80e3b549642e88b2154664c574ea334.svg"
              objectFit="cover"
              className="shadow-lg rounded-xl"
              layout="fill"
            />
          </div>
        </div>

        <div className="justify-start flex-1 p-12 sm:px-4 sm:pb-4">
          <div className="flex flex-row sm:flex-col">
            <h2 className="text-2xl font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-3xl">
              {Number(totalDonations) < 100 ? "Basic Account" : "Advance"}
            </h2>
          </div>

          <div className="mt-10">
            <p className="text-xs font-normal font-poppins dark:text-white text-nft-black-1 minlg:text-base">
              User Profile
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
                {shortenAddress(currentAccount)}
              </p>
            </div>
          </div>

          <h1 className="text-sm font-semibold mt-4 font-poppins dark:text-white text-nft-black-1 minlg:text-lg">
            My total Donations: ${totalDonations} USD
          </h1>

          <div className="flex flex-col mt-10">
            <div className="flex flex-row w-full border-b dark:border-nft-black-1 border-nft-gray-1">
              <p className="mb-2 text-base font-medium font-poppins dark:text-white text-nft-black-1">
                My Donations
              </p>
            </div>
            <Donations />
          </div>
        </div>
      </div>

      {/*<div className="flex flex-col items-center justify-start w-full min-h-screen">
        <div className="flex-col w-full flexCenter">
          <Banner
            name="Your Profile"
            childStyles="text-center mb-4"
            parentStyle="h-80 justify-center"
          />

          <div className="z-0 flex-col -mt-20 flexCenter">
            <div className="w-40 h-40 p-1 rounded-full flexCenter sm:w-36 sm:h-36 bg-nft-black-2">
              <Image
                alt="creator"
                src={images.creator1}
                className="object-cover rounded-full"
                objectFit="cover"
              />
            </div>
            <p className="mt-6 text-2xl font-semibold font-poppins dark:text-white text-nft-black-1">
              {shortenAddress(currentAccount)}
            </p>
          </div>
        </div>

        <Flex
          className="mt-4 mb-4 rounded-md"
          bgGradient="linear(to-br, teal.400, purple.700)"
          direction="column"
          width="90vw"
          height="100%"
          overflowX="hidden"
        >
          <Box flex="1" px="44" py="20">
            <Tabs
              size="lg"
              colorScheme="purple"
              align="center"
              variant="enclosed"
            >
              <TabList>
                <Tab _selected={{ color: "white" }} fontWeight="bold">
                  Profile
                </Tab>
                <Tab _selected={{ color: "white" }} fontWeight="bold">
                  Balance
                </Tab>
                <Tab _selected={{ color: "white" }} fontWeight="bold">
                  Transactions
                </Tab>
                <Tab _selected={{ color: "white" }} fontWeight="bold">
                  Send CELO
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Profile user={currentAccount} />
                </TabPanel>
                <TabPanel>
                  <Balance user={currentAccount} />
                </TabPanel>
                <TabPanel>
                  <Transactions user={currentAccount} />
                </TabPanel>
                <TabPanel>
                  <Send user={currentAccount} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </div>*/}
    </>
  );
};

export default Home;
