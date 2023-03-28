import { TNumberString } from "../types";

export function convertToWei(num: number): string {
  const wei = BigInt(10) ** BigInt(18); // 1 wei = 10^18
  const weiAmount = BigInt(num) * wei;
  return weiAmount.toString();
}

export const convertBigNumToFloat = (
  value: TNumberString,
  decimals: number
): number => {
  const res = parseFloat(value) / Math.pow(10, decimals);
  return res;
};

export const convertHexToFloat = (hex: string, decimals: number): number => {
  const wei = BigInt(hex);
  const ether = Number(wei / BigInt(10 ** decimals));
  return ether;
};
