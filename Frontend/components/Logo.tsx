import Image from "next/image";
import Link from "next/link";
import images from "../assets";

const Logo = () => (
  <div className="flex flex-row justify-start flex-1">
    <Link href="/">
      <a className="flex justify-center align-center">
        <Image
          src={images.logo02}
          objectFit="contain"
          width={32}
          height={32}
          alt="logo"
        />
        <p className="ml-1 text-lg font-semibold dark:text-white text-nft-black-1 md:flex md:invisible">
          FundBrave
        </p>
      </a>
    </Link>
  </div>
);

export default Logo;
