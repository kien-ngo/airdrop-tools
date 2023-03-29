import { useAddress, useNetwork } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { BASE_URL, GLACIER_SUPPORTED_CHAINS } from "../constants/glacier-api";
import { TErc20, TListErc20Balances } from "../types/glacier-api";

export default function useFetchErc20Tokens() {
  const address = useAddress();
  const [{ data: chainData, error, loading: loadingNetwork }] = useNetwork();
  const chainId = chainData.chain?.id;
  const [erc20Tokens, setErc20Tokens] = useState<TErc20[]>([]);
  const isChainIdSupported = GLACIER_SUPPORTED_CHAINS.find(
    (item) => Number(item.chainId) === chainId
  );
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState(loadingNetwork);
  const fetchErc20Tokens = async () => {
    setIsLoading(true);
    try {
      const res: TListErc20Balances = await fetch(
        `${BASE_URL}/chains/${chainId}/addresses/${address}/balances:listErc20?currency=usd&pageSize=100`
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
