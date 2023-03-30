import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { TErc20BalanceData, TEvmAddress } from "../../types";
import { TRecipient } from "./AddTokenRecipients";
import dynamic from "next/dynamic";

const SendErc20Token = dynamic(() => import("./SendErc20Token"), {
  ssr: false,
});
const SendNativeToken = dynamic(() => import("./SendNativeToken"), {
  ssr: false,
});

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

  const uniqueRecipients: TRecipient[] = recipients.reduce(
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
  return (
    <div className="flex flex-col border border-gray-400 p-2 mt-2">
      <div className="font-bold text-lg">Step 3: Send transaction</div>
      <div>
        You are sending {totalAmountToSend} ${balanceData.symbol} to{" "}
        {uniqueRecipients.length} recipient(s).
        <br />
      </div>

      <div className="mx-auto mt-4">
        {tokenAddress === NATIVE_TOKEN_ADDRESS ? (
          <SendNativeToken
            uniqueRecipients={uniqueRecipients}
            totalAmountToSend={totalAmountToSend}
          />
        ) : (
          <SendErc20Token
            recipients={uniqueRecipients}
            tokenAddress={tokenAddress}
            totalAmountToSend={totalAmountToSend}
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
