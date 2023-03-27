import { useContract, useTransferToken, Web3Button } from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { TEvmAddress } from "../../types";

type TSendToSingleAddressProps = {
  amount: number;
  recepientAddress: TEvmAddress;
};

export default function SendToSingleAddress(props: TSendToSingleAddressProps) {
  const { amount, recepientAddress } = props;
  const { contract } = useContract(NATIVE_TOKEN_ADDRESS);
  const { mutate: transferTokens } = useTransferToken(contract);
  return (
    <Web3Button
      contractAddress={NATIVE_TOKEN_ADDRESS}
      action={() =>
        transferTokens({
          to: recepientAddress,
          amount: amount,
        })
      }
    >
      Transfer
    </Web3Button>
  );
}
