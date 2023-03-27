export function convertToWei(num: number): string {
  const wei = BigInt(10) ** BigInt(18); // 1 wei = 10^18
  const weiAmount = BigInt(num) * wei;
  return weiAmount.toString();
}
