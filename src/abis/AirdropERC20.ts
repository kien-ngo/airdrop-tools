export const AirdropERC20Abi = [
  {
    type: "constructor",
    name: "",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "OwnerUpdated",
    inputs: [
      {
        type: "address",
        name: "prevOwner",
        indexed: true,
        internalType: "address",
      },
      {
        type: "address",
        name: "newOwner",
        indexed: true,
        internalType: "address",
      },
    ],
    outputs: [],
    anonymous: false,
  },
  {
    type: "function",
    name: "airdrop",
    inputs: [
      {
        type: "address",
        name: "_tokenAddress",
        internalType: "address",
      },
      {
        type: "address",
        name: "_tokenOwner",
        internalType: "address",
      },
      {
        type: "address[]",
        name: "_recipients",
        internalType: "address[]",
      },
      {
        type: "uint256[]",
        name: "_amounts",
        internalType: "uint256[]",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "contractType",
    inputs: [],
    outputs: [
      {
        type: "bytes32",
        name: "",
        internalType: "bytes32",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "contractVersion",
    inputs: [],
    outputs: [
      {
        type: "uint8",
        name: "",
        internalType: "uint8",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        type: "address",
        name: "_defaultAdmin",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "multicall",
    inputs: [
      {
        type: "bytes[]",
        name: "data",
        internalType: "bytes[]",
      },
    ],
    outputs: [
      {
        type: "bytes[]",
        name: "results",
        internalType: "bytes[]",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [
      {
        type: "address",
        name: "",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setOwner",
    inputs: [
      {
        type: "address",
        name: "_newOwner",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
];
