import { useState } from "react";
import { TOKEN_RECIPIENTS_EXAMPLE } from "../../constants/examples";
import {
  closePopup,
  createDownloadLink,
  getCsvDataString,
  getJsonDataString,
} from "../../utils/misc";
import { TRecipient } from "./AddTokenRecipients";

export default function UploadTokenRecipients({
  disabled,
  onCompleted,
}: {
  disabled: boolean;
  onCompleted: Function;
}) {
  const [selectedFormat, setSelectedFormat] = useState<"json" | "csv">();
  const acceptedType = selectedFormat === "json" ? "application/JSON" : ".csv";

  const downloadJson = () => {
    const dataStr = getJsonDataString(TOKEN_RECIPIENTS_EXAMPLE);
    createDownloadLink("downloadExampleFile", dataStr, "example.json");
  };
  const downloadCsv = () => {
    const dataStr = getCsvDataString(TOKEN_RECIPIENTS_EXAMPLE);
    createDownloadLink("downloadExampleFile", dataStr, "example.csv");
  };
  const handleJsonUpload = (event: React.ChangeEvent) => {
    try {
      const input = event.target as HTMLInputElement;
      if (!input || !input.files || input.files.length !== 1) return;
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const jsonContent = event.target?.result as string;
        try {
          const jsonObject: TRecipient[] = JSON.parse(jsonContent);
          onCompleted(jsonObject);
          closePopup("uploadRecipientsModal");
        } catch (error) {
          console.error(error);
        }
      };
      reader.readAsText(file);
    } catch (err) {
      alert(err);
    }
  };
  const handleCsvUpload = (event: React.ChangeEvent) => {
    try {
      const input = event.target as HTMLInputElement;
      if (!input || !input.files || input.files.length !== 1) return;
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const csvData = event.target?.result as string;
        const csvRows = csvData.split("\n");

        // Extract headers from the first row of CSV data
        const headers = csvRows[0].split(",").map((header) => header.trim());

        // Create an array of JS objects from the CSV data
        const jsObjects: TRecipient[] = csvRows.slice(1).map((row) => {
          const rowValues = row.split(",").map((value) => value.trim());
          const object: TRecipient = {
            to: rowValues[0],
            amount: Number(rowValues[1]),
          };

          return object;
        });
        onCompleted(jsObjects);
        closePopup("uploadRecipientsModal");
      };
      reader.readAsText(file);
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <div className="dropdown mb-8">
        <button tabIndex={0} className="btn m-1" disabled={disabled}>
          Upload file
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 border border-gray-400"
        >
          <li>
            <label
              htmlFor="uploadRecipientsModal"
              onClick={() => setSelectedFormat("json")}
            >
              Upload JSON
            </label>
          </li>
          <li>
            <label
              htmlFor="uploadRecipientsModal"
              onClick={() => setSelectedFormat("csv")}
            >
              Upload CSV
            </label>
          </li>
        </ul>
      </div>

      <input
        type="checkbox"
        id="uploadRecipientsModal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-full lg:w-[700px] md:w-[500px] flex flex-col border border-gray-400">
          <div className="w-full top-0 right-0 flex flex-row justify-between">
            <span></span>
            <span className="my-auto pl-8 text-white">
              Upload {selectedFormat} file
            </span>
            <label
              htmlFor="uploadRecipientsModal"
              className="btn btn-sm btn-circle my-auto"
            >
              ✕
            </label>
          </div>
          <div className="flex flex-col mt-8">
            {selectedFormat === "json" ? (
              <div className="mx-auto">
                Download{" "}
                <button onClick={downloadJson} className="underline">
                  example.json
                </button>
              </div>
            ) : (
              <div className="mx-auto">
                Download{" "}
                <button onClick={downloadCsv} className="underline">
                  example.csv
                </button>
              </div>
            )}

            <input
              type="file"
              accept={acceptedType}
              onChange={(e) => {
                selectedFormat === "json"
                  ? handleJsonUpload(e)
                  : handleCsvUpload(e);
              }}
              className="file-input w-full max-w-xs mx-auto mt-8 mb-8 border border-gray-400"
            />
            <div className="flex flex-row flex-wrap justify-between w-[150px] mx-auto mt-5">
              <label
                htmlFor="uploadRecipientsModal"
                className="btn btn-success"
              >
                Save
              </label>
              <label htmlFor="uploadRecipientsModal" className="btn btn-error">
                Cancel
              </label>
            </div>
          </div>
        </div>
      </div>
      <a href="" id="downloadExampleFile" className="hidden"></a>
    </>
  );
}
