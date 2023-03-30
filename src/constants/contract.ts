import { ChainId } from "@thirdweb-dev/sdk";
import { TEvmAddress } from "../types";

export type TContract = {
  chainId: typeof ChainId[keyof typeof ChainId];
  contract: TEvmAddress;
};

export const TRANSFER_TOKEN_CONTRACTS: TContract[] = [
  {
    chainId: ChainId.Avalanche,
    contract: "0xa56266B854287e15612b2A7d6077f4CECdF508D8",
  },
  {
    chainId: ChainId.AvalancheFujiTestnet,
    contract: "0xa56266B854287e15612b2A7d6077f4CECdF508D8",
  },
];
