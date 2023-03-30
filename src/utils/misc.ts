import { isAddress } from "ethers/lib/utils";
import { TValidateError } from "../types";

export const copyTextToClipboard = async (
  str: string,
  msg: string = "Copied."
) => {
  await navigator.clipboard.writeText(str);
  alert(msg);
};

export const validateInputAddress = (
  value: string,
  contractAddresses: string[],
  address?: string
): TValidateError => {
  if (!value) {
    return {
      valid: false,
      message: "Address is empty",
    };
  }
  if (value === address) {
    return {
      valid: false,
      message: "This is your own address",
    };
  }
  if (contractAddresses.includes(value)) {
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
