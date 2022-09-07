import { useContext, useEffect, useState } from "react";
import { FundraiserContext } from "../context/FundraiserContext";
import { Banner, SearchBar, FundraiserCard, Loader, Steps } from "../components";

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
          <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
            {!isLoadingFundraiser ? (
              newFundraisers?.map((fundraiser, index) => (
                <FundraiserCard key={index} fundraiser={fundraiser} />
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
      <Steps />
    </div>
  );
};

export default Home;
