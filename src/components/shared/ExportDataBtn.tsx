export default function ExportDataBtn({ data }: { data: any[] }) {
  const date = new Date().toISOString();
  const downloadJson = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(data));
    loadLink(dataStr, `airdrop-list-${date}.json`);
  };
  const downloadCsv = () => {
    const attrName = Object.hasOwn(data[0], "amount") ? "amount" : "tokenId";
    let dataStr = "data:text/csv;charset=utf-8," + `address,${attrName}\r\n`;
    data.forEach(function (item) {
      const row = `${item.to},${item[attrName]}`;
      dataStr += row + "\r\n";
    });
    loadLink(dataStr, `airdrop-list-${date}.csv`);
  };
  const loadLink = (href: string, fileName: string) => {
    const dlAnchorElem = document.getElementById(
      "downloadResumeBackupData"
    ) as HTMLAnchorElement;
    dlAnchorElem.setAttribute("href", href);
    dlAnchorElem.setAttribute("download", fileName);
    dlAnchorElem.click();
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
