import { ethers } from "ethers";

export type MyDonations = [ethers.BigNumber[], ethers.BigNumber[]] & {
  values: ethers.BigNumber[];
  dates: ethers.BigNumber[];
};

export interface FundraiserItem {
  name: string;
  description: string;
  dollarDonationAmount: number;
  website: string;
  imageURL: string;
  address: string;
}
