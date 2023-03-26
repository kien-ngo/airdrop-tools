import {
  useAddress,
  useBalance,
  useContract,
  useContractWrite,
  useNetwork,
  Web3Button,
} from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { useState } from "react";
import { TEvmAddress } from "../src/types/blockchain";
import { truncateEthAddress } from "../src/utils/string";

const AIRDROP_ERC20_CONTRACT = "0x72e48AEa408642b03f97c6763167955eD429363E";

export default function SendNativeTokenPage() {
  const { contract, isLoading: loadingContract } = useContract(
    AIRDROP_ERC20_CONTRACT
  );
  const { mutateAsync: airdrop, isLoading: loadingContractWrite } =
    useContractWrite(contract, "airdrop");
  const address = useAddress();
  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
  const [{ data: chainData, error, loading: loadingNetwork }] = useNetwork();

  const [airdropAddresses, setAirdropAddresses] = useState<
    { address: TEvmAddress; amount: number }[]
  >([
    { address: "0x123456149f35dc84101c93d71c9c7d95487b8ecc", amount: 1 },
    { address: "0x00000008d964a6331573ff6854245e77c8e11c07", amount: 1 },
  ]);

  return (
    <div className="flex flex-col">
      <div className="mx-auto mt-10 flex flex-col">
        ChainID: {chainData.chain?.id} ({chainData.chain?.name})
        <span title={address ?? ""}>
          Your wallet address: {truncateEthAddress(address ?? "")}{" "}
          <button className="font-bold underline text-green-600">[Copy]</button>
        </span>
        Your {data?.symbol} balance: {data?.displayValue}
      </div>

      <div className="flex flex-col">
        <div className="mx-auto font-bold mt-10">
          Send {data?.symbol} to multiple addresses
        </div>
        <div className="flex flex-col">
          <button className="mx-auto mt-8 btn btn-primary">Add more +</button>
        </div>
      </div>

      <div className="mx-auto">
        {/* <button className="btn btn-success" onClick={sendTokens}>
          Send now
        </button> */}
        <Web3Button
          contractAddress={AIRDROP_ERC20_CONTRACT}
          action={(contract) => {
            const recepients = airdropAddresses.map((item) => item.address);
            const amounts = airdropAddresses.map((item) => item.amount);
            contract.call(
              "airdrop",
              NATIVE_TOKEN_ADDRESS,
              address,
              recepients,
              amounts
            );
          }}
        >
          Send now
        </Web3Button>
      </div>
    </div>
  );
}
