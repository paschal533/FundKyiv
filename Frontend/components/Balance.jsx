import { Divider, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import CustomContainer from "./CustomContainer";

export default function Balance({ user }) {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const getAddressBalance = async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://alfajores-forno.celo-testnet.org"
      );
      const balance = await provider.getBalance(user);
      setBalance(ethers.utils.formatEther(balance.toString()));
    };
    getAddressBalance();
  });

  return (
    <CustomContainer>
      <Text mb="6" fontSize="xl" fontWeight="bold">
        My CELO Token
      </Text>
      {balance && (
        <Text>
          💰 {balance} <b>CELO</b>
        </Text>
      )}
      <Divider />
    </CustomContainer>
  );
}
