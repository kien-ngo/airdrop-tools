import {
  useContract,
  useTransferBatchToken,
  useTransferToken,
  Web3Button,
} from "@thirdweb-dev/react";
import { TEvmAddress } from "../../types";
import { TRecipient } from "./AddTokenRecipients";

type Props = {
  recipients: TRecipient[];
  tokenAddress: TEvmAddress;
  totalAmountToSend: number;
  uniqueRicepientAddresses: string[];
};

export const ERC20_TEST = "0xAc972F39b8b4735C283470c6e46631BdB4419EDF";

export default function SendErc20Token(props: Props) {
  const {
    recipients,
    tokenAddress,
    uniqueRicepientAddresses,
    totalAmountToSend,
  } = props;
  const { contract: tokenContract, isLoading: loadingTokenContract } =
    useContract(ERC20_TEST);
  const { mutateAsync: transferBatchToken } =
    useTransferBatchToken(tokenContract);
  const { mutate: transferTokens } = useTransferToken(tokenContract);

  if (!tokenAddress || loadingTokenContract) {
    return <div className="mx-auto mt-2">Loading...</div>;
  }

  if (uniqueRicepientAddresses.length === 1) {
    return (
      <Web3Button
        contractAddress={ERC20_TEST}
        action={() =>
          transferTokens({
            to: uniqueRicepientAddresses[0], // Address to transfer to
            amount: totalAmountToSend, // Amount to transfer
          })
        }
        onSubmit={() => {
          // console.log({ result });
        }}
        onSuccess={(result) => {
          console.log({ result });
        }}
        onError={(result) => {
          console.log({ result });
        }}
      >
        Send now
      </Web3Button>
    );
  }
  return (
    <Web3Button
      contractAddress={ERC20_TEST}
      action={() => {
        transferBatchToken(recipients);
      }}
      onSubmit={() => console.log("Transaction submitted")}
      onSuccess={(result) => alert("Success!")}
      onError={() => {}}
    >
      Batch send
    </Web3Button>
  );
}
