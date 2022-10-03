import { useContext, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Button } from "@chakra-ui/react";
import { Banner, SearchBar, FundraiserCard, Loader, Steps } from "@/components";
import { FundraiserContext } from "@/context/FundraiserContext";

const Home = () => {
  const { fundraisers, isLoadingFundraiser } = useContext(FundraiserContext);
  const [activeSelect, setActiveSelect] = useState("Recently Added");
  const [searchValue, setSearchValue] = useState("");

  const onHandleSearch = (value: string) => {
    setSearchValue(value.toLowerCase());
  };

  const onClearSearch = () => {
    setSearchValue("");
  };

  return (
    <div className="justify-center">
      <Head>Home | FundKyiv</Head>
      <div className="w-full p-12 minmd:w-4/5 sm:px-4">
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
          <div className="mx-4 flexBetween xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
            <h1 className="flex-1 text-2xl font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-4xl sm:mb-4">
              Top Fundraisers
            </h1>

            <div className="flex flex-row flex-2 sm:w-full sm:flex-col">
              <SearchBar
                activeSelect={activeSelect}
                setActiveSelect={setActiveSelect}
                handleSearch={onHandleSearch}
                clearSearch={onClearSearch}
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-start w-full mt-4 md:justify-center">
            {!isLoadingFundraiser
              ? fundraisers
                  .filter(({ name }) =>
                    name.toLowerCase().includes(searchValue)
                  )
                  .slice(0, 4)
                  .map((fundraiser, index) => (
                    <FundraiserCard
                      key={index}
                      fundraiser={fundraiser}
                      isLoadingFundraiser={isLoadingFundraiser}
                    />
                  ))
              : [1, 2, 3, 4].map((fundraiser, index) => (
                  <FundraiserCard
                    key={index}
                    fundraiser={fundraiser}
                    isLoadingFundraiser={isLoadingFundraiser}
                  />
                ))}
          </div>
        </div>
      </div>
      {!isLoadingFundraiser && (
        <div className="flex items-center justify-center w-full p-0 mb-8 sm:p-2">
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
      )}
      <Steps />
    </div>
  );
};

export default Home;
