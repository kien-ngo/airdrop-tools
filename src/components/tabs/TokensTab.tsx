import { useBalance, useNetwork } from "@thirdweb-dev/react";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { isAddress } from "ethers/lib/utils";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { TEvmAddress } from "../../types";
import { TErc20, TListErc20Balances } from "../../types/glacier-api";
import { copyTextToClipboard } from "../../utils/misc";
import { convertBigNumToFloat } from "../../utils/number";
import { truncateEthAddress } from "../../utils/string";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import GreenCheckMark from "../icons/GreenCheckmark";

const AddTokenRecipients = dynamic(
  () => import("../token/AddTokenRecipients"),
  { ssr: false }
);

type TTokenTabs = { callerAddress: string | undefined };

export default function TokenTab({ callerAddress }: TTokenTabs) {
  const { data: balanceData, isLoading } = useBalance(NATIVE_TOKEN_ADDRESS);
  const [{ data: chainData, error, loading: loadingNetwork }] = useNetwork();
  const [showLowBalances, setShowLowBalances] = useState<boolean>(false);
  const [lowBalanceThreshhold, setLowBalanceThreshold] = useState<number>(0.5);
  const [selectedTokenAddress, setSelectedTokenAddress] =
    useState<TEvmAddress>();
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const displayItems: TErc20[] = showLowBalances
    ? testTokenBalances.erc20TokenBalances
    : testTokenBalances.erc20TokenBalances.filter(
        (item) =>
          convertBigNumToFloat(item.balance, item.decimals) >
          lowBalanceThreshhold
      );
  const copyTokenAddress = async (address: TEvmAddress) => {
    await copyTextToClipboard(address as string);
    alert("Copied");
  };
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
    <div className="flex flex-col mx-auto mt-10">
      <div className="text-2xl pl-2">Your tokens</div>
      <div className="pl-2">
        <div>
          {chainData.chain?.nativeCurrency?.symbol} balance:{" "}
          {balanceData?.displayValue}
        </div>
      </div>
      <details className="mt-4">
        <summary className="bg-primary w-[95vw] lg:w-[800px] md:w-[700px] py-2 pl-2 rounded-lg cursor-pointer">
          ERC Tokens ({displayItems.length})
        </summary>
        <div className="flex flex-col px-2">
          <div className="flex flex-col border border-gray-400 p-2 mt-2">
            <div className="flex flex-row">
              <div className="ml-auto">
                <label htmlFor="toggleShowBalanceInput">
                  Show low balances:
                </label>{" "}
                <input
                  id="toggleShowBalanceInput"
                  type="checkbox"
                  onChange={() => setShowLowBalances(!showLowBalances)}
                />
              </div>
            </div>
            {displayItems.map((item: TErc20, index) => (
              <div
                className={`flex flex-col  border-gray-400 py-3 ${
                  index === displayItems.length - 1 ? "" : "border-b"
                }`}
                key={item.address}
              >
                <div>
                  <span className="text-success font-bold">{item.symbol}</span>-{" "}
                  {item.name}
                </div>
                <div>
                  Balance: {convertBigNumToFloat(item.balance, item.decimals)}
                </div>
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
                    onClick={() => copyTokenAddress(item.address)}
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </details>
      <details className="mt-4">
        <summary className="bg-primary w-[95vw] lg:w-[800px] md:w-[700px] py-2 pl-2 rounded-lg cursor-pointer">
          Transfer tokens
        </summary>
        <div className="flex flex-col px-2">
          <div className="flex flex-col border border-gray-400 p-2 mt-2">
            <div className="font-bold text-lg">
              Step 1: Select the token to send
            </div>
            <div className="text-xs lg:w-[750px] md:w-[650px] w-[85vw]">
              If the token you&apos;re looking for is not in the list, it might
              be because the API did not index that token. In that case,
              manually paste the token address in the box
            </div>

            <select
              disabled={selectedTokenAddress !== undefined}
              ref={selectRef}
              className="border border-white px-2 py-1 mx-auto mt-4 disabled:cursor-not-allowed"
              placeholder="Select a token"
              onChange={(e) => {
                const _addrr = e.target.value;
                if (inputRef.current) inputRef.current.value = _addrr;
              }}
            >
              <option value="Select a token">Select a token</option>
              <option
                value={NATIVE_TOKEN_ADDRESS}
                className="bg-warning text-black"
              >
                ${chainData.chain?.nativeCurrency?.symbol} (Native token)
              </option>
              {testTokenBalances.erc20TokenBalances.map((item) => (
                <option
                  value={item.address}
                  key={item.address}
                  className="py-1"
                >
                  ${item.symbol} -- {item.name}
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
                className="mt-6 rounded-lg border border-white w-fit px-5 mx-auto enabled:hover:text-black enabled:hover:bg-white duration-200 disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400"
              >
                Next
              </button>
            </div>
            {selectedTokenAddress && (
              <div className="ml-auto">
                <GreenCheckMark />
              </div>
            )}
          </div>
          {/* Step 2 */}
          {selectedTokenAddress && balanceData && (
            <AddTokenRecipients
              callerAddress={callerAddress as TEvmAddress}
              tokenAddress={selectedTokenAddress}
              balanceData={balanceData}
            />
          )}
        </div>
      </details>
    </div>
  );
}

const testTokenBalances: TListErc20Balances = {
  erc20TokenBalances: [
    {
      ercType: "ERC-20",
      chainId: "43114",
      address: "0x01234181085565ed162a948b6a5e88758CD7c7b8",
      name: "GMX LP",
      symbol: "GLP",
      decimals: 18,
      balance: "0",
    },
    {
      ercType: "ERC-20",
      chainId: "43114",
      address: "0x0C4684086914D5B1525bf16c62a0FF8010AB991A",
      name: "Compounding YAK",
      symbol: "YRT",
      decimals: 18,
      balance: "0",
    },
    {
      ercType: "ERC-20",
      chainId: "43114",
      address: "0x1205f31718499dBf1fCa446663B532Ef87481fe1",
      name: "USD Coin-LP",
      symbol: "S*USDC",
      decimals: 6,
      balance: "0",
    },
    {
      ercType: "ERC-20",
      chainId: "43114",
      address: "0x1B156C5c75E9dF4CAAb2a5cc5999aC58ff4F9090",
      name: "Moo Aave AVAX",
      symbol: "mooAaveAVAX",
      decimals: 18,
      balance: "0",
    },
    {
      ercType: "ERC-20",
      chainId: "43114",
      address: "0x22EDe03f1115666CF05a4bAfafaEe8F43D42cD56",
      name: "Yield Yak: JLP sAVAX-AVAX",
      symbol: "YRT",
      decimals: 18,
      balance: "0",
    },
    {
      ercType: "ERC-20",
      chainId: "43114",
      address: "0x22d4002028f537599bE9f666d1c4Fa138522f9c8",
      name: "Platypus",
      symbol: "PTP",
      decimals: 18,
      price: {
        value: 0.054846,
        currencyCode: "usd",
      },
      balance: "0",
      balanceValue: {
        currencyCode: "usd",
        value: 0,
      },
      logoUri:
        "https://glacier-api.avax.network/proxy/chain-assets/3e1b653/chains/43114/contracts/0x22d4002028f537599bE9f666d1c4Fa138522f9c8/logo.png",
    },
    {
      ercType: "ERC-20",
      chainId: "43114",
      address: "0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590",
      name: "StargateToken",
      symbol: "STG",
      decimals: 18,
      price: {
        value: 0.653146,
        currencyCode: "usd",
      },
      balance: "0",
      balanceValue: {
        currencyCode: "usd",
        value: 0,
      },
      logoUri:
        "https://glacier-api.avax.network/proxy/chain-assets/3e1b653/chains/43114/contracts/0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590/logo.png",
    },
    {
      ercType: "ERC-20",
      chainId: "43114",
      address: "0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE",
      name: "Staked AVAX",
      symbol: "sAVAX",
      decimals: 18,
      price: {
        value: 18.17,
        currencyCode: "usd",
      },
      balance: "0",
      balanceValue: {
        currencyCode: "usd",
        value: 0,
      },
      logoUri:
        "https://glacier-api.avax.network/proxy/chain-assets/3e1b653/chains/43114/contracts/0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE/logo.png",
    },
    {
      ercType: "ERC-20",
      chainId: "43114",
      address: "0x2bD10f8E93B3669b6d42E74eEedC65dd1B0a1342",
      name: "Staked GMX",
      symbol: "sGMX",
      decimals: 18,
      balance: "0",
    },
    {
      ercType: "ERC-20",
      chainId: "43114",
      address: "0x2be494c06316c0D7371250419a9c659A0752ecB3",
      name: "24DROP.NET",
      symbol: "24DROP.NET",
      decimals: 8,
      balance: "200000000000",
    },
  ],
  nextPageToken:
    "eyJwayI6eyJTIjoiRVJDMjAjMHg4OWY4NEQ0ZTRlY2FCYTQyMjMzRUVmYzQ2ZUU0OWEwM0RiOTQzYkFEIn0sInNrIjp7IlMiOiIweDJiZTQ5NGMwNjMxNmMwRDczNzEyNTA0MTlhOWM2NTlBMDc1MmVjQjMifX0",
};
