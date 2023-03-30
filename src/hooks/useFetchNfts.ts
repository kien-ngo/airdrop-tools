import { useAddress, useNetwork } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { BASE_URL, GLACIER_SUPPORTED_CHAINS } from "../constants/glacier-api";
import { TCollectibleBalances, TNft } from "../types/glacier-api";

export default function useFetchNfts() {
  const address = useAddress();
  const [{ data: chainData, error, loading: loadingNetwork }] = useNetwork();
  const chainId = chainData.chain?.id;
  const [nfts, setNfts] = useState<TNft[]>([]);
  const isChainIdSupported = GLACIER_SUPPORTED_CHAINS.find(
    (item) => Number(item.chainId) === chainId
  );
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState(loadingNetwork);
  const fetchNfts = async () => {
    setIsLoading(true);
    try {
      const res: TCollectibleBalances = await fetch(
        `${BASE_URL}/chains/${chainId}/addresses/${address}/balances:listCollectibles?pageSize=100`
      ).then((r) => r.json());
      setNfts(res.collectibleBalances);

      // setNfts(testData.collectibleBalances);
    } catch (err) {
      alert(err);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (!isChainIdSupported) {
      setErrorMsg("This chain is not indexed by the Glacier API");
      return;
    }
    if (!address || !chainId) return;
    fetchNfts();
  }, [address, chainId, isChainIdSupported]);
  return {
    nfts,
    errorMsg,
    isLoading,
    fetchNfts,
  };
}

