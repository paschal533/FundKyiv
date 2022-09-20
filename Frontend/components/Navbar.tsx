import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import images from "../assets";
import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitcher";
import NavMenu from "./NavMenu";
import NavButtonGroup from "./NavButtonGroup";

const Navbar = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // disable body scroll when navbar is open
    document.body.style.overflow = isOpen ? "hidden" : "visible";
  }, [isOpen]);

  return (
    <nav className="sticky top-0 left-0 z-10 flex flex-row justify-between w-full p-4 bg-white border-b align-center border-nft-gray-1 dark:bg-nft-dark dark:border-nft-black-1">
      <Logo />

      <div className="flex flex-row justify-end flex-initial">
        <ThemeSwitcher />

        <div className="flex md:hidden">
          <NavMenu />
          <div className="ml-4">
            <NavButtonGroup />
          </div>
        </div>
      </div>

      <div className="hidden ml-2 md:flex">
        <Image
          src={isOpen ? images.cross : images.menu}
          objectFit="contain"
          width={25}
          height={25}
          alt={isOpen ? "close" : "menu"}
          role="button"
          onClick={() => setIsOpen(!isOpen)}
          className={theme === "light" ? "filter invert" : ""}
        />

        <div
          className={`${
            isOpen ? "visible" : "hidden"
          } fixed inset-0 z-10 flex flex-col justify-between bg-white top-65 dark:bg-nft-dark h-[calc(100vh - 65px)]`}
        >
          <div className="flex-1 p-4">
            <NavMenu />
          </div>
          <div className="p-4 border-t dark:border-nft-black-1 border-nft-gray-1">
            <NavButtonGroup />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
