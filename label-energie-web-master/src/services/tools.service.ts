import { TGeoCodeJSON } from "@/types/tools.type";

export async function reverseGeocode(address: string, type?: "municipality") {
  const response = await fetch(
    `https://api-adresse.data.gouv.fr/search/?q=${address.replaceAll(
      " ",
      "+"
    )}${type ? `&type=${type}` : ""}`
  );

  const json: TGeoCodeJSON = await response.json();
  return json;
}
