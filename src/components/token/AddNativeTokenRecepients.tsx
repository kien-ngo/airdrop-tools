import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { isAddress } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { TErc20BalanceData, TEvmAddress } from "../../types";
import GreenCheckMark from "../icons/GreenCheckmark";
import ConfirmErc20Transfer from "./ConfirmNativeTokenTransfer";

type TAddErc20RecepientsProps = {
  callerAddress: TEvmAddress;
  balanceData: TErc20BalanceData;
};
export type TErc20Recepient = {
  address: string;
  amount: number;
};

type TError = {
  valid: boolean;
  message?: string;
};

export default function AddErc20Recepients(props: TAddErc20RecepientsProps) {
  const { callerAddress, balanceData } = props;
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [showNextStep, setShowNextStep] = useState<boolean>(false);
  const [recepients, setRecepients] = useState<TErc20Recepient[]>([
    { address: "0x89f84d4e4ecaba42233eefc46ee49a03db943bad", amount: 0 },
    { address: "0xd587924ce50c703182409d7d45eb79a9fbe6b49d", amount: 1 },
  ]);
  const totalAmountToSend: number = recepients
    .map((item) => (item.amount < 0 ? 0 : item.amount))
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });
  const availableBalance = balanceData?.displayValue
    ? parseFloat(balanceData.displayValue) - totalAmountToSend
    : "_N/A_";
  const updateTokenAmount = (index: number, amount: number) => {
    recepients[index].amount = amount ? amount : 0;
    setRecepients([...recepients]);
  };
  const updateRecepientAddress = (index: number, address: string) => {
    recepients[index].address = address;
    setRecepients([...recepients]);
  };
  const amountToSendToLarge = totalAmountToSend >= availableBalance;
  const addMoreRecepients = () => {
    recepients.push({ address: "", amount: 0 });
    setRecepients([...recepients]);
  };
  const deleteRecepient = (index: number) => {
    recepients.splice(index, 1);
    setRecepients([...recepients]);
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
    if (value === NATIVE_TOKEN_ADDRESS) {
      return {
        valid: false,
        message: "This is the token address",
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
  const submitRecepients = () => {
    setShowNextStep(true);
  };
  useEffect(() => {
    if (recepients.length === 0) {
      setCanSubmit(false);
    }
    if (
      recepients.some(
        (item) =>
          !validateInputAddress(item.address).valid ||
          !validateTokenAmount(item.amount).valid
      )
    ) {
      setCanSubmit(false);
      return;
    }
    setCanSubmit(true);
  }, [recepients]);
  if (!balanceData) return <div>Oops, something went wrong..</div>;
  return (
    <>
      <div className="flex flex-col border border-gray-400 p-2 mt-2">
        <div className="font-bold text-lg">Step 2: Add recepients</div>
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
            {recepients.map((item, index) => {
              const addressErrorMsg = validateInputAddress(
                item.address
              ).message;
              const amountErrorMsg = validateTokenAmount(item.amount).message;
              return (
                <div className="flex flex-row justify-center mt-2" key={index}>
                  <div className="flex flex-col min-w-[300px]">
                    <input
                      disabled={showNextStep}
                      defaultValue={item.address}
                      type="text"
                      placeholder="Wallet address"
                      className={`disabled:cursor-not-allowed w-full pl-1 py-1 max-w-[350px] text-xs h-[32px] ${
                        addressErrorMsg ? "border border-red-500" : ""
                      }`}
                      onChange={(e) =>
                        updateRecepientAddress(index, e.target.value)
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
                      onClick={() => deleteRecepient(index)}
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
              onClick={addMoreRecepients}
              className="mt-4 rounded-lg border border-white w-fit px-5 mx-auto enabled:hover:text-black enabled:hover:bg-white duration-200 disabled:cursor-not-allowed disabled:text-gray-400"
            >
              Add more +
            </button>
            {/* <div className="mx-auto mt-3">
          <ArrowDownIcon />
        </div> */}
            <button
              disabled={!canSubmit || showNextStep}
              onClick={submitRecepients}
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
        <ConfirmErc20Transfer
          callerAddress={callerAddress}
          balanceData={balanceData}
          recepients={recepients}
          totalAmountToSend={totalAmountToSend}
        />
      )}
    </>
  );
}
