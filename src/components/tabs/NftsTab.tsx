import { useState } from "react";
import useFetchNfts from "../../hooks/useFetchNfts";
import { TDisplayNftItem, TEvmAddress } from "../../types";
import { copyTextToClipboard } from "../../utils/misc";
import { truncateEthAddress } from "../../utils/string";
import Box from "../shared/Box";
import DetailsWrapper from "../shared/DetailsWrapper";

export default function NftTab() {
  const { nfts, errorMsg, isLoading: loadingNfts, fetchNfts } = useFetchNfts();
  const [selectedTokenAddress, setSelectedTokenAddress] =
    useState<TEvmAddress>();
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

  return (
    <>
      <DetailsWrapper summary="Your collectibles">
        <Box>
          <div className="flex flex-box">
            {displayItems.map((item: TDisplayNftItem, index: number) => (
              <div
                className={`flex flex-col  border-gray-400 py-3 ${
                  index === displayItems.length - 1 ? "" : "border-b"
                }`}
                key={item.address}
              >
                <div>
                  <span className="text-success font-bold">{item.symbol}</span>{" "}
                  - {item.name}
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
                    // onClick={() => selectTokenToSend(item.address)}
                    disabled={selectedTokenAddress !== undefined}
                    className="rounded-lg border ml-2 border-green-500 w-fit px-2 enabled:hover:text-black enabled:hover:bg-green-500 duration-200 disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400"
                  >
                    Send
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Box>
      </DetailsWrapper>
    </>
  );
}
