export default function SettingsTab() {
  return (
    <>
      <details className="mt-4 mx-auto">
        <summary className="bg-primary w-[95vw] lg:w-[800px] md:w-[700px] py-2 pl-2 rounded-lg cursor-pointer">
          Configs
        </summary>
        <div className="flex flex-col w-[95vw] lg:w-[800px] md:w-[700px] px-2">
          <div className="mt-2 border border-white p-2">
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
              <div className="text-xs">This app does not collect your API key.</div>
            </div>
          </div>
        </div>
      </details>
      <details className="mt-4 mx-auto">
        <summary className="bg-primary w-[95vw] lg:w-[800px] md:w-[700px] py-2 pl-2 rounded-lg cursor-pointer">
          About
        </summary>
        <div className="flex flex-col w-[95vw] lg:w-[800px] md:w-[700px] px-2">
          <div className="mt-2 border border-white p-2">
            This app is completely open-source, free and does not track or
            collect anything from users. Check out the{" "}
            <a
              href="https://github.com/kienngo98/airdrop-tools"
              target="_blank"
              className="underline"
            >
              source code.
            </a>
            <br />
            <br />
            The app uses the{" "}
            <a href="https://glacier-api.avax.network/api#" target="_blank">
              Glacier APIs
            </a>{" "}
            offered by{" "}
            <a href="https://avalabs.org" target="_blank">
              Avalabs
            </a>{" "}
            and some other APIs from Covalent.
            <br />
            <br />
            The contracts used in this app are prebuilt and audited by{" "}
            <a href="https://thirdweb.com/" target="_blank">
              Thirdweb.
            </a>
            <details>
              <summary>Contracts</summary>
              <div className="flex flex-col">
                <ul>
                  <li>Avalanche</li>
                </ul>
              </div>
            </details>
          </div>
        </div>
      </details>
    </>
  );
}
