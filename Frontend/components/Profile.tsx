import { Text } from "@chakra-ui/react";
import CustomContainer from "@/components/CustomContainer";
import { Address } from "@/types";

interface Props {
  user: Address;
}

const Profile = ({ user }: Props) => (
  <CustomContainer>
    <Text>
      <b>🙂 Wallet address:</b> {user}
    </Text>
  </CustomContainer>
);

export default Profile;
