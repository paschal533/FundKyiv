import { ethers } from "ethers";

export type MyDonations = [ethers.BigNumber[], ethers.BigNumber[]] & {
  values: ethers.BigNumber[];
  dates: ethers.BigNumber[];
};
