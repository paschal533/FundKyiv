import { useContext } from "react";
import Link from "next/link";
import Button from "./Button";
import { AuthContext } from "@/context/AuthContext";

const NavButtonGroup = () => {
  const { connectWallet, currentAccount } = useContext(AuthContext);

  return currentAccount ? (
    <div className="flex justify-center align-center">
      <Link href="/create">
        <a className="mx-2 btn-primary rounded-xl">Create</a>
      </Link>
    </div>
  ) : (
    <Button
      btnName="Connect"
      btnType="outline"
      classStyles="mx-2 rounded-lg"
      handleClick={connectWallet}
    />
  );
};

export default NavButtonGroup;
