import { useAddress, useChainId } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import {
  GLACIER_BASE_URL,
  GLACIER_SUPPORTED_CHAINS,
} from "../constants/glacier-api";
import { TCollectibleBalances, TNft } from "../types/glacier-api";

export default function useFetchNfts() {
  const address = useAddress();
  const chainId = useChainId();
  const [nfts, setNfts] = useState<TNft[]>([]);
  const isChainIdSupported = GLACIER_SUPPORTED_CHAINS.find(
    (item) => Number(item.chainId) === chainId
  );
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchNfts = async () => {
    setIsLoading(true);
    try {
      const res: TCollectibleBalances = await fetch(
        `${GLACIER_BASE_URL}/chains/${chainId}/addresses/${address}/balances:listCollectibles?pageSize=100`
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
