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
import CustomContainer from "@/components/CustomContainer";
import { Address } from "@/types";
import { notifyCELOSent } from "../services/notifications";

interface Props {
  user: Address;
}

const Send = ({ user }: Props) => {
  const [amount, setAmount] = useState("0");
  const [receiver, setReceiver] = useState("");
  const [sending, setSending] = useState(false);

  const handleChange = (value: string) => setAmount(value);

  const sendCELO = async (e: React.SyntheticEvent) => {
    if (amount === "0" || !receiver) return;
    e.preventDefault();

    try {
      const parsedAmount = ethers.utils.parseEther(amount);
      setSending(true);
      await window.ethereum.request({
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
      notifyCELOSent();
    } catch (error) {
      console.log(error);
    } finally {
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
          <form onSubmit={sendCELO}>
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
};

export default Send;
