import { useContext, useEffect, useState } from "react";
import { FundraiserContext } from "../context/FundraiserContext";
import {
  Banner,
  SearchBar,
  FundraiserCard,
  Loader,
  Steps,
} from "../components";
import Link from "next/link";
import Head from "next/head";
import { Button } from "@chakra-ui/react";

const Home = () => {
  const { fundraisers, isLoadingFundraiser } = useContext(FundraiserContext);
  const [activeSelect, setActiveSelect] = useState("Recently Added");
  const [newFundraisers, setFundraisers] = useState(fundraisers);
  const [fundraisersCopy, setFundraisersCopy] = useState(fundraisers);

  useEffect(() => {
    setFundraisers(fundraisers);
    setFundraisersCopy(fundraisers);
  }, [fundraisers]);

  const onHandleSearch = (value) => {
    const filteredFundraisers = fundraisers.filter(({ name }) =>
      name.toLowerCase().includes(value?.toLowerCase())
    );

    if (filteredFundraisers.length === 0) {
      setFundraisers(fundraisersCopy);
    } else {
      setFundraisers(filteredFundraisers);
    }
  };

  const onClearSearch = () => {
    if (newFundraisers.length && fundraisersCopy.length) {
      setFundraisers(fundraisersCopy);
    }
  };

  return (
    <div className="justify-center">
      <Head>Home | FundKyiv</Head>
      <div className="w-full minmd:w-4/5 sm:px-4 p-12">
        <Banner
          name={
            <>
              The slightest help from you, <br />
              means a lot to us.
            </>
          }
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          parentStyle="justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
        />
        <div className="mt-10">
          <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
            <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
              Top Fundraisers
            </h1>

            <div className="flex-2 sm:w-full flex flex-row sm:flex-col">
              <SearchBar
                activeSelect={activeSelect}
                setActiveSelect={setActiveSelect}
                handleSearch={onHandleSearch}
                clearSearch={onClearSearch}
              />
            </div>
          </div>
          <div className="mt-3 pl-7 pr-7 sm:pl-0 sm:pr-0 w-full flex flex-wrap justify-start md:justify-center">
            {!isLoadingFundraiser ? (
              newFundraisers
                ?.reverse()
                .slice(0, 3)
                .map((fundraiser, index) => (
                  <FundraiserCard key={index} fundraiser={fundraiser} />
                ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
      <div className="w-full justify-center items-center sm:p-2 p-0 flex mb-8">
        <Link href="/fundraisers">
          <Button
            as="a"
            backgroundColor="#3198FE"
            border="1px solid #3198FE"
            color="white"
            _hover={{
              backgroundColor: "#000",
              border: "1px solid #3198FE",
              color: "white",
            }}
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            w={{ base: "full", sm: "auto" }}
            mb={{ base: 2, sm: 0 }}
            size="lg"
            cursor="pointer"
          >
            View more Fundraisers
          </Button>
        </Link>
      </div>
      <Steps />
    </div>
  );
};

export default Home;
