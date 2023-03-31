import {
  createDownloadLink,
  getCsvDataString,
  getJsonDataString,
} from "../../utils/misc";

export default function ExportDataBtn({ data }: { data: any[] }) {
  const date = new Date().toISOString();
  const downloadJson = () => {
    const dataStr = getJsonDataString(data);
    createDownloadLink(
      "downloadResumeBackupData",
      dataStr,
      `airdrop-list-${date}.json`
    );
  };
  const downloadCsv = () => {
    const dataStr = getCsvDataString(data);
    createDownloadLink(
      "downloadResumeBackupData",
      dataStr,
      `airdrop-list-${date}.csv`
    );
  };
  return (
    <>
      <div className="dropdown dropdown-bottom dropdown-end">
        <label
          tabIndex={0}
          className="m-1 px-2 border border-white py-1 cursor-pointer hover:text-black hover:bg-white duration-200 rounded-lg"
        >
          Export data
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <button onClick={downloadJson}>JSON</button>
          </li>
          <li>
            <button onClick={downloadCsv}>CSV</button>
          </li>
        </ul>
      </div>
      <a href="" id="downloadResumeBackupData" className="hidden"></a>
    </>
  );
}
