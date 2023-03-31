import { isAddress } from "ethers/lib/utils";
import { TNftRecipient } from "../components/nft/AddNftRecipients";
import { TRecipient } from "../components/token/AddTokenRecipients";
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

export const createDownloadLink = (
  id: string,
  href: string,
  fileName: string
) => {
  const dlAnchorElem = document.getElementById(id) as HTMLAnchorElement;
  if (!dlAnchorElem) return alert("Error: could not create download link");
  dlAnchorElem.setAttribute("href", href);
  dlAnchorElem.setAttribute("download", fileName);
  dlAnchorElem.click();
};

export const getJsonDataString = (data: any[]) => {
  const dataStr =
    "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
  return dataStr;
};

export const getCsvDataString = (data: any[]) => {
  const attrName = Object.hasOwn(data[0], "amount") ? "amount" : "tokenId";
  let dataStr = "data:text/csv;charset=utf-8," + `address,${attrName}\r\n`;
  data.forEach(function (item) {
    const row = `${item.to},${item[attrName]}`;
    dataStr += row + "\r\n";
  });
  return dataStr;
};

export const closePopup = (htmlFor: string) => {
  if (!htmlFor) return alert("Error: missing popup id");
  const _switch = document.getElementById(htmlFor) as HTMLInputElement;
  if (!_switch) return alert("Could not find popup id: " + htmlFor);
  _switch.checked = false;
};
