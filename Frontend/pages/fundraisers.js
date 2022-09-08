import { useContext, useEffect, useState } from "react";
import { FundraiserContext } from "../context/FundraiserContext";
import { SearchBar, FundraiserCard, Loader } from "../components";
import Head from "next/head";

const Fundraisers = () => {
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
    <div className="p-5 sm:p-2">
      <Head>Fundraisers</Head>
      <div className="mt-10">
        <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
          <h1 className="flex-1 font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
            Fundraisers
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
        <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
          {!isLoadingFundraiser ? (
            newFundraisers
              ?.reverse()
              .map((fundraiser, index) => (
                <FundraiserCard key={index} fundraiser={fundraiser} />
              ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default Fundraisers;
