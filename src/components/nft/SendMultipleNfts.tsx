import { useChainId, Web3Button } from "@thirdweb-dev/react";
import { SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract } from "ethers";
import {
  TRANSFER_ERC1155_CONTRACTS,
  TRANSFER_ERC721_CONTRACTS,
} from "../../constants/contract";
import { TEvmAddress } from "../../types";
import { TNftRecipient } from "./AddNftRecipients";

type Props = {
  tokenAddress: TEvmAddress;
  recipients: TNftRecipient[];
  nftContract: SmartContract<BaseContract>;
  address: string;
  nftType: "ERC1155" | "ERC721" | "metaplex" | "";
};

export default function SendMultipleNfts(props: Props) {
  const { tokenAddress, recipients, nftContract, nftType, address } = props;
  const contracts =
    nftType === "ERC721"
      ? TRANSFER_ERC721_CONTRACTS
      : TRANSFER_ERC1155_CONTRACTS;
  const chainId = useChainId();
  const AIRDROP_CONTRACT =
    contracts.find((item) => item.chainId === chainId)?.contract ?? "";
  if (!AIRDROP_CONTRACT) {
    return <div>Error: Could not find contract for chainId: {chainId}</div>;
  }
  return (
    <Web3Button
      isDisabled={!address}
      contractAddress={AIRDROP_CONTRACT}
      action={async (contract) => {
        const isApproved = await nftContract.erc721.isApproved(
          address!,
          AIRDROP_CONTRACT
        );
        if (!isApproved) {
          const receipt = await nftContract.erc721.setApprovalForAll(
            AIRDROP_CONTRACT,
            true
          );
          console.log(receipt);
        }
        const _recipients = recipients.map((item) => item.to);
        const _tokenIds = recipients.map((item) => item.tokenId);
        contract.call("airdrop", tokenAddress, address, _recipients, _tokenIds);
      }}
    >
      Send batch
    </Web3Button>
  );
}
