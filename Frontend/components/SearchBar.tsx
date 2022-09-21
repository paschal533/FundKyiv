import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import images from "@/assets";

interface Props {
  activeSelect: string;
  setActiveSelect: (value: string) => void;
  handleSearch: (value: string) => void;
  clearSearch: () => void;
}

const SearchBar = ({
  activeSelect,
  setActiveSelect,
  handleSearch,
  clearSearch,
}: Props) => {
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setSearch(debouncedSearch), 1000);

    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      clearSearch();
    }
  }, [search, clearSearch, handleSearch]);

  return (
    <>
      <div className="flex-1 px-4 py-3 bg-white border rounded-md flexCenter dark:bg-nft-black-2 dark:border-nft-black-2 border-nft-gray-2">
        <Image
          src={images.search}
          objectFit="contain"
          width={20}
          height={20}
          alt="search"
          className={theme === "light" ? "filter invert" : undefined}
        />
        <input
          type="text"
          placeholder="Search item here"
          className="w-full mx-4 text-xs font-normal bg-white outline-none dark:bg-nft-black-2 font-poppins dark:text-white text-nft-black-1"
          onChange={(e) => setDebouncedSearch(e.target.value)}
          value={debouncedSearch}
        />
      </div>

      <div
        onClick={() => setToggle(!toggle)}
        className="relative px-4 py-3 ml-4 bg-white border rounded-md cursor-pointer flexBetween sm:ml-0 sm:mt-2 min-w-190 dark:bg-nft-black-2 dark:border-nft-black-2 border-nft-gray-2"
      >
        <p className="text-xs font-normal font-poppins dark:text-white text-nft-black-1">
          {activeSelect}
        </p>
        <Image
          src={images.arrow}
          objectFit="contain"
          width={15}
          height={15}
          alt="arrow"
          className={theme === "light" ? "filter invert" : undefined}
        />

        {toggle && (
          <div className="absolute left-0 right-0 z-10 w-full px-4 py-3 mt-3 bg-white border rounded-md top-full dark:bg-nft-black-2 dark:border-nft-black-2 border-nft-gray-2">
            {[
              "Recently added",
              "Price (low to high)",
              "Price (high to low)",
            ].map((item) => (
              <p
                className="my-3 text-xs font-normal cursor-pointer font-poppins dark:text-white text-nft-black-1"
                onClick={() => setActiveSelect(item)}
                key={item}
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
