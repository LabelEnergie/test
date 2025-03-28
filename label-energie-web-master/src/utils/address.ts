import { TAddress } from "@/types/auth.types";

export function formatAddress({ address, city, zipCode, address2 }: TAddress) {
  return `${address}${address2 ? ` ${address2}` : ""}, ${zipCode} ${city}`;
}
