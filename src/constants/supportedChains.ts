export const GLACIER_SUPPORTED_CHAINS = [
  {
    chainId: "43114",
    chainName: "Avalanche (C-Chain)",
    description:
      "The Contract Chain (C-Chain) runs on an Ethereum Virtual Machine and is used to deploy smart contracts and connect to dapps.",
    platformChainId: "2q9e4r6Mu3U68nU1fYjgbR6JvwrRx36CohpAX5UQxse55x1Q5",
    subnetId: "11111111111111111111111111111111LpoYY",
    vmId: "mgj786NP7uDwBCcq6YwThhaN8FLyybkCa4zBWTQbNgmK6k9A6",
    vmName: "EVM",
    explorerUrl: "https://snowtrace.io",
    rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
    wsUrl: "wss://api.avax.network/ext/bc/C/ws",
    isTestnet: false,
    utilityAddresses: {
      multicall: "0xed386Fe855C1EFf2f843B910923Dd8846E45C5A4",
    },
    networkToken: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
      description: "",
      logoUri:
        "https://glacier-api.avax.network/proxy/chain-assets/cb14a1f/chains/43114/token-logo.png",
    },
    chainLogoUri:
      "https://glacier-api.avax.network/proxy/chain-assets/cb14a1f/chains/43114/chain-logo.png",
  },
  {
    chainId: "43113",
    chainName: "Avalanche (C-Chain)",
    description: "The Contract Chain on Avalanche's test subnet.",
    platformChainId: "yH8D7ThNJkxmtkuv2jgBa4P1Rn3Qpr4pPr7QYNfcdoS6k6HWp",
    subnetId: "11111111111111111111111111111111LpoYY",
    vmId: "mgj786NP7uDwBCcq6YwThhaN8FLyybkCa4zBWTQbNgmK6k9A6",
    vmName: "EVM",
    explorerUrl: "https://testnet.snowtrace.io",
    rpcUrl: "https://api.avax-test.network/ext/bc/C/rpc",
    wsUrl: "wss://api.avax-test.network/ext/bc/C/ws",
    isTestnet: true,
    utilityAddresses: {
      multicall: "0xE898101ffEF388A8DA16205249a7E4977d4F034c",
    },
    networkToken: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
      description: "",
      logoUri:
        "https://glacier-api.avax.network/proxy/chain-assets/3e1b653/chains/43113/token-logo.png",
    },
    chainLogoUri:
      "https://glacier-api.avax.network/proxy/chain-assets/3e1b653/chains/43113/chain-logo.png",
  },
  {
    chainId: "1",
    chainName: "Ethereum",
    description: "The primary public Ethereum blockchain network.",
    vmName: "EVM",
    explorerUrl: "https://etherscan.io",
    rpcUrl: "https://proxy-api.avax.network/proxy/infura/mainnet",
    isTestnet: false,
    utilityAddresses: {
      multicall: "0x5ba1e12693dc8f9c48aad8770482f4739beed696",
    },
    networkToken: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
      description: "",
      logoUri:
        "https://glacier-api.avax.network/proxy/chain-assets/de66c50/non-subnet-chains/1/token-logo.png",
    },
    chainLogoUri:
      "https://glacier-api.avax.network/proxy/chain-assets/de66c50/non-subnet-chains/1/chain-logo.png",
  },
  {
    chainId: "53935",
    chainName: "DFK Subnet",
    description:
      "The vision for the DFK Subnet is to become the go-to location for community members and projects to launch GameFi and other blockchain gaming experiences in conjunction with the primary offering of DeFi Kingdoms: Crystalvale.",
    platformChainId: "q2aTwKuyzgs8pynF7UXBZCU7DejbZbZ6EUyHr3JQzYgwNPUPi",
    subnetId: "Vn3aX6hNRstj5VHHm63TCgPNaeGnRSqCYXQqemSqDd2TQH4qJ",
    vmId: "mDV3QWRXfwgKUWb9sggkv4vQxAQR4y2CyKrt5pLZ5SzQ7EHBv",
    vmName: "EVM",
    explorerUrl: "https://subnets.avax.network/defi-kingdoms",
    rpcUrl: "https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc",
    wsUrl: "wss://subnets.avax.network/defi-kingdoms/dfk-chain/ws",
    isTestnet: false,
    utilityAddresses: {
      multicall: "0x5b24224dC16508DAD755756639E420817DD4c99E",
    },
    networkToken: {
      name: "JEWEL",
      symbol: "JEWEL",
      description:
        "JEWEL is the central token on the DFK Subnet and used to pay gas for all transactions. While it is not natively minted on the DFK Subnet, it is integral to the subnet's function.",
      decimals: 18,
      logoUri:
        "https://glacier-api.avax.network/proxy/chain-assets/a0a2d1a/chains/53935/token-logo.png",
    },
    chainLogoUri:
      "https://glacier-api.avax.network/proxy/chain-assets/a0a2d1a/chains/53935/chain-logo.png",
  },
  {
    chainId: "335",
    chainName: "DFK Subnet",
    description:
      "The vision for the DFK Subnet is to become the go-to location for community members and projects to launch GameFi and other blockchain gaming experiences in conjunction with the primary offering of DeFi Kingdoms: Crystalvale.",
    platformChainId: "32sexHqc3tBQsik8h7WP5F2ruL5svqhX5opeTgXCRVX8HpbKF",
    subnetId: "XHLRR9cvMtCR8KZsjU8nLxg1JbV7aS23AcLVeBMVHLKkSBriS",
    vmId: "mDV3QWRXfwgKUWb9sggkv4vQxAQR4y2CyKrt5pLZ5SzQ7EHBv",
    vmName: "EVM",
    explorerUrl: "https://subnets-test.avax.network/defi-kingdoms",
    rpcUrl: "https://subnets.avax.network/defi-kingdoms/dfk-chain-testnet/rpc",
    wsUrl: "wss://subnets.avax.network/defi-kingdoms/dfk-chain-testnet/ws",
    isTestnet: true,
    utilityAddresses: {
      multicall: "0x7D5746CcBD080a512Af2e8b1eFEFD61fBD29023D",
    },
    networkToken: {
      name: "JEWEL",
      symbol: "JEWEL",
      description:
        "JEWEL is the central token on the DFK Subnet and used to pay gas for all transactions. While it is not natively minted on the DFK Subnet, it is integral to the subnet's function.",
      decimals: 18,
      logoUri:
        "https://glacier-api.avax.network/proxy/chain-assets/a0a2d1a/chains/335/token-logo.png",
    },
    chainLogoUri:
      "https://glacier-api.avax.network/proxy/chain-assets/a0a2d1a/chains/335/chain-logo.png",
  },
  {
    chainId: "73772",
    chainName: "Swimmer Network Subnet",
    description:
      "Swimmer Network Subnet is a custom blockchain built on an Avalanche Subnet, and is home to Crabada, an undersea world filled with fierce fighting Hermit-Crabs called Crabada. The Crabada Idle-Game and marketplace is expected migrate from the C-chain onto the Swimmer Network. Crabada can be bred, and used in games to earn cryptocurrencies with real value.",
    platformChainId: "2K33xS9AyP9oCDiHYKVrHe7F54h2La5D8erpTChaAhdzeSu2RX",
    subnetId: "2e3CqLY8thW1WKS89WQ7WR9Qy2bCrrP5mv7psqMRGCHGXuQ1Uj",
    vmId: "srSGD5JeYhL8GLx4RUw53VN5TcoBbax6EeCYmy5S3DiteJhdF",
    vmName: "EVM",
    explorerUrl: "https://subnets.avax.network/swimmer",
    rpcUrl: "https://subnets.avax.network/swimmer/mainnet/rpc",
    wsUrl: "wss://subnets.avax.network/swimmer/mainnet/ws",
    isTestnet: false,
    utilityAddresses: {
      multicall: "0xd46175048c125eae5a7694BDa6C723b76D24e428",
    },
    networkToken: {
      name: "Treasure Under Sea",
      symbol: "TUS",
      description:
        "TUS is the gas token on the Swimmer Chain and used to pay gas for all transactions.",
      decimals: 18,
      logoUri:
        "https://glacier-api.avax.network/proxy/chain-assets/3e1b653/chains/73772/token-logo.png",
    },
    chainLogoUri:
      "https://glacier-api.avax.network/proxy/chain-assets/3e1b653/chains/73772/chain-logo.png",
  },
  {
    chainId: "73773",
    chainName: "Swimmer Network Subnet",
    description:
      "Swimmer Network Subnet is home to Crabada, an undersea world filled with fierce fighting Hermit-Crabs called Crabada. The Crabada Idle-Game and marketplace is expected migrate from the C-chain onto the Swimmer Network. Crabada can be bred, and used in games to earn cryptocurrencies with real value.",
    platformChainId: "qVd94hjZUfN5h5ZPxozos1wHjaszipeGJoYYxxMJ3dqZYFjZ3",
    subnetId: "2WJTQKACZWKAnkakMCafag2nuef6v6UuTFRxH1ndGXKWFg9pPJ",
    vmId: "srSGD5JeYhL8GLx4RUw53VN5TcoBbax6EeCYmy5S3DiteJhdF",
    vmName: "EVM",
    explorerUrl: "https://subnets-test.avax.network/swimmer",
    rpcUrl: "https://subnets.avax.network/swimmer/testnet/rpc",
    wsUrl: "wss://subnets.avax.network/swimmer/testnet/ws",
    isTestnet: true,
    utilityAddresses: {
      multicall: "0x3e088976A6d37a559D2433F2cF1171a2397462a4",
    },
    networkToken: {
      name: "Treasure Under Sea",
      symbol: "TUS",
      description:
        "TUS is the gas token on the Swimmer Chain and used to pay gas for all transactions.",
      decimals: 18,
      logoUri:
        "https://glacier-api.avax.network/proxy/chain-assets/cb14a1f/chains/73773/token-logo.png",
    },
    chainLogoUri:
      "https://glacier-api.avax.network/proxy/chain-assets/cb14a1f/chains/73773/chain-logo.png",
  },
  {
    chainId: "432204",
    chainName: "Dexalot Subnet",
    description:
      "The Dexalot Exchange EVM subnet is a revolutionary decentralized exchange aiming at bringing the traditional centralized exchange look and feel, through a decentralized on-chain application. Dexalot users can trade crypto securely and efficiently, with no slippage or custody risk. It is built on Avalanche Subnet technology, the most effective scaling solution in the blockchain industry.",
    platformChainId: "21Ths5Afqi5r4PaoV8r8cruGZWhN11y5rxvy89K8px7pKy3P8E",
    subnetId: "wenKDikJWAYQs3f2v9JhV86fC6kHZwkFZsuUBftnmgZ4QXPnu",
    vmId: "mDVSxzeWHmgqrcXK1tPYqavqTK5MC3mMqme6r3a6cz2fqMfqf",
    vmName: "EVM",
    explorerUrl: "https://subnets.avax.network/dexalot",
    rpcUrl: "https://subnets.avax.network/dexalot/mainnet/rpc",
    wsUrl: "wss://subnets.avax.network/dexalot/mainnet/ws",
    isTestnet: false,
    utilityAddresses: {
      multicall: "0x8B32CF176c409d7d40838295fb225c22d3937032",
    },
    networkToken: {
      name: "Dexalot",
      symbol: "ALOT",
      decimals: 18,
      description: "",
      logoUri:
        "https://glacier-api.avax.network/proxy/chain-assets/a0a2d1a/chains/432204/token-logo.png",
    },
    chainLogoUri:
      "https://glacier-api.avax.network/proxy/chain-assets/a0a2d1a/chains/432204/chain-logo.png",
  },
  {
    chainId: "432201",
    chainName: "Dexalot Subnet",
    description:
      "The Dexalot Exchange EVM subnet is a revolutionary decentralized exchange aiming at bringing the traditional centralized exchange look and feel, through a decentralized on-chain application. Dexalot users can trade crypto securely and efficiently, with no slippage or custody risk. It is built on Avalanche Subnet technology, the most effective scaling solution in the blockchain industry.",
    platformChainId: "XuEPnCE59rtutASDPCDeYw8geQaGWwteWjkDXYLWvssfuirde",
    subnetId: "9m6a3Qte8FaRbLZixLhh8Ptdkemm4csNaLwQeKkENx5wskbWP",
    vmId: "mDVSxzeWHpEU3eSqMwwGQsD787xGp7hv9Qgoe3R9SdjPapte8",
    vmName: "EVM",
    explorerUrl: "https://subnets-test.avax.network/dexalot",
    rpcUrl: "https://subnets.avax.network/dexalot/testnet/rpc",
    wsUrl: "wss://subnets.avax.network/dexalot/testnet/ws",
    isTestnet: true,
    utilityAddresses: {
      multicall: "0xe07e60594653D03165402D3B491d30Fe2d2C0A6A",
    },
    networkToken: {
      name: "Dexalot",
      symbol: "ALOT",
      decimals: 18,
      description: "",
      logoUri:
        "https://glacier-api.avax.network/proxy/chain-assets/a0a2d1a/chains/432201/token-logo.png",
    },
    chainLogoUri:
      "https://glacier-api.avax.network/proxy/chain-assets/a0a2d1a/chains/432201/chain-logo.png",
  },
  {
    chainId: "262018",
    chainName: "Loco Legends Subnet",
    description:
      "Loco Legends is India's first NFT marketplace for eSports that will mint streamer collectibles with online and offline perks.",
    platformChainId: "remqeL56TsyKjVLdNx7waAwMv9R63uJ9ePR7cBvxzTDmMcHAp",
    subnetId: "KfZ2YSPbKDGqJW2yiiYFYLwAu39MAt8JKQKyRzcurrKAJfff9",
    vmId: "afS5LWuouQCb8yhR1ZhymdB9tKik4eYyGdDGk98A8weDcQW9b",
    vmName: "EVM",
    explorerUrl: "https://subnets-test.avax.network/loco-legends",
    rpcUrl: "https://subnets.avax.network/loco-legends/mainnet/rpc",
    wsUrl: "wss://subnets.avax.network/loco-legends/mainnet/ws",
    isTestnet: false,
    utilityAddresses: {
      multicall: "0xda8D9ec7b9511ecF47C5AEc81Ca509B61B8505C2",
    },
    networkToken: {
      name: "GG",
      symbol: "GG",
      decimals: 18,
      description:
        "GG is the central token on the Loco Legends Subnet and used to pay gas for all transactions.",
      logoUri:
        "https://glacier-api.avax.network/proxy/chain-assets/9c6df66/chains/262018/token-logo.png",
    },
    chainLogoUri:
      "https://glacier-api.avax.network/proxy/chain-assets/9c6df66/chains/262018/chain-logo.png",
  },
  {
    chainId: "1995",
    chainName: "Loco Legends Subnet",
    description:
      "Loco Legends is India's first NFT marketplace for eSports that will mint streamer collectibles with online and offline perks.",
    platformChainId: "2tLmRnkJAwRYRi923XPVMfFNA96dk88Vh5GSMVKZaN8os6GveR",
    subnetId: "ggCWzZJEmdGy8vsPctdwZNoSRG3rvbHrLQNgUWzNEiy1Cesow",
    vmId: "afS5LZswxdcVsuz1RmZkf6eX9xRJuAJYu6NjK6du9WRWe21ZJ",
    vmName: "EVM",
    explorerUrl: "https://subnets-test.avax.network/loco-legends",
    rpcUrl: "https://subnets.avax.network/loco-legends/testnet/rpc",
    wsUrl: "wss://subnets.avax.network/loco-legends/testnet/ws",
    isTestnet: true,
    utilityAddresses: {
      multicall: "0x5f3661B9606793b8BD0B8b822ef5075CEDD55C78",
    },
    networkToken: {
      name: "GG",
      symbol: "GG",
      decimals: 18,
      description:
        "GG is the central token on the Loco Legends Subnet and used to pay gas for all transactions.",
      logoUri:
        "https://glacier-api.avax.network/proxy/chain-assets/9c6df66/chains/1995/token-logo.png",
    },
    chainLogoUri:
      "https://glacier-api.avax.network/proxy/chain-assets/9c6df66/chains/1995/chain-logo.png",
  },
  {
    chainId: "11115",
    chainName: "D-Chain",
    description:
      "D-Chain is a private blockchain with an unique architecture that offers high performance and scalability for corporates. D-Wallet is the first application developed on the D-Chain, for an enterprise-based loyalty program.",
    platformChainId: "4DGvhEmW1HwQtoDxgwUy2uNmf8GKtQtD1F8wunfGU6u1hhKiv",
    subnetId: "TVaAr9i1UzGFtRjykkvqLwKhGfj7h8BSthFTYkmGj8RNCrSc5",
    vmId: "srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy",
    vmName: "EVM",
    explorerUrl: "https://subnets-test.avax.network/dogus",
    rpcUrl: "https://subnets.avax.network/dogus/testnet/rpc",
    wsUrl: "wss://subnets.avax.network/dogus/testnet/ws",
    isTestnet: true,
    utilityAddresses: {
      multicall: "0x540B2F360109F02B7D0904dC3E5BCCF1d2aF9946",
    },
    networkToken: {
      name: "DOINX",
      symbol: "DOINX",
      decimals: 18,
      description:
        "DOINX is the central token on the D-Chain and used to pay gas for all transactions.",
      logoUri:
        "https://glacier-api.avax.network/proxy/chain-assets/70ffc12/chains/11115/token-logo.png",
    },
    chainLogoUri:
      "https://glacier-api.avax.network/proxy/chain-assets/70ffc12/chains/11115/chain-logo.png",
  },
  {
    chainId: "11111",
    chainName: "WAGMI Subnet",
    description:
      'The WAGMI ("We\'re All Going to Make It") Subnet Demo is a high throughput testbed for EVM (Ethereum Virtual Machine) optimizations. It is parameterized to run at a factor more capacity than Fuji/Mainnet C-Chain and will be used to experiment with release candidates before they make it into an official coreth release.',
    platformChainId: "2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt",
    subnetId: "28nrH5T2BMvNrWecFcV3mfccjs6axM1TVyqe79MCv2Mhs8kxiY",
    vmId: "srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy",
    vmName: "EVM",
    explorerUrl: "https://subnets-test.avax.network/wagmi",
    rpcUrl: "https://subnets.avax.network/wagmi/wagmi-chain-testnet/rpc",
    wsUrl: "wss://subnets.avax.network/wagmi/wagmi-chain-testnet/ws",
    isTestnet: true,
    utilityAddresses: {
      multicall: "0x7e5f336f8baFc0bf775DafE091133A37244C285c",
    },
    networkToken: {
      name: "Wagmi",
      symbol: "WGM",
      decimals: 18,
      description: "",
      logoUri:
        "https://glacier-api.avax.network/proxy/chain-assets/3e1b653/chains/11111/token-logo.png",
    },
    chainLogoUri:
      "https://glacier-api.avax.network/proxy/chain-assets/3e1b653/chains/11111/chain-logo.png",
  },
  {
    chainId: "6765897100",
    chainName: "Green Dot Subnet",
    description:
      "The Green Dot Subnet is an EVM-compatible blockchain which supports Deloitte assets, including Close As You Go (CAYG), a secure cloud-based software platform built to help agencies manage recovery documentation for procurement and contracting, model policies and procedures, and plan for disaster.",
    platformChainId: "2AFKhMXMViQvEXg8oNgGbsuWL8Wm3SaUGYHb48Tj7QCBRKo4k8",
    subnetId: "BKHSoGxzuT8LrZLjQyRFXk4mENVxxH3pwHAb25EKv2tsT32QC",
    vmId: "WcwqtgMrCEgcT1J7sBG4h4M9EqnwgGPBptWUNyqcuJvCt616H",
    vmName: "EVM",
    explorerUrl: "https://subnets.avax.network/green-dot",
    rpcUrl: "https://subnets.avax.network/dd/testnet/rpc",
    wsUrl: "wss://subnets.avax.network/dd/testnet/ws",
    isTestnet: true,
    utilityAddresses: {
      multicall: "0x565d6f203b7c562Ede758F54Fbf1F1c551817C49",
    },
    networkToken: {
      name: "CAYG",
      symbol: "CAYG",
      description:
        "CAYG is the central token on the Green Dot Subnet and used to pay gas for all transactions.",
      decimals: 18,
      logoUri:
        "https://glacier-api.avax.network/proxy/chain-assets/a0a2d1a/chains/6765897100/token-logo.png",
    },
    chainLogoUri:
      "https://glacier-api.avax.network/proxy/chain-assets/a0a2d1a/chains/6765897100/chain-logo.png",
  },
];
