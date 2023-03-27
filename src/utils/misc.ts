export const copyTextToClipboard = async (str: string) => {
  navigator.clipboard.writeText(str);
};
