import { useTransferNFT, Web3Button } from "@thirdweb-dev/react";
import { SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract } from "ethers";
import { TEvmAddress } from "../../types";
import { TNftRecipient } from "./AddNftRecipients";

type Props = {
  recipient: TNftRecipient;
  tokenAddress: TEvmAddress;
  nftContract: SmartContract<BaseContract>;
};

export default function SendSingleNft(props: Props) {
  const { recipient, tokenAddress, nftContract } = props;
  const {
    mutateAsync: transferNFT,
    isLoading,
    error,
    //@ts-ignore
  } = useTransferNFT(nftContract);
  return (
    <Web3Button
      isDisabled={isLoading}
      contractAddress={tokenAddress}
      action={() => transferNFT(recipient)}
    >
      Transfer
    </Web3Button>
  );
}
