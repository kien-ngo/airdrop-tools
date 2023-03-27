export type TNumberString = `${number}`;
export type TUrlString = `https://${string}.${string}` | `ipfs://${string}`;
export type TEvmAddress = `0x${string & { length: 40 }}`;

export type TDisplayNftItem = {
  chainId: string;
  address: string;
  name: string;
  symbol: string;
  quantity: number;
};

export type TErc20BalanceData = {
  symbol: string;
  value: import("ethers").BigNumber;
  name: string;
  decimals: number;
  displayValue: string;
};