// const testData: TCollectibleBalances = {
//   collectibleBalances: [
//     {
//       ercType: "ERC-721",
//       chainId: "43113",
//       address: "0x5766ebE147349FdfC4AACa899512B87E2e43A84e",
//       name: "AirbusTest",
//       symbol: "NFT",
//       tokenId: "4",
//       tokenUri: "https://fetch.opengem.com/airbus/metadata.json",
//       metadata: {
//         indexStatus: "INDEXED",
//         metadataLastUpdatedTimestamp: 1678197893,
//         name: "RACER by Airbus Helicopters",
//         imageUri: "https://fetch.opengem.com/airbus/assets/art.jpg",
//         description:
//           "The RACER artwork, made by the artist Gio Manetta, celebrates the 30th anniversary of Airbus Helicopters. Airbus Helicopters and its employees keep on pioneering sustainable aerospace for a safe and united world.",
//       },
//     },
//     {
//       ercType: "ERC-721",
//       chainId: "43113",
//       address: "0x5766ebE147349FdfC4AACa899512B87E2e43A84e",
//       name: "AirbusTest",
//       symbol: "NFT",
//       tokenId: "5",
//       tokenUri: "https://fetch.opengem.com/airbus/metadata.json",
//       metadata: {
//         indexStatus: "INDEXED",
//         metadataLastUpdatedTimestamp: 1678197893,
//         name: "RACER by Airbus Helicopters",
//         imageUri: "https://fetch.opengem.com/airbus/assets/art.jpg",
//         description:
//           "The RACER artwork, made by the artist Gio Manetta, celebrates the 30th anniversary of Airbus Helicopters. Airbus Helicopters and its employees keep on pioneering sustainable aerospace for a safe and united world.",
//       },
//     },
//     {
//       ercType: "ERC-721",
//       chainId: "43113",
//       address: "0x5766ebE147349FdfC4AACa899512B87E2e43A84e",
//       name: "AirbusTest",
//       symbol: "NFT",
//       tokenId: "6",
//       tokenUri: "https://fetch.opengem.com/airbus/metadata.json",
//       metadata: {
//         indexStatus: "INDEXED",
//         metadataLastUpdatedTimestamp: 1678195910,
//         name: "RACER by Airbus Helicopters",
//         imageUri: "https://fetch.opengem.com/airbus/assets/art.jpg",
//         description:
//           "The RACER artwork, made by the artist Gio Manetta, celebrates the 30th anniversary of Airbus Helicopters. Airbus Helicopters and its employees keep on pioneering sustainable aerospace for a safe and united world.",
//       },
//     },
//     {
//       ercType: "ERC-721",
//       chainId: "43113",
//       address: "0x5766ebE147349FdfC4AACa899512B87E2e43A84e",
//       name: "AirbusTest",
//       symbol: "NFT",
//       tokenId: "9",
//       tokenUri: "https://fetch.opengem.com/airbus/metadata.json",
//       metadata: {
//         indexStatus: "INDEXED",
//         metadataLastUpdatedTimestamp: 1678196170,
//         name: "RACER by Airbus Helicopters",
//         imageUri: "https://fetch.opengem.com/airbus/assets/art.jpg",
//         description:
//           "The RACER artwork, made by the artist Gio Manetta, celebrates the 30th anniversary of Airbus Helicopters. Airbus Helicopters and its employees keep on pioneering sustainable aerospace for a safe and united world.",
//       },
//     },
//     {
//       ercType: "ERC-721",
//       chainId: "43113",
//       address: "0x5766ebE147349FdfC4AACa899512B87E2e43A84e",
//       name: "AirbusTest",
//       symbol: "NFT",
//       tokenId: "20",
//       tokenUri: "https://fetch.opengem.com/airbus/metadata.json",
//       metadata: {
//         indexStatus: "INDEXED",
//         metadataLastUpdatedTimestamp: 1678197144,
//         name: "RACER by Airbus Helicopters",
//         imageUri: "https://fetch.opengem.com/airbus/assets/art.jpg",
//         description:
//           "The RACER artwork, made by the artist Gio Manetta, celebrates the 30th anniversary of Airbus Helicopters. Airbus Helicopters and its employees keep on pioneering sustainable aerospace for a safe and united world.",
//       },
//     },
//     {
//       ercType: "ERC-721",
//       chainId: "43113",
//       address: "0x5766ebE147349FdfC4AACa899512B87E2e43A84e",
//       name: "AirbusTest",
//       symbol: "NFT",
//       tokenId: "22",
//       tokenUri: "https://fetch.opengem.com/airbus/metadata.json",
//       metadata: {
//         indexStatus: "INDEXED",
//         metadataLastUpdatedTimestamp: 1678197081,
//         name: "RACER by Airbus Helicopters",
//         imageUri: "https://fetch.opengem.com/airbus/assets/art.jpg",
//         description:
//           "The RACER artwork, made by the artist Gio Manetta, celebrates the 30th anniversary of Airbus Helicopters. Airbus Helicopters and its employees keep on pioneering sustainable aerospace for a safe and united world.",
//       },
//     },
//     {
//       ercType: "ERC-721",
//       chainId: "43113",
//       address: "0x5766ebE147349FdfC4AACa899512B87E2e43A84e",
//       name: "AirbusTest",
//       symbol: "NFT",
//       tokenId: "23",
//       tokenUri: "https://fetch.opengem.com/airbus/metadata.json",
//       metadata: {
//         indexStatus: "INDEXED",
//         metadataLastUpdatedTimestamp: 1678197081,
//         name: "RACER by Airbus Helicopters",
//         imageUri: "https://fetch.opengem.com/airbus/assets/art.jpg",
//         description:
//           "The RACER artwork, made by the artist Gio Manetta, celebrates the 30th anniversary of Airbus Helicopters. Airbus Helicopters and its employees keep on pioneering sustainable aerospace for a safe and united world.",
//       },
//     },
//     {
//       ercType: "ERC-721",
//       chainId: "43113",
//       address: "0x5766ebE147349FdfC4AACa899512B87E2e43A84e",
//       name: "AirbusTest",
//       symbol: "NFT",
//       tokenId: "25",
//       tokenUri: "https://fetch.opengem.com/airbus/metadata.json",
//       metadata: {
//         indexStatus: "INDEXED",
//         metadataLastUpdatedTimestamp: 1678196170,
//         name: "RACER by Airbus Helicopters",
//         imageUri: "https://fetch.opengem.com/airbus/assets/art.jpg",
//         description:
//           "The RACER artwork, made by the artist Gio Manetta, celebrates the 30th anniversary of Airbus Helicopters. Airbus Helicopters and its employees keep on pioneering sustainable aerospace for a safe and united world.",
//       },
//     },
//     {
//       ercType: "ERC-721",
//       chainId: "43113",
//       address: "0x5766ebE147349FdfC4AACa899512B87E2e43A84e",
//       name: "AirbusTest",
//       symbol: "NFT",
//       tokenId: "26",
//       tokenUri: "https://fetch.opengem.com/airbus/metadata.json",
//       metadata: {
//         indexStatus: "INDEXED",
//         metadataLastUpdatedTimestamp: 1678197061,
//         name: "RACER by Airbus Helicopters",
//         imageUri: "https://fetch.opengem.com/airbus/assets/art.jpg",
//         description:
//           "The RACER artwork, made by the artist Gio Manetta, celebrates the 30th anniversary of Airbus Helicopters. Airbus Helicopters and its employees keep on pioneering sustainable aerospace for a safe and united world.",
//       },
//     },
//     {
//       ercType: "ERC-721",
//       chainId: "43113",
//       address: "0x5766ebE147349FdfC4AACa899512B87E2e43A84e",
//       name: "AirbusTest",
//       symbol: "NFT",
//       tokenId: "76",
//       tokenUri: "https://fetch.opengem.com/airbus/metadata.json",
//       metadata: {
//         indexStatus: "INDEXED",
//         metadataLastUpdatedTimestamp: 1678196198,
//         name: "RACER by Airbus Helicopters",
//         imageUri: "https://fetch.opengem.com/airbus/assets/art.jpg",
//         description:
//           "The RACER artwork, made by the artist Gio Manetta, celebrates the 30th anniversary of Airbus Helicopters. Airbus Helicopters and its employees keep on pioneering sustainable aerospace for a safe and united world.",
//       },
//     },
//     {
//       ercType: "ERC-721",
//       chainId: "43113",
//       address: "0x5766ebE147349FdfC4AACa899512B87E2e43A84e",
//       name: "AirbusTest",
//       symbol: "NFT",
//       tokenId: "97",
//       tokenUri: "https://fetch.opengem.com/airbus/metadata.json",
//       metadata: {
//         indexStatus: "INDEXED",
//         metadataLastUpdatedTimestamp: 1678197156,
//         name: "RACER by Airbus Helicopters",
//         imageUri: "https://fetch.opengem.com/airbus/assets/art.jpg",
//         description:
//           "The RACER artwork, made by the artist Gio Manetta, celebrates the 30th anniversary of Airbus Helicopters. Airbus Helicopters and its employees keep on pioneering sustainable aerospace for a safe and united world.",
//       },
//     },
//   ],
//   nextPageToken: "",
// };
