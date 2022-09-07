import { Divider, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomContainer from "./CustomContainer";

export default function Transactions({ user }) {
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
