import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { TErc20BalanceData, TEvmAddress } from "../../types";
import { convertToWei } from "../../utils/number";
import SendErc20Token from "./SendErc20Token";
import SendNativeToken from "./SendNativeToken";
import { TRecipient } from "./AddTokenRecipients";
import { useAddress } from "@thirdweb-dev/react";

type Props = {
  recipients: TRecipient[];
  totalAmountToSend: number;
  balanceData: TErc20BalanceData;
  tokenAddress: TEvmAddress;
  cancelFn: Function;
};

export default function ConfirmTokenTransfer(props: Props) {
  const { recipients, totalAmountToSend, balanceData, tokenAddress, cancelFn } =
    props;
  const uniqueRicepientAddresses = [
    ...new Set(recipients.map((item) => item.to)),
  ];
  const arr: TRecipient[] = props.recipients.reduce(
    (acc: TRecipient[], current) => {
      const existingItemIndex = acc.findIndex(
        (item: TRecipient) => item.to === current.to
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
  const _recipients: TEvmAddress[] = arr.map((item) => item.to as TEvmAddress);
  const _amounts = arr.map((item) => convertToWei(item.amount));

  return (
    <div className="flex flex-col border border-gray-400 p-2 mt-2">
      <div className="font-bold text-lg">Step 3: Send transaction</div>
      <div>
        You are sending {totalAmountToSend} ${balanceData.symbol} to{" "}
        {uniqueRicepientAddresses.length} recipients.
        <br />
      </div>

      <div className="mx-auto mt-4">
        {tokenAddress === NATIVE_TOKEN_ADDRESS ? (
          <SendNativeToken
            _recipients={_recipients}
            _amounts={_amounts}
            totalAmountToSend={totalAmountToSend}
            uniqueRicepientAddresses={uniqueRicepientAddresses}
          />
        ) : (
          <SendErc20Token
            recipients={recipients}
            tokenAddress={tokenAddress}
            totalAmountToSend={totalAmountToSend}
            uniqueRicepientAddresses={uniqueRicepientAddresses}
          />
        )}
      </div>
      <div className="mx-auto mt-4">
        <button
          onClick={() => cancelFn(undefined)}
          className="border border-red-500 px-4 rounded-md hover:text-white hover:bg-red-500 duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
