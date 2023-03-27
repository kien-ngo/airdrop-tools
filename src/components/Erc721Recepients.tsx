import {
  useContract,
  useOwnedNFTs,
  useTransferNFT,
  Web3Button,
} from "@thirdweb-dev/react";
import { isAddress } from "ethers/lib/utils";
import { useRef, useState } from "react";
const AIRDROP_CONTRACT = "0xC5CC7F3099b85aC7B22E2f5ff57D0d3E119B5b01";

type RecepientItem = {
  address: string;
  tokenId: number;
};
export default function Erc721Recepients({
  contractToSend,
  tokenOwner,
}: {
  contractToSend: string;
  tokenOwner: string;
}) {
  const [recepients, setRecepients] = useState<RecepientItem[]>([]);
  const {
    contract: nftContract,
    isLoading: loadingNftContract,
    error: useContractError,
  } = useContract(contractToSend);
  const { data, isLoading, error } = useOwnedNFTs(nftContract, tokenOwner);
  const {
    mutateAsync: transferNFT,
    isLoading: _l,
    error: _err,
  } = useTransferNFT(nftContract);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const isDisabled =
    !recepients.length || loadingNftContract || !nftContract || !data;
  return (
    <div className="flex flex-col mx-auto">
      {!loadingNftContract && !isLoading ? (
        <div className="flex flex-col">
          <div className="mx-auto mt-4">
            You own {data?.length} NFTs from this contract
          </div>
          <div className="mx-auto">
            <label className="btn btn-primary mt-4" htmlFor="AddRecepient">
              + Add recepient
            </label>
            <input type="checkbox" id="AddRecepient" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box w-full lg:w-[700px] md:w-[500px] flex flex-col">
                <div className="w-full top-0 right-0 flex flex-row justify-between">
                  <span></span>
                  <span className="my-auto pl-8 text-white">
                    Add new recepient
                  </span>
                  <label
                    htmlFor="AddRecepient"
                    className="btn btn-sm btn-circle my-auto"
                  >
                    ✕
                  </label>
                </div>
                <div className="flex flex-col mt-8">
                  <div className="flex flex-col justify-start">
                    <div>
                      <label className="text-white my-auto mr-3 w-[90px] text-right">
                        Wallet address
                      </label>
                      <button
                        className="btn"
                        onClick={async () => {
                          navigator.clipboard.readText().then((text) => {
                            const input = document.getElementById(
                              "inputWalletAddress"
                            ) as HTMLInputElement;
                            if (!input) return;
                            input.value = text;
                          });
                        }}
                      >
                        Paste
                      </button>
                    </div>
                    <input
                      id="inputWalletAddress"
                      ref={inputRef}
                      className="text-white p-4 text-base w-full"
                      placeholder="0x12345..."
                    />
                  </div>
                  <div className="flex flex-row justify-start mt-3">
                    <label className="text-white my-auto mr-3 w-[90px] text-right">
                      Token ID
                    </label>
                    <select className="p-4 min-w-[100px]" ref={selectRef}>
                      {data?.map((item) => (
                        <option value={Number(item.metadata.id)}>
                          Token Id: {item.metadata.id}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-row flex-wrap justify-between w-[250px] mx-auto mt-5">
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        const address = inputRef.current?.value;
                        if (!address || !isAddress(address))
                          return alert("Invalid wallet address");
                        const tokenId = Number(selectRef.current?.value);
                        if (tokenId < 0)
                          return alert("Please select a tokenId");
                        recepients.push({ address, tokenId });
                        setRecepients([...recepients]);
                      }}
                    >
                      Save
                    </button>
                    <label htmlFor="AddRecepient" className="btn btn-error">
                      Cancel
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {recepients.length > 0 && (
            <table className="mt-4 border border-gray-600 mb-8">
              <tbody>
                <tr>
                  <th>Recepient address</th>
                  <th>Token ID</th>
                  <th></th>
                </tr>
                {recepients.map((item, index) => (
                  <tr className="" key={index + item.address}>
                    <td className="px-2 py-2">{item.address}</td>
                    <td className="text-center">{item.tokenId}</td>
                    <td>
                      <button className="text-red-500 pr-2">x</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div></div>
      )}
      {recepients.length > 0 && nftContract && (
        <>
          {/* If user is sending only 1 token then we dont need to use the
          airdrop contract */}
          {recepients.length === 1 ? (
            <Web3Button
              contractAddress={AIRDROP_CONTRACT}
              action={() =>
                transferNFT({
                  to: recepients[0].address,
                  tokenId: recepients[0].tokenId,
                })
              }
            >
              Transfer
            </Web3Button>
          ) : (
            <Web3Button
              isDisabled={isDisabled}
              contractAddress={AIRDROP_CONTRACT}
              action={async (contract) => {
                const isApproved = await nftContract.erc721.isApproved(
                  tokenOwner,
                  AIRDROP_CONTRACT
                );
                if (!isApproved) {
                  const receipt = await nftContract.erc721.setApprovalForAll(
                    AIRDROP_CONTRACT,
                    true
                  );
                  console.log(receipt);
                }
                const _recipients = recepients.map((item) => item.address);
                const _tokenIds = recepients.map((item) => item.tokenId);
                contract.call(
                  "airdrop",
                  contractToSend,
                  tokenOwner,
                  _recipients,
                  _tokenIds
                );
              }}
            >
              Send batch
            </Web3Button>
          )}
        </>
      )}
    </div>
  );
}
