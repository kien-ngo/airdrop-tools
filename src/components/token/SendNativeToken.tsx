import { useAddress, useContract, Web3Button } from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { parseEther } from "ethers/lib/utils";
import { TEvmAddress } from "../../types";

type Props = {
  _recipients: TEvmAddress[];
  _amounts: string[];
  totalAmountToSend: number;
  uniqueRicepientAddresses: string[];
};

export default function SendNativeToken(props: Props) {
  const { _recipients, _amounts, totalAmountToSend, uniqueRicepientAddresses } =
    props;
  const { contract } = useContract(NATIVE_TOKEN_ADDRESS);
  const address = useAddress();
  return (
    <Web3Button
      contractAddress="0xa56266B854287e15612b2A7d6077f4CECdF508D8"
      action={(contract) => {
        contract.call(
          "airdrop",
          NATIVE_TOKEN_ADDRESS,
          address,
          _recipients,
          _amounts
        );
      }}
      overrides={{
        value: parseEther("1"),
        gasLimit: 1000000,
      }}
    >
      Batch send
    </Web3Button>
  );
}
