export type TEvmAddress = `0x${string & { length: 40 }}`;

export type TDisplayNftItem = {
  chainId: string;
  address: string;
  name: string;
  symbol: string;
  quantity: number;
};
