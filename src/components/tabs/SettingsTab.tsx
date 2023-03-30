import { GLACIER_SUPPORTED_CHAINS } from "../../constants/glacier-api";
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
              This app is completely open-source, free and does not track or
              collect anything from users. Check out the{" "}
              <a
                href="https://github.com/kienngo98/airdrop-tools"
                target="_blank"
                className="underline"
              >
                source code.
              </a>
            </div>
            <div className="mt-6">
              The app uses the{" "}
              <a href="https://glacier-api.avax.network/api#" target="_blank">
                Glacier APIs
              </a>{" "}
              offered by{" "}
              <a href="https://avalabs.org" target="_blank">
                Avalabs
              </a>{" "}
              and some other APIs from Covalent.
            </div>
            <div className="mt-6">
              The contracts used in this app are prebuilt and audited by{" "}
              <a href="https://thirdweb.com/" target="_blank">
                Thirdweb.
              </a>
            </div>
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
                    <b>Subnet ID</b>: {item.subnetId}
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
