import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import { FundraiserContext } from "../context/FundraiserContext";
import { shortenAddress } from "../utils/shortenAddress";
import images from "../assets";
import {
  Box,
  Flex,
  TabList,
  Tabs,
  Text,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import {
  Profile,
  Balance,
  Transactions,
  Send,
  Button,
  Banner,
} from "../components";

export default function Home() {
  const { currentAccount, connectWallet } = useContext(FundraiserContext);

  if (!currentAccount?.length > 0) {
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
          <div className="flex justify-center items-center w-full">
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
      <div className="w-full flex justify-start items-center flex-col min-h-screen">
        <div className="w-full flexCenter flex-col">
          <Banner
            name="Your Profile"
            childStyles="text-center mb-4"
            parentStyle="h-80 justify-center"
          />

          <div className="flexCenter flex-col -mt-20 z-0">
            <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full">
              <Image
                alt="creator"
                src={images.creator1}
                className="rounded-full object-cover"
                objectFit="cover"
              />
            </div>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">
              {shortenAddress(currentAccount)}
            </p>
          </div>
        </div>

        <Flex
          className="rounded-md mt-4 mb-4"
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
                  Send CFX
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
      </div>
    </>
  );
}
