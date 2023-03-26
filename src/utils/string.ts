export function truncateEthAddress(
  address: string,
  prefixLength = 4,
  suffixLength = 5
): string {
  const prefix = address.slice(0, prefixLength + 2); // add 2 to include "0x" prefix
  const suffix = address.slice(-suffixLength);
  return `${prefix}...${suffix}`;
}
