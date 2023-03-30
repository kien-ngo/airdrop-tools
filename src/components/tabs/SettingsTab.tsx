import { GLACIER_SUPPORTED_CHAINS } from "../../constants/glacier-api";
import { copyTextToClipboard } from "../../utils/misc";
import { truncateEthAddress } from "../../utils/string";
import Box from "../shared/Box";
import DetailsWrapper from "../shared/DetailsWrapper";

export default function SettingsTab() {
  return (
    <>
      <DetailsWrapper summary="Configs">
        <Box>
          <>
            <div>
              Low balance threshold:{" "}
              <input
                type="number"
                min={0}
                defaultValue={0.5}
                className="pl-2"
              />{" "}
              <button className="ml-2 border border-gray-400 px-2 enabled:hover:bg-white enabled:hover:text-black duration-200">
                Save
              </button>
            </div>
            <div className="flex flex-col mt-4">
              <div>
                Covalent API key: <input type="text" />
                <button className="ml-2 border border-gray-400 px-2 enabled:hover:bg-white enabled:hover:text-black duration-200">
                  Save
                </button>
              </div>
              <div className="text-xs">
                This app does not collect your API key.
              </div>
            </div>
          </>
        </Box>
      </DetailsWrapper>
      <DetailsWrapper summary="About">
        <Box>
          <>
            <div>
              Use this app to batch transfer tokens (airdrop) to multiple
              recipients. It&apos;s completely open-source, free and does not
              track or collect anything from users. Check out the{" "}
              <a
                href="https://github.com/kienngo98/airdrop-tools"
                target="_blank"
                className="underline"
              >
                source code.
              </a>
            </div>
            <div className="mt-6">
              The app gathers blockchain data from Thirdweb SDK,{" "}
              <a
                href="https://glacier-api.avax.network/api#"
                target="_blank"
                className="underline"
              >
                Glacier APIs
              </a>{" "}
              and some other APIs from Covalent.
            </div>
            <div className="mt-6">
              The contracts used in this app are prebuilt and audited by{" "}
              <a
                href="https://thirdweb.com/"
                target="_blank"
                className="underline"
              >
                Thirdweb
              </a>
              . You can deploy your own contracts and apply them to the `List of
              contracts` below.
            </div>
            <div className="mt-3">
              Deploy:
              <br />
              <ul className="list-disc ml-5 underline">
                <li>
                  <a
                    href="https://thirdweb.com/thirdweb.eth/AirdropERC20"
                    target="_blank"
                  >
                    AirdropERC20
                  </a>
                </li>
                <li>
                  <a
                    href="https://thirdweb.com/thirdweb.eth/AirdropERC721"
                    target="_blank"
                  >
                    AirdropERC721
                  </a>
                </li>
                <li>
                  <a
                    href="https://thirdweb.com/thirdweb.eth/AirdropERC1155"
                    target="_blank"
                  >
                    AirdropERC1155
                  </a>
                </li>
              </ul>
            </div>
          </>
        </Box>
      </DetailsWrapper>
      <DetailsWrapper summary="List of contracts">
        <Box>
          <>
            <div className="text-lg font-bold">
              For sending ERC20 & native tokens
            </div>
            <div className="text-lg font-bold">For sending ERC721 tokens</div>
            <div className="text-lg font-bold">For sending ERC1155 tokens</div>
          </>
        </Box>
      </DetailsWrapper>
      <DetailsWrapper
        summary={`Supported chains (${GLACIER_SUPPORTED_CHAINS.length})`}
      >
        <Box>
          <>
            {GLACIER_SUPPORTED_CHAINS.map((item) => (
              <div className="flex flex-col border-b border-gray-400 mb-4 pb-4">
                <div>
                  <b>Name</b>: {item.chainName} -{" "}
                  {item.isTestnet ? "(Testnet)" : "(Mainnet)"}
                </div>
                <div>
                  {" "}
                  <b>Chain ID</b>: {item.chainId}
                </div>
                {item.subnetId && (
                  <div>
                    <b>Subnet ID</b>: {truncateEthAddress(item.subnetId)}{" "}
                    <button
                      className="border border-white px-1"
                      onClick={() => copyTextToClipboard(item.subnetId)}
                    >
                      Copy
                    </button>
                  </div>
                )}
                <div>
                  <b>Explorer</b>:{" "}
                  <a
                    href={item.explorerUrl}
                    target="_blank"
                    className="underline text-blue-500"
                  >
                    {item.explorerUrl.replace("https://", "")}
                  </a>
                </div>
              </div>
            ))}
          </>
        </Box>
      </DetailsWrapper>
    </>
  );
}
