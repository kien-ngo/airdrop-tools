import { useAddress, useNetwork, Web3Button } from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { parseEther } from "ethers/lib/utils";
import { TRANSFER_TOKEN_CONTRACTS } from "../../constants/contract";
import { TEvmAddress } from "../../types";
import { convertToWei } from "../../utils/number";
import { TRecipient } from "./AddTokenRecipients";

type Props = {
  uniqueRecipients: TRecipient[];
  totalAmountToSend: number;
};

export default function SendNativeToken(props: Props) {
  const { uniqueRecipients, totalAmountToSend } = props;
  const address = useAddress();
  const [{ data: chainData }] = useNetwork();
  const contractAddress =
    TRANSFER_TOKEN_CONTRACTS.find(
      (item) => item.chainId === chainData.chain?.id
    )?.contract ?? "";
  if (!contractAddress)
    <div className="mx-auto">
      Error: could not find chainId: {chainData.chain?.id}
    </div>;
  const _recipients: TEvmAddress[] = uniqueRecipients.map(
    (item) => item.to as TEvmAddress
  );
  const _amounts = uniqueRecipients.map((item) => convertToWei(item.amount));
  return (
    <Web3Button
      contractAddress={contractAddress}
      action={(contract) => {
        contract.call(
          "airdrop",
          NATIVE_TOKEN_ADDRESS,
          address,
          _recipients,
          _amounts,
          {
            value: parseEther(String(totalAmountToSend)),
          }
        );
      }}
    >
      Batch send
    </Web3Button>
  );
}
