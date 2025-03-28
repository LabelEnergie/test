import { TAddress } from "@/types/auth.types";
import { TSimulatorResult } from "@/types/simulator.types";

export function addDataToSimulatorResult(
  currentResult: TSimulatorResult[],
  newValue: TSimulatorResult
) {
  if (currentResult.find((r) => r.id == newValue.id)) {
    return [...currentResult.filter((r) => r.id != newValue.id), newValue];
  }

  return [...currentResult, newValue];
}

export function getAddressWithSimulatorData(
  simulator: TSimulatorResult[]
): TAddress | null {
  const address = simulator.find((s) => s.id == "adresse");
  try {
    if (address) {
      return JSON.parse(address.value.toString());
    }
  } catch (err) {
    console.error(err);
  }
  return null;
}

export function isIdf(result: TSimulatorResult[]) {
  let zipCode = result
    .find((r) => r.id == `type-occupant.proprio-second.code-postal`)
    ?.value.toString();

  if (!zipCode) {
    try {
      zipCode = (
        JSON.parse(
          result.find((r) => r.id == `adresse`)?.value.toString() ?? "{}"
        ) as TAddress
      ).zipCode;
    } catch (err) {
      console.error(err);
    }
  }

  if (!zipCode) return false;

  const idfCodes = [
    "75", // Paris
    "77", // Seine-et-Marne
    "78", // Yvelines
    "91", // Essonne
    "92", // Hauts-de-Seine
    "93", // Seine-Saint-Denis
    "94", // Val-de-Marne
    "95", // Val-d'Oise
  ];

  return idfCodes.includes(zipCode[0] + zipCode[1]);
}
