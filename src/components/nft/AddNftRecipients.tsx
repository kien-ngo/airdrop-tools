import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import { TEvmAddress, TValidateError } from "../../types";
import { validateInputAddress } from "../../utils/misc";

type Props = {
  tokenAddress: TEvmAddress;
  cancelFn: Function;
  collectionName: string;
};

export type TNftRecipient = {
  to: string;
  tokenId: number;
};

export default function AddNftRecipients(props: Props) {
  const { tokenAddress, cancelFn, collectionName } = props;
  const address = useAddress();
  const {
    contract: nftContract,
    isLoading: loadingNftContract,
    error: useContractError,
  } = useContract(tokenAddress);
  const {
    data: ownedNfts,
    isLoading: loadingOwnedNfts,
    error,
  } = useOwnedNFTs(nftContract, address);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [showNextStep, setShowNextStep] = useState<boolean>(false);
  const [recipients, setRecipients] = useState<TNftRecipient[]>([
    { to: "0xd587924ce50c703182409d7d45eb79a9fbe6b49d", tokenId: 1 },
  ]);
  const availableTokenIds =
    !ownedNfts || !ownedNfts.length
      ? []
      : ownedNfts.map((item) => Number(item.metadata.id));
  const excludedContractAddresses = [tokenAddress];
  const updateTokenId = (index: number, tokenId: number) => {
    recipients[index].tokenId = tokenId;
    setRecipients([...recipients]);
  };
  const updateRecipientAddress = (index: number, address: string) => {
    recipients[index].to = address;
    setRecipients([...recipients]);
  };
  const addMoreRecipients = () => {
    recipients.push({ to: "", tokenId: 0 });
    setRecipients([...recipients]);
  };
  const deleteRecipient = (index: number) => {
    recipients.splice(index, 1);
    setRecipients([...recipients]);
  };
  const submitRecipients = () => {
    setShowNextStep(true);
  };

  const validateTokenId = (tokenId: number): TValidateError => {
    // if (tokenId < 0) return {
    //     valid: false,
    //     message: 'Invalid token id'
    // }
    // if (!availableTokenIds.includes(tokenId)) return {
    //     valid: false,
    //     message: 'You don\'t own this token(id)'
    // }
    if (recipients.find((item) => item.tokenId === tokenId))
      return {
        valid: false,
        message: "Token ID already exists",
      };
    return { valid: true };
  };

  useEffect(() => {
    if (recipients.length === 0) {
      setCanSubmit(false);
    }
    if (
      recipients.some(
        (item) =>
          !validateInputAddress(item.to, excludedContractAddresses, address)
            .valid || !validateTokenId(item.tokenId).valid
      )
    ) {
      setCanSubmit(false);
      return;
    }
    setCanSubmit(true);
  }, [recipients]);
  if (loadingNftContract || loadingOwnedNfts) return <div>Loading...</div>;
  return (
    <>
      <div className="flex flex-col border border-gray-400 p-2 mt-2">
        <div className="font-bold text-lg">Step 2: Add recipients</div>
        <div className="flex flex-col">
          <div className="mt-2">
            You are sending NFTs from the <b>{collectionName}</b> collection.
            <br />
            You own {ownedNfts?.length} NFT(s) from this collection.
          </div>
          {ownedNfts && ownedNfts.length > 0 && (
            <div className="flex flex-row">
              <div>List of token(s): </div>
              <select className="ml-2">
                <option value="Token Id">View token ids</option>
                {ownedNfts?.map((item) => (
                  <option key={item.metadata.id}>
                    Token Id: {item.metadata.id}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="flex flex-col mt-2">
          {recipients.map((item, index) => {
            const addressErrorMsg = validateInputAddress(
              item.to,
              excludedContractAddresses,
              address
            ).message;
            const tokenIdErrorMsg = validateTokenId(item.tokenId).message;
            return (
              <div className="flex flex-row justify-center mt-2" key={index}>
                <div className="flex flex-col lg:min-w-[300px] md:min-w-[300px] flex-grow-[1] lg:flex-grow-0 md:flex-grow-0">
                  {index === 0 && <div>Address</div>}
                  <input
                    disabled={showNextStep}
                    defaultValue={item.to}
                    type="text"
                    placeholder="Wallet address"
                    className={`disabled:cursor-not-allowed w-full pl-1 py-1 max-w-[350px] text-xs h-[32px] ${
                      addressErrorMsg ? "border border-red-500" : ""
                    }`}
                    onChange={(e) =>
                      updateRecipientAddress(index, e.target.value)
                    }
                  />
                  {(addressErrorMsg || tokenIdErrorMsg) && (
                    <div className="text-red-500">
                      {addressErrorMsg ? addressErrorMsg : tokenIdErrorMsg}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  {index === 0 && <div>Token Id</div>}
                  <select className="h-[32px] ml-2">
                    <option value="TokenId">TokenId</option>
                    {availableTokenIds.map((id) => (
                      <option key={id} value={id}>
                        {id}
                      </option>
                    ))}
                  </select>
                  {!showNextStep && (
                    <button
                      disabled={showNextStep}
                      onClick={() => deleteRecipient(index)}
                      className="enabled:hover:underline enabled:hover:text-red-500 disabled:cursor-not-allowed"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          {!showNextStep && (
            <>
              <button
                disabled={showNextStep}
                onClick={addMoreRecipients}
                className="mt-4 rounded-lg border border-white w-fit px-5 mx-auto enabled:hover:text-black enabled:hover:bg-white duration-200 disabled:cursor-not-allowed disabled:text-gray-400"
              >
                Add more +
              </button>
              <div className="mx-auto mt-6">
                <button
                  disabled={!canSubmit}
                  onClick={submitRecipients}
                  className="rounded-lg border border-success w-fit px-5 enabled:hover:text-black enabled:hover:bg-success duration-200 disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400"
                >
                  Next
                </button>
                <button
                  onClick={() => cancelFn(undefined)}
                  className="ml-2 border border-red-500 px-4 rounded-md hover:text-white hover:bg-red-500 duration-200"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
