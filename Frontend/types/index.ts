import { ethers } from "ethers";

// TODO: Most probably contract use values as a field name, that's why it has weird formatting
export type MyDonations = [ethers.BigNumber[], ethers.BigNumber[]] & {
  values: ethers.BigNumber[];
  dates: ethers.BigNumber[];
};

export type Address = string;

export interface FundraiserItem {
  name: string;
  description: string;
  dollarDonationAmount: number;
  website: string;
  imageURL: string;
  address: Address;
}
