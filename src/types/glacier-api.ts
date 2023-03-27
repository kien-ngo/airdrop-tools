import { TEvmAddress, TNumberString } from ".";

export type TSupportedCurrencyCodes = "usd" | "cad" | "eur";
export type TPriceObject = {
  value: number;
  currencyCode: TSupportedCurrencyCodes;
};

export type TNft = {
  ercType: "ERC-721" | "ERC-1155";
  chainId: TNumberString;
  address: TEvmAddress;
  name: string;
  symbol: string;
  tokenId: TNumberString;
  tokenUri: string;
  metadata?: {
    indexStatus: string;
    metadataLastUpdatedTimestamp?: number;
    name?: string;
    imageUri?: string;
  };
};
export type TListErc721 = {
  erc721TokenBalances: Array<TNft>;
  nextPageToken?: string;
};

export type TErc20 = {
  ercType: "ERC-20";
  chainId: TNumberString;
  address: TEvmAddress;
  name: string;
  symbol: string;
  decimals: number;
  balance: TNumberString;
  price?: TPriceObject;
  balanceValue?: TPriceObject;
  logoUri?: string;
};

export type TListErc20Balances = {
  erc20TokenBalances: TErc20[];
  nextPageToken?: string;
};
