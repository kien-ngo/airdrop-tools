export type TNft = {
  ercType: "ERC-721" | "ERC-1155";
  chainId: string;
  address: string;
  name: string;
  symbol: string;
  tokenId: string;
  tokenUri: string;
  metadata: {
    indexStatus: string;
    metadataLastUpdatedTimestamp?: number;
    name?: string;
    imageUri?: string;
  };
};
export type TListErc721 = {
  erc721TokenBalances: Array<TNft>;
};
