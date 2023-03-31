import { useAddress, useChainId } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import {
  GLACIER_BASE_URL,
  GLACIER_SUPPORTED_CHAINS,
} from "../constants/glacier-api";
import { TErc20, TListErc20Balances } from "../types/glacier-api";

export default function useFetchErc20Tokens() {
  const address = useAddress();
  const chainId = useChainId();
  const [erc20Tokens, setErc20Tokens] = useState<TErc20[]>([]);
  const isChainIdSupported = GLACIER_SUPPORTED_CHAINS.find(
    (item) => Number(item.chainId) === chainId
  );
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchErc20Tokens = async () => {
    setIsLoading(true);
    try {
      const res: TListErc20Balances = await fetch(
        `${GLACIER_BASE_URL}/chains/${chainId}/addresses/${address}/balances:listErc20?currency=usd&pageSize=100`
      ).then((r) => r.json());
      setErc20Tokens(res.erc20TokenBalances);
    } catch (err) {
      alert(err);
      setErrorMsg(err as string);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (!isChainIdSupported) {
      setErrorMsg("This chain is not indexed by the Glacier API");
      return;
    }
    if (!address || !chainId) return;
    fetchErc20Tokens();
  }, [address, chainId, isChainIdSupported]);

  return {
    erc20Tokens,
    errorMsg,
    isLoading,
    fetchErc20Tokens,
  };
}
