import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { TEvmAddress } from "../../types";
import LoadingSpinner from "../shared/LoadingSpinner";
import AddTokenRecipients from "./AddTokenRecipients";

export default function Erc20RecipientsWrapper({
  tokenAddress,
  cancelFn,
}: {
  tokenAddress: TEvmAddress;
  cancelFn: Function;
}) {
  const address = useAddress();
  const { contract } = useContract(tokenAddress, "token");
  const {
    data: balanceData,
    isLoading,
    error,
  } = useTokenBalance(contract, address);
  if (isLoading || !balanceData)
    return (
      <div className="mx-auto mt-4">
        <LoadingSpinner />
      </div>
    );
  return (
    <AddTokenRecipients
      balanceData={balanceData}
      tokenAddress={tokenAddress}
      cancelFn={cancelFn}
    />
  );
}
