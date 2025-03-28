import { TSimulatorResult, TSimulatorTree } from 'src/simulator/simulator.type';
import { formatRevenues } from './number';
import { TAddress } from 'src/auth/auth.types';

export function loadRevenuesTreeDependencies(revenueTab: {
  1: number[];
  2: number[];
  3: number[];
  4: number[];
  5: number[];
  more: number[];
}): { [key: string]: TSimulatorTree[] } {
  return Object.fromEntries(
    Array.from({ length: 15 }, (_, i) => {
      const revenues =
        i + 1 < 6
          ? revenueTab[i + 1]
          : revenueTab[5].map(
              (r, j) => r + revenueTab['more'][j] * (i + 1 - 5),
            );
      return [
        i + 1,
        [
          {
            id: 'revenue',
            title: 'Quel est le revenu approximatif de votre foyer fiscal ?',
            subtitle:
              'Nous vous demandons uniquement les informations nécessaires pour vous fournir un résultat personnalisé.',
            type: 'select',
            values: Array.from({ length: 4 }).map((_, j) => ({
              title:
                j == 0
                  ? `Inférieur à ${formatRevenues(revenues[j])}`
                  : j == 3
                  ? `Supérieur à ${formatRevenues(revenues[j - 1])}`
                  : `Entre ${formatRevenues(
                      revenues[j - 1],
                    )} et ${formatRevenues(revenues[j])}`,
              id: (j + 1).toString(),
            })),
          },
        ],
      ];
    }),
  );
}

export function isIdf(result: TSimulatorResult[]) {
  let zipCode = result
    .find((r) => r.id == `type-occupant.proprio-second.code-postal`)
    ?.value.toString();

  if (!zipCode) {
    try {
      zipCode = (
        JSON.parse(
          result.find((r) => r.id == `adresse`)?.value.toString() ?? '{}',
        ) as TAddress
      ).zipCode;
    } catch (err) {
      console.error(err);
    }
  }

  if (!zipCode) return false;

  const idfCodes = [
    '75', // Paris
    '77', // Seine-et-Marne
    '78', // Yvelines
    '91', // Essonne
    '92', // Hauts-de-Seine
    '93', // Seine-Saint-Denis
    '94', // Val-de-Marne
    '95', // Val-d'Oise
  ];

  return idfCodes.includes(zipCode[0] + zipCode[1]);
}
