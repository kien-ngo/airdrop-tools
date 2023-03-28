import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { TEvmAddress } from "../../types";
import AddTokenRecipients from "./AddTokenRecipients";
import { ERC20_TEST } from "./SendErc20Token";

export default function Erc20RecipientsWrapper({
  tokenAddress,
  cancelFn,
}: {
  tokenAddress: TEvmAddress;
  cancelFn: Function;
}) {
  const address = useAddress();
  const { contract } = useContract(ERC20_TEST, "token");
  const {
    data: balanceData,
    isLoading,
    error,
  } = useTokenBalance(contract, address);
  if (isLoading || !balanceData)
    return <div className="mx-auto">Loading...</div>;
  return (
    <AddTokenRecipients
      balanceData={balanceData}
      tokenAddress={tokenAddress}
      cancelFn={cancelFn}
    />
  );
}
