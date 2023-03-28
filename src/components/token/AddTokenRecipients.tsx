import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { isAddress } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { TErc20BalanceData, TEvmAddress } from "../../types";
import GreenCheckMark from "../icons/GreenCheckmark";
import ConfirmTokenTransfer from "./ConfirmTokenTransfer";

type Props = {
  callerAddress: TEvmAddress;
  balanceData: TErc20BalanceData;
  tokenAddress: TEvmAddress;
};
export type TRecipient = {
  to: string;
  amount: number;
};

type TError = {
  valid: boolean;
  message?: string;
};

export default function AddTokenRecipients(props: Props) {
  const { callerAddress, balanceData, tokenAddress } = props;
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [showNextStep, setShowNextStep] = useState<boolean>(false);
  const [recipients, setRecipients] = useState<TRecipient[]>([
    { to: "0xd587924ce50c703182409d7d45eb79a9fbe6b49d", amount: 1 },
  ]);
  const totalAmountToSend: number = recipients.length
    ? recipients
        .map((item) => (item.amount < 0 ? 0 : item.amount))
        .reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        })
    : 0;
  const availableBalance = balanceData?.displayValue
    ? parseFloat(balanceData.displayValue) - totalAmountToSend
    : "_N/A_";
  const updateTokenAmount = (index: number, amount: number) => {
    recipients[index].amount = amount ? amount : 0;
    setRecipients([...recipients]);
  };
  const updateRecipientAddress = (index: number, address: string) => {
    recipients[index].to = address;
    setRecipients([...recipients]);
  };
  const amountToSendToLarge = totalAmountToSend >= availableBalance;
  const addMoreRecipients = () => {
    recipients.push({ to: "", amount: 0 });
    setRecipients([...recipients]);
  };
  const deleteRecipient = (index: number) => {
    recipients.splice(index, 1);
    setRecipients([...recipients]);
  };
  const validateInputAddress = (value: string): TError => {
    if (!value) {
      return {
        valid: false,
        message: "Address is empty",
      };
    }
    if (value === callerAddress) {
      return {
        valid: false,
        message: "This is your own address",
      };
    }
    if ([tokenAddress, NATIVE_TOKEN_ADDRESS].includes(value)) {
      return {
        valid: false,
        message: "This is a contract address",
      };
    }
    if (!isAddress(value))
      return {
        valid: false,
        message: "Address is invalid",
      };
    return {
      valid: true,
    };
  };
  const validateTokenAmount = (value: number): TError => {
    if (value <= 0) return { valid: false, message: "Amount must be > 0" };
    if (value > availableBalance)
      return { valid: false, message: "Amount exceeds available balance" };
    return { valid: true };
  };
  const submitRecipients = () => {
    setShowNextStep(true);
  };
  useEffect(() => {
    if (recipients.length === 0) {
      setCanSubmit(false);
    }
    if (
      recipients.some(
        (item) =>
          !validateInputAddress(item.to).valid ||
          !validateTokenAmount(item.amount).valid
      )
    ) {
      setCanSubmit(false);
      return;
    }
    setCanSubmit(true);
  }, [recipients]);
  if (!balanceData) return <div>Oops, something went wrong..</div>;
  return (
    <>
      <div className="flex flex-col border border-gray-400 p-2 mt-2">
        <div className="font-bold text-lg">Step 2: Add recipients</div>
        <div className="flex flex-col">
          <div className="mt-2">
            You are sending ${balanceData.symbol} - {balanceData.name}
            <br />
            Available balance:{" "}
            <span
              className={`font-bold ${
                availableBalance < 0 ? "text-red-500" : ""
              }`}
            >
              {availableBalance}
            </span>
          </div>
          {amountToSendToLarge && (
            <div className="text-red-500 text-xm">
              Warning: Amount to send exceeded available balance. You also might
              not have enough for gas fee
            </div>
          )}
          <div className="flex flex-col mt-2">
            {recipients.map((item, index) => {
              const addressErrorMsg = validateInputAddress(item.to).message;
              const amountErrorMsg = validateTokenAmount(item.amount).message;
              return (
                <div className="flex flex-row justify-center mt-2" key={index}>
                  <div className="flex flex-col min-w-[300px]">
                    <input
                      disabled={showNextStep}
                      defaultValue={item.to}
                      type="text"
                      placeholder="Wallet address"
                      className={`disabled:cursor-not-allowed w-full pl-1 py-1 max-w-[350px] text-xs h-[32px] ${
                        addressErrorMsg ? "border border-red-500" : ""
                      }`}
                      onChange={(e) =>
                        updateRecipientAddress(index, e.target.value)
                      }
                    />
                    {(addressErrorMsg || amountErrorMsg) && (
                      <div className="text-red-500">
                        {addressErrorMsg ? addressErrorMsg : amountErrorMsg}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <input
                      disabled={showNextStep}
                      defaultValue={item.amount}
                      type="number"
                      min={0}
                      max={availableBalance}
                      placeholder="Amount"
                      className={`disabled:cursor-not-allowed max-w-[100px] ml-1 pl-1 py-1 text-center ${
                        amountErrorMsg ? "border border-red-500" : ""
                      }`}
                      onChange={(e) =>
                        updateTokenAmount(index, parseFloat(e.target.value))
                      }
                    />
                    <button
                      disabled={showNextStep}
                      onClick={() => deleteRecipient(index)}
                      className="enabled:hover:underline enabled:hover:text-red-500 disabled:cursor-not-allowed"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
            <button
              disabled={showNextStep}
              onClick={addMoreRecipients}
              className="mt-4 rounded-lg border border-white w-fit px-5 mx-auto enabled:hover:text-black enabled:hover:bg-white duration-200 disabled:cursor-not-allowed disabled:text-gray-400"
            >
              Add more +
            </button>
            <button
              disabled={!canSubmit || showNextStep}
              onClick={submitRecipients}
              className="mt-4 rounded-lg border border-success w-fit px-5 mx-auto enabled:hover:text-black enabled:hover:bg-success duration-200 disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400"
            >
              Next
            </button>
          </div>
        </div>
        {showNextStep && (
          <div className="ml-auto">
            <GreenCheckMark />
          </div>
        )}
      </div>

      {/* Next step */}
      {showNextStep && (
        <ConfirmTokenTransfer
          callerAddress={callerAddress as TEvmAddress}
          tokenAddress={tokenAddress}
          totalAmountToSend={totalAmountToSend}
          balanceData={balanceData}
          recipients={recipients}
        />
      )}
    </>
  );
}
