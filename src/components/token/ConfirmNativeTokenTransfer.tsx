import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { TErc20BalanceData, TEvmAddress } from "../../types";
import { TErc20Recepient } from "./AddNativeTokenRecepients";
import SendNativeTokenToMultipleAddresses from "./SendNativeTokenToMultipleAddresses";
import SendToSingleAddress from "./SendNativeToSingleAddress";

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
        {uniqueRecepientAddresses.length} recepients
      </div>
      {uniqueRecepientAddresses.length === 1 ? (
        <div className="mx-auto mt-4">
          <SendToSingleAddress
            recepientAddress={recepients[0].address as TEvmAddress}
            amount={totalAmountToSend}
          />
        </div>
      ) : (
        <div className="mx-auto mt-4">
          <SendNativeTokenToMultipleAddresses
            callerAddress={callerAddress}
            recepients={recepients}
          />
        </div>
      )}
    </div>
  );
}
