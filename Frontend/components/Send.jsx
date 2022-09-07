import {
  Button,
  FormControl,
  Spinner,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ethers } from "ethers";
import CustomContainer from "./CustomContainer";

export default function Send({ user }) {
  const [amount, setAmount] = useState(0);
  const [receiver, setReceiver] = useState("");
  const [sending, setSending] = useState(false);
  const { ethereum } = window;

  const handleChange = (value) => setAmount(value);

  const toast = useToast();

  const sendCELO = async (e) => {
    if (!amount || !receiver) return;
    e.preventDefault();
    const parsedAmount = ethers.utils.parseEther(amount);
    setSending(true);
    try {
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: user,
            to: receiver,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });
      toast({
        position: "top-left",
        title: "CELO successfully sent.",
        description: "Fresh CELO are showing up into the wallet.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setReceiver("");
      setSending(false);
    } catch (error) {
      console.log(error);
      setReceiver("");
      setSending(false);
    }
  };

  return (
    <CustomContainer>
      {sending ? (
        <div className="flex h-[250px] flex-col items-center justify-center py-2">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      ) : (
        <>
          <Text fontSize="xl" fontWeight="bold">
            Send CELO
          </Text>
          <form onSubmit={(e) => sendCELO(e)}>
            <FormControl mt="4">
              <FormLabel htmlFor="amount">Amount of CELO</FormLabel>
              <NumberInput step={0.1} onChange={handleChange}>
                <NumberInputField id="amount" value={amount} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormLabel htmlFor="receiver">Send to</FormLabel>
              <Input
                onChange={(e) => setReceiver(e.target.value)}
                id="receiver"
                value={receiver}
                type="text"
                placeholder="Receiver Address"
              />
            </FormControl>
            <Button type="submit" mt="4" colorScheme="purple">
              Send
            </Button>
          </form>
        </>
      )}
    </CustomContainer>
  );
}
