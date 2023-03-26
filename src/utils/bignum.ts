export const convertBigNumToFloat = (
  value: string,
  decimals: number
): number => {
  const res = parseFloat(value) / Math.pow(10, decimals);
  return res;
};

export const convertHexToFloat = (hex: string, decimals: number): number => {
  const wei = BigInt(hex);
  const ether = Number(wei / BigInt(10 ** decimals));
  console.log({ether})
  return ether;
};
