import {
  useContract,
  useTransferBatchToken,
  useTransferToken,
  Web3Button,
} from "@thirdweb-dev/react";
import { TEvmAddress } from "../../types";
import LoadingSpinner from "../shared/LoadingSpinner";
import { TRecipient } from "./AddTokenRecipients";

type Props = {
  recipients: TRecipient[];
  tokenAddress: TEvmAddress;
  totalAmountToSend: number;
};

export default function SendErc20Token(props: Props) {
  const { recipients, tokenAddress, totalAmountToSend } = props;
  const { contract: tokenContract, isLoading: loadingTokenContract } =
    useContract(tokenAddress);
  const { mutateAsync: transferBatchToken } =
    useTransferBatchToken(tokenContract);
  const { mutate: transferTokens } = useTransferToken(tokenContract);

  if (!tokenAddress || loadingTokenContract) {
    return (
      <div className="mx-auto mt-2">
        <LoadingSpinner />
      </div>
    );
  }

  if (recipients.length === 1) {
    return (
      <Web3Button
        contractAddress={tokenAddress}
        action={() =>
          transferTokens({
            to: recipients[0].to, // Address to transfer to
            amount: totalAmountToSend, // Amount to transfer
          })
        }
        onSubmit={() => {
          alert("Tx submitted!");
        }}
        onSuccess={(result) => {
          alert("Tx sent!");
        }}
        onError={(result) => {
          alert("Tx failed!");
        }}
      >
        Send now
      </Web3Button>
    );
  }
  return (
    <Web3Button
      contractAddress={tokenAddress}
      action={() => {
        transferBatchToken(recipients);
      }}
      onSubmit={() => {
        alert("Tx submitted!");
      }}
      onSuccess={(result) => {
        alert("Tx sent!");
      }}
      onError={(result) => {
        alert("Tx failed!");
      }}
    >
      Batch send
    </Web3Button>
  );
}
