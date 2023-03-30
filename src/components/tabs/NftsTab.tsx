import { isAddress } from "ethers/lib/utils";
import { useRef, useState } from "react";
import useFetchNfts from "../../hooks/useFetchNfts";
import { TEvmAddress } from "../../types";
import { copyTextToClipboard } from "../../utils/misc";
import { truncateEthAddress } from "../../utils/string";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import GreenCheckMark from "../icons/GreenCheckmark";
import AddNftRecipients from "../nft/AddNftRecipients";
import Box from "../shared/Box";
import DetailsWrapper from "../shared/DetailsWrapper";

type TDisplayNftItem = {
  chainId: string;
  address: TEvmAddress;
  name: string;
  symbol: string;
  quantity: number;
};

export default function NftTab() {
  const { nfts, errorMsg, isLoading: loadingNfts, fetchNfts } = useFetchNfts();
  const [selectedTokenAddress, setSelectedTokenAddress] =
    useState<TEvmAddress>();
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const displayItems: TDisplayNftItem[] =
    nfts?.reduce((accumulator: TDisplayNftItem[], currentValue) => {
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
          quantity: nfts.filter((item) => item.address === currentValue.address)
            .length,
        };
        accumulator.push(newItem);
      }
      return accumulator;
    }, []) ?? [];
  const selectTokenToSend = (address: TEvmAddress) => {
    setSelectedTokenAddress(address);
    if (inputRef.current) inputRef.current.value = address;
    if (selectRef.current) selectRef.current.value = address;
  };
  const selectedCollectionName =
    displayItems.find((item) => item.address === selectedTokenAddress)?.name ??
    "";
  const importContract = () => {
    if (!inputRef.current) return;
    const value = inputRef.current.value;
    if (!value) return alert("Please select a token");
    if (!isAddress(value)) return alert("Invalid token address");
    setSelectedTokenAddress(value as TEvmAddress);
  };
  const clearInput = () => {
    if (inputRef.current) inputRef.current.value = "";
    if (selectRef.current) selectRef.current.value = "Select a token";
    setSelectedTokenAddress(undefined);
  };
  return (
    <>
      <DetailsWrapper summary="Your collectibles">
        <Box>
          <>
            {displayItems.map((item: TDisplayNftItem, index: number) => (
              <div
                className={`flex flex-col  border-gray-400 py-3 ${
                  index === displayItems.length - 1 ? "" : "border-b"
                }`}
                key={item.address}
              >
                <div>
                  <span className="text-success font-bold">Collection:</span>{" "}
                  {item.name ? item.name : "(No name)"}
                </div>
                <div>
                  {/* Balance: {convertBigNumToFloat(item.balance, item.decimals)} */}
                </div>
                <div>You own: {item.quantity}</div>
                <div className="flex flex-row">
                  <div className="my-auto">
                    Contract:{" "}
                    <a
                      className="underline"
                      href={`https://${item.address}-to-be-worked-on`}
                      target="_blank"
                    >
                      {truncateEthAddress(item.address)}
                    </a>
                  </div>
                  <button
                    className="underline font-bold my-auto ml-6"
                    onClick={() => copyTextToClipboard(item.address)}
                  >
                    Copy
                  </button>
                  <button
                    onClick={() => selectTokenToSend(item.address)}
                    disabled={selectedTokenAddress !== undefined}
                    className="rounded-lg border ml-2 border-green-500 w-fit px-2 enabled:hover:text-black enabled:hover:bg-green-500 duration-200 disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400"
                  >
                    Send
                  </button>
                </div>
              </div>
            ))}
          </>
        </Box>
      </DetailsWrapper>
      <DetailsWrapper summary="Transfer NFTs">
        <>
          <Box>
            <>
              <div className="font-bold text-lg">
                Step 1: Select the collection to send
              </div>
              <div className="text-xs lg:w-[750px] md:w-[650px] w-[85vw]">
                If the collection you&apos;re looking for is not in the list, it
                might be because the API did not index that token. In that case,
                manually paste the collection address in the box
              </div>
              <select
                disabled={selectedTokenAddress !== undefined}
                ref={selectRef}
                className="border border-white px-2 py-1 mx-auto mt-4 disabled:cursor-not-allowed max-w-[95%]"
                placeholder="Select a token"
                onChange={(e) => {
                  const _addrr = e.target.value;
                  if (inputRef.current) inputRef.current.value = _addrr;
                }}
              >
                <option value="Select a token">Select collection</option>
                {displayItems.map((item) => (
                  <option
                    value={item.address}
                    key={item.address}
                    className="py-1"
                  >
                    {item.name ? item.name : "(No name)"} - {item.symbol}
                  </option>
                ))}
              </select>
              <div className="mx-auto mt-3">
                <ArrowDownIcon />
              </div>
              <div className="mx-auto mt-4 flex flex-col">
                <input
                  disabled={selectedTokenAddress !== undefined}
                  ref={inputRef}
                  className="enabled:border enabled:border-white px-2 py-2 lg:w-[500px] md:w-[500px] text-center min-w-[300px] max-w-[350px] text-sm disabled:cursor-not-allowed"
                  type="text"
                  placeholder="Contract to send"
                />
                {!selectedTokenAddress && (
                  <>
                    <button
                      onClick={clearInput}
                      className="mx-auto mt-2 underline disabled:cursor-not-allowed"
                      disabled={selectedTokenAddress !== undefined}
                    >
                      Clear
                    </button>
                    <button
                      onClick={importContract}
                      disabled={selectedTokenAddress !== undefined}
                      className="mt-6 rounded-lg border border-green-500 w-fit px-5 mx-auto enabled:hover:text-black enabled:hover:bg-green-500 duration-200 disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400"
                    >
                      Next
                    </button>
                  </>
                )}
              </div>
              {selectedTokenAddress && (
                <div className="ml-auto">
                  <GreenCheckMark />
                </div>
              )}
            </>
          </Box>
          {/* Step 2 */}
          {selectedTokenAddress && (
            <AddNftRecipients
              tokenAddress={selectedTokenAddress}
              cancelFn={setSelectedTokenAddress}
              collectionName={selectedCollectionName}
            />
          )}
        </>
      </DetailsWrapper>
    </>
  );
}
