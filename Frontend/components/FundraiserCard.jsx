import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

const FundraiserCard = ({ fundraiser }) => {
  return (
    <Link href={{ pathname: "/fundraiser-details", query: fundraiser }}>
      <div className="flex-1 p-4 m-2 bg-white shadow-md cursor-pointer min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 dark:bg-nft-black-3 rounded-2xl minlg:m-8 sm:my-2 sm:mx-2">
        <div className="relative overflow-hidden sm:w-full h-52 sm:h-36 xs:h-56 minmd:h-60 minlg:h-300 rounded-2xl">
          <Image
            src={fundraiser?.imageURL}
            layout="fill"
            objectFit="cover"
            alt="nft01"
            priority
          />
        </div>
        <div className="flex flex-col mt-3">
          <p className="font-semibold font-poppins dark:text-white text-nft-black-1 text-bold minlg:text-xl">
            {fundraiser?.name}
          </p>
          <div className="flex-row mt-1 flexBetween minlg:mt-3 xs:flex-col xs:items-start xs:mt-3">
            <p className="font-poppins w-[300px] sm:w-full mt-2 dark:text-white text-nft-black-1 font-semibold text-xs minlg:text-lg">
              <span className="font-normal">
                {" "}
                {fundraiser.description.slice(0, 231)}...
              </span>
            </p>
          </div>
          <div className="flex justify-between">
            <p className="mt-2 font-semibold font-poppins dark:text-white text-nft-black-1 text-bold minlg:text-lg">
              Total donations:{" "}
            </p>
            <p className="mt-2 font-semibold font-poppins dark:text-white text-nft-black-1 text-bold minlg:text-lg">
              $ {fundraiser?.dollarDonationAmount.toFixed(2)}
            </p>
          </div>
          <div className="w-[200px] mt-3">
            <Button
              btnName="Donate"
              btnType="primary"
              classStyles="rounded-md"
            />
          </div>
          <div className="flex-row mt-1 minlg:mt-3 flexBetween" />
        </div>
      </div>
    </Link>
  );
};

export default FundraiserCard;
