import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Address } from "../types";
import CustomContainer from "./CustomContainer";

interface Props {
  user: Address;
}

// TODO: Is it the same component we use for fundraiser-details page?
export default function Transactions({ user }: Props) {
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    const init = async () => {
      try {
      } catch (error) {
        console.log(error);
      }
    };
    init();
  }, []);

  return (
    <CustomContainer>
      <Text fontSize="xl" mb="6" fontWeight="bold">
        My Transactions counts
      </Text>
      <Text>{transactions && transactions[0]}</Text>
      {/*transactions && transactions.map(transaction => {
        <div key={transaction.hash}>
          <Link href={`${BaseURL}${transaction.hash}`} isExternal>{transaction.hash}</Link>
          <Divider />
        </div>
      })*/}
    </CustomContainer>
  );
}
