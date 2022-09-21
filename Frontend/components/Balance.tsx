import { Divider, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import CustomContainer from "@/components/CustomContainer";
import { AuthContext } from "@/context/AuthContext";

const Balance = () => {
  const { currentAccount } = useContext(AuthContext);
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    const getAddressBalance = async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://alfajores-forno.celo-testnet.org"
      );
      const balance = await provider.getBalance(currentAccount);
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
};

export default Balance;
