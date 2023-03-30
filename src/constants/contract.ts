import { ChainId } from "@thirdweb-dev/sdk";
import { TEvmAddress } from "../types";

export const SUPPORTED_CHAINS = [
  ChainId.Avalanche,
  ChainId.AvalancheFujiTestnet,
  ChainId.BinanceSmartChainMainnet,
  ChainId.Polygon,
] as const;

export type TContract = {
  chainId: typeof SUPPORTED_CHAINS[number];
  chainName: string;
  contract: TEvmAddress;
};

export const TRANSFER_TOKEN_CONTRACTS: TContract[] = [
  {
    chainId: ChainId.Avalanche,
    chainName: "Avalanche C-chain",
    contract: "0x07d8A4Ba93896167502C5674B9c08Da2c26da917",
  },
  {
    chainId: ChainId.AvalancheFujiTestnet,
    chainName: "Avalanche Fuji Testnet",
    contract: "0xa56266B854287e15612b2A7d6077f4CECdF508D8",
  },
  {
    chainId: ChainId.BinanceSmartChainMainnet,
    chainName: "Binance Smart Chain",
    contract: "0xa7D59243e2Bc3d4d29D945a36c5B0FBC4A19946e",
  },
  {
    chainId: ChainId.Polygon,
    chainName: "Polygon",
    contract: "0x0a3446fAA3762e3bE921332EC36F9337AB6615cF",
  },
];

export const TRANSFER_ERC721_CONTRACTS: TContract[] = [
  {
    chainId: ChainId.Avalanche,
    chainName: "Avalanche C-chain",
    contract: "0xB0Fd0fA089BDded3097247226DBce66ffd9C1153",
  },
  {
    chainId: ChainId.AvalancheFujiTestnet,
    chainName: "Avalanche Fuji Testnet",
    contract: "0xC5CC7F3099b85aC7B22E2f5ff57D0d3E119B5b01",
  },
  {
    chainId: ChainId.BinanceSmartChainMainnet,
    chainName: "Binance Smart Chain",
    contract: "0xD0Ecec178D31398628bB576B8D36b6c8581aCC6a",
  },
  {
    chainId: ChainId.Polygon,
    chainName: "Polygon",
    contract: "0xDd4e6327d3BD395DFEc0eC89055d8E9f16a60B27",
  },
];

export const TRANSFER_ERC1155_CONTRACTS: TContract[] = [
  {
    chainId: ChainId.Avalanche,
    chainName: "Avalanche C-chain",
    contract: "0xb7D1c60B3b5C47155859Af960C4505578e3E1d98",
  },
  {
    chainId: ChainId.AvalancheFujiTestnet,
    chainName: "Avalanche Fuji Testnet",
    contract: "0xb5cD98fC623571fd3DC8402F100f1fEE64BEa727",
  },
  {
    chainId: ChainId.BinanceSmartChainMainnet,
    chainName: "Binance Smart Chain",
    contract: "0xa7D59243e2Bc3d4d29D945a36c5B0FBC4A19946e",
  },
  {
    chainId: ChainId.Polygon,
    chainName: "Polygon",
    contract: "0x6EEb92A51537E155413Ad1f6cF3d684bD5cb6486",
  },
];
