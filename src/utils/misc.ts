export const copyTextToClipboard = async (
  str: string,
  msg: string = "Copied."
) => {
  await navigator.clipboard.writeText(str);
  alert(msg);
};
