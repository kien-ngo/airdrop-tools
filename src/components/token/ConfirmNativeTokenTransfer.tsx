import { TErc20BalanceData, TEvmAddress } from "../../types";
import { TErc20Recepient } from "./AddNativeTokenRecepients";
import SendNativeTokenToMultipleAddresses from "./SendNativeTokenToMultipleAddresses";

type TConfirmErc20TransferProps = {
  callerAddress: TEvmAddress;
  recepients: TErc20Recepient[];
  totalAmountToSend: number;
  balanceData: TErc20BalanceData;
};

/**
 * Note: If there's only one recepient, we do not need to call the contract.
 */
export default function ConfirmErc20Transfer(
  props: TConfirmErc20TransferProps
) {
  const { recepients, totalAmountToSend, balanceData, callerAddress } = props;

  const uniqueRecepientAddresses = [
    ...new Set(recepients.map((item) => item.address)),
  ];
  return (
    <div className="flex flex-col border border-gray-400 p-2 mt-2">
      <div className="font-bold text-lg">Step 3: Send transaction</div>
      <div>
        You are sending {totalAmountToSend} ${balanceData.symbol} to{" "}
        {uniqueRecepientAddresses.length === 1
          ? "only 1"
          : uniqueRecepientAddresses.length}{" "}
        recepients.
        <br />
        {uniqueRecepientAddresses.length === 1 && (
          <span className="text-sm text-warning">
            It might be cheaper to just do it from your wallet instead of
            calling the transfer contract
          </span>
        )}
      </div>

      <div className="mx-auto mt-4">
        <SendNativeTokenToMultipleAddresses
          callerAddress={callerAddress}
          recepients={recepients}
        />
      </div>
      <div className="mx-auto mt-4">
        <button className="border border-red-500 px-4 rounded-md hover:text-white hover:bg-red-500 duration-200">Cancel</button>
      </div>
    </div>
  );
}
