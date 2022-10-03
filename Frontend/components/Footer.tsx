import Image from "next/image";
import { useTheme } from "next-themes";

import images from "@/assets";
import Button from "@/components/Button";
import Link from "next/link";

interface Props {
  heading: string;
  items: Array[];
  extraClasses?: string;
}

// TODO: Move to a separate file and create a links for each item
const FooterLinks = ({ heading, items, extraClasses }: Props) => (
  <div className={`flex-1 justify-start items-start ${extraClasses}`}>
    <h3 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl mb-10">
      {heading}
    </h3>
    {items.map((item, index) => (
      <Link href={item.link}>
      <p
        key={index}
        className="font-poppins dark:text-white text-nft-black-1 font-normal text-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-1 my-3"
      >
        {item.name}
      </p>
      </Link>
    ))}
  </div>
);

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="flexCenter flex-col border-t dark:border-nft-black-1 border-nft-gray-1 sm:py-8 py-16">
      <div className="w-full minmd:w-4/5 flex flex-row md:flex-col sm:px-4 px-16">
        <div className="flexStart flex-1 flex-col">
          <div className="flexCenter cursor-pointer">
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
            <p className=" dark:text-white text-nft-dark font-semibold text-lg ml-1">
              FundBrave
            </p>
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base mt-6">
            Get the latest updates
          </p>
          <div className="flexBetween md:w-full minlg:w-557 w-357 mt-6 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-nft-gray-2 rounded-md">
            <input
              type="email"
              placeholder="Your Email"
              className="h-full flex-1 w-full dark:bg-nft-black-2 bg-white px-4 rounded-md font-poppins dark:text-white text-nft-black-1 font-normal text-xs minlg:text-lg outline-none"
            />
            <div className="flex-initial">
              <Button
                btnName="Email me"
                btnType="primary"
                classStyles="rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 flexBetweenStart flex-wrap ml-10 md:ml-0 md:mt-8">
          <FooterLinks
            heading="FundBrave"
            items={[
              {name : "Explore", link: "/"},
              {name : "How it Works", link: "/how-it-works"},
              {name : "Contact Us", link: "/contact-us"}
            ]}
          />
          <FooterLinks
            heading="Support"
            items={[
              {name: "Help Center", link: "/help-center"},
              {name : "Terms of service", link: "/terms-of-service"},
              {name: "Legal", link: "/legal"},
              {name: "Privacy policy", link: "/privacy-policy"}
            ]}
            extraClasses="ml-4"
          />
        </div>
      </div>

      <div className="flexCenter w-full mt-5 border-t dark:border-nft-black-1 border-nft-gray-1 sm:px-4 px-16">
        <div className="flexBetween flex-row w-full minmd:w-4/5 sm:flex-col mt-7">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base">
            FundBrave, Inc. All Rights Reserved
          </p>
          <div className="flex flex-row sm:mt-4">
            {[
              {image : images.instagram, link: " https://www.facebook.com/fundbrave" },
              {image :  images.twitter, link: "https://twitter.com/fundbrave"},
              {image :  images.telegram, link: "https://web.telegram.org/z/#5443610770"},
              {image :  images.discord, link: "https://discord.com/channels/1021140908323905546/1021140908323905549"}
            ].map((image, index) => (
              <div className="mx-2 cursor-pointer" key={index}>
                <a href={image.link} target="_blank">
                <Image
                  src={image.image}
                  key={index}
                  objectFit="contain"
                  width={24}
                  height={24}
                  alt="social"
                  className={theme === "light" ? "filter invert" : undefined}
                />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
