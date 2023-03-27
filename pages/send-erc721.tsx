import { useAddress, useBalance, useNetwork } from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { isAddress } from "ethers/lib/utils";
import { useEffect, useRef, useState } from "react";
import ArrowDownIcon from "../src/components/ArrowDownIcon";
import Erc721Recepients from "../src/components/Erc721Recepients";
import { TDisplayNftItem } from "../src/types/blockchain";
import { TListErc721, TNft } from "../src/types/glacier-api";
import { truncateEthAddress } from "../src/utils/string";

export default function SendNativeTokenPage() {
  const address = useAddress();
  const { data, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
  const [{ data: chainData, error, loading: loadingNetwork }] = useNetwork();
  const [nfts, setNfts] = useState<TNft[]>([]);
  const [sendItems, setSendItems] = useState<
    { address: string; tokenId: number }[]
  >([]);
  const [contractToSend, setContractToSend] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Manipulate data
  const displayItems: TDisplayNftItem[] = false
    ? testitems
    : nfts?.reduce((accumulator: TDisplayNftItem[], currentValue) => {
        const exists = accumulator.find(
          (item: TDisplayNftItem) => item.address === currentValue.address
        );
        if (!exists) {
          const { chainId, address, name, symbol } = currentValue;
          const newItem: TDisplayNftItem = {
            name,
            chainId,
            address,
            symbol,
            quantity: nfts.filter(
              (item) => item.address === currentValue.address
            ).length,
          };
          accumulator.push(newItem);
        }
        return accumulator;
      }, []) ?? [];

  //   Fetch overall data from Glacier API
  useEffect(() => {
    if (!address) return;
    const fetchErc721 = async () => {
      const result: TListErc721 = await fetch(
        `https://glacier-api.avax.network/v1/chains/${chainData.chain?.id}/addresses/${address}/balances:listErc721?pageSize=100`
      ).then((r) => r.json());
      setNfts(result.erc721TokenBalances);
    };
    fetchErc721();
  }, [address]);

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

      <details className="mx-auto mt-10 lg:w-[800px] md:w-[600px] border border-white flex flex-col">
        <summary className="bg-green-700 rounded cursor-pointer pl-2 h-[50px] flex">
          <div className="m-auto">Your ERC721 contracts</div>
        </summary>
        <div className="flex flex-col">
          <div className="pl-2">
            You have {nfts?.length} ERC721 tokens in your wallet
          </div>
          {displayItems && displayItems.length > 0 && (
            <>
              {displayItems.map((item) => (
                <div
                  className="flex flex-col border border-white rounded p-2 mt-2 max-w-[95vw]"
                  key={item.address}
                >
                  <div className="font-bold flex flex-col">
                    <div className="flex flex-row flex-wrap">
                      {item.name} - ({item.symbol})
                      <br />
                      Quantity: {item.quantity}
                    </div>
                    <div className="flex flex-row mt-2">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(item.address);
                        }}
                        className="border border-white my-auto px-1  hover:bg-green-700 hover:text-white"
                      >
                        Copy addr
                      </button>
                      <button className="border border-white ml-4 my-auto px-1  hover:bg-green-700 hover:text-white">
                        Send
                      </button>
                    </div>
                  </div>
                  <div className="text-sm pl-1 mt-2">{item.address}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </details>
      <details className="mx-auto mt-10 lg:w-[800px] md:w-[600px] flex flex-col border border-white mb-10">
        <summary className="bg-green-700 rounded cursor-pointer pl-2 h-[50px] flex">
          <div className="m-auto">Send NFTs now</div>
        </summary>
        <div className="flex flex-col">
          <div className="mx-auto">
            <div className="flex flex-col">
              <div className="mx-auto mt-4 text-lg font-bold">
                Select NFT contract to send
              </div>
              <select
                name=""
                id=""
                className="border border-white px-2 py-1"
                placeholder="Select a contract"
                onChange={(e) => {
                  const _addrr = e.target.value;
                  if (inputRef.current) inputRef.current.value = _addrr;
                  setContractToSend(_addrr);
                }}
              >
                <option value={"Select an option"} disabled>
                  Select an option
                </option>
                {displayItems.map((item) => (
                  <option
                    value={item.address}
                    key={item.address}
                    className="py-1"
                  >
                    {item.name} - {truncateEthAddress(item.address)}
                  </option>
                ))}
              </select>
              <div className="mx-auto mt-4">
                <ArrowDownIcon />
              </div>
              <div className="mx-auto mt-5 flex flex-col">
                <div className="mx-auto text-lg font-bold">
                  Contract selected
                </div>
                <div className="mx-auto text-sm text-center max-w-[500px]">
                  The API might be missing a contract in your wallet. You can
                  put in a custom contract below. Just make sure it&apos;s a
                  valid ERC721 contract address
                </div>
              </div>
              <div className="mx-auto mt-2">
                <input
                  ref={inputRef}
                  className="w-[300px] border border-white px-2 py-2 lg:w-[500px] md:w-[500px] text-center"
                  type="text"
                  placeholder="Contract to send"
                  onChange={(e) => {
                    const _addrr = e.target.value;
                    if (isAddress(_addrr)) setContractToSend(_addrr);
                  }}
                />
              </div>

              <div className="mx-auto mt-4">
                <ArrowDownIcon />
              </div>
              <div className="mx-auto mt-5 flex flex-col">
                <div className="mx-auto text-lg font-bold">Add recepients</div>
                {contractToSend && address && (
                  <Erc721Recepients
                    contractToSend={contractToSend}
                    tokenOwner={address}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}

const testitems = [
  {
    name: "City Badges",
    chainId: "43114",
    address: "0x0830B74062E88581b2e0a68fcbc5F57D5318dDcA",
    symbol: "CTBADGE",
    quantity: 6,
  },
  {
    name: "Welcome to SteakHut",
    chainId: "43114",
    address: "0x09eDA300408ECCbA7BA595b47F669Af4ccFB985b",
    symbol: "Welcome",
    quantity: 1,
  },
  {
    name: "Welcome to Joe",
    chainId: "43114",
    address: "0x3DAA63C2D67E5A38447D31bC4cD414Eb95a9Ff56",
    symbol: "Joe",
    quantity: 1,
  },
  {
    name: "Europe Trip 2021",
    chainId: "43114",
    address: "0x56Fd0bFeF24e0526CD3dD641CDaAf31CBa2d957F",
    symbol: "EU21VA",
    quantity: 1,
  },
  {
    name: "Ava Shrooms",
    chainId: "43114",
    address: "0x682a4f41B0f9141c09947ECA0249AC99424612E5",
    symbol: "SHY",
    quantity: 1,
  },
  {
    name: "unnamedNFT",
    chainId: "43114",
    address: "0x6BDAd2A83a8e70F459786a96a0a9159574685c0e",
    symbol: "UNFT",
    quantity: 2,
  },
  {
    name: "Europe Trip 2021",
    chainId: "43114",
    address: "0xC185812AcCBA12ca0Fb9eB1c7c50fEc556734b32",
    symbol: "EU21",
    quantity: 10,
  },
  {
    name: "TIMEBOMBs",
    chainId: "43114",
    address: "0xD2a525d91DAC5C4452B79b828de81E8a1350b25c",
    symbol: "BOMB",
    quantity: 3,
  },
  {
    name: "Delta Prime Early Access",
    chainId: "43114",
    address: "0xe31B515f77c84D8E35FAf831ef69bea3ac237281",
    symbol: "DP-EA",
    quantity: 1,
  },
];
