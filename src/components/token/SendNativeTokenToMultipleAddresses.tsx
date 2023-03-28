import { Web3Button } from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { parseEther, parseUnits } from "ethers/lib/utils";
import { TEvmAddress } from "../../types";
import { convertToWei } from "../../utils/number";
import { TErc20Recepient } from "./AddNativeTokenRecepients";

type TSendToMultipleProps = {
  recepients: TErc20Recepient[];
  callerAddress: TEvmAddress;
};

export default function SendNativeTokenToMultipleAddresses(
  props: TSendToMultipleProps
) {
  const arr: TErc20Recepient[] = props.recepients.reduce(
    (acc: TErc20Recepient[], current) => {
      const existingItemIndex = acc.findIndex(
        (item: TErc20Recepient) => item.address === current.address
      );
      if (existingItemIndex !== -1) {
        acc[existingItemIndex].amount += current.amount;
      } else {
        acc.push(current);
      }
      return acc;
    },
    []
  );
  const _recepients = arr.map((item) => item.address);
  const _amounts = arr.map((item) => convertToWei(item.amount));

  return (
    <Web3Button
      contractAddress="0xa56266B854287e15612b2A7d6077f4CECdF508D8"
      action={(contract) => {
        contract.call(
          "airdrop",
          NATIVE_TOKEN_ADDRESS,
          props.callerAddress,
          ["0xd587924ce50c703182409d7d45eb79a9fbe6b49d"],
          ["1000000000000000000"]
        );
      }}
      overrides={{
        value: parseEther("1"),
        gasLimit: 1000000
      }}
    >
      Batch send
    </Web3Button>
  );
}
