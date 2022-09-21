import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { shortenAddress } from "@/utils/shortenAddress";
import images from "@/assets";
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
} from "@/components";

const Home = () => {
  const { currentAccount, connectWallet } = useContext(AuthContext);

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
      <div className="flex flex-col items-center justify-start w-full min-h-screen">
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
      </div>
    </>
  );
};

export default Home;
