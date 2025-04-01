"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRevenuesTreeDependencies = loadRevenuesTreeDependencies;
exports.isIdf = isIdf;
const number_1 = require("./number");
function loadRevenuesTreeDependencies(revenueTab) {
    return Object.fromEntries(Array.from({ length: 15 }, (_, i) => {
        const revenues = i + 1 < 6
            ? revenueTab[i + 1]
            : revenueTab[5].map((r, j) => r + revenueTab['more'][j] * (i + 1 - 5));
        return [
            i + 1,
            [
                {
                    id: 'revenue',
                    title: 'Quel est le revenu approximatif de votre foyer fiscal ?',
                    subtitle: 'Nous vous demandons uniquement les informations nécessaires pour vous fournir un résultat personnalisé.',
                    type: 'select',
                    values: Array.from({ length: 4 }).map((_, j) => ({
                        title: j == 0
                            ? `Inférieur à ${(0, number_1.formatRevenues)(revenues[j])}`
                            : j == 3
                                ? `Supérieur à ${(0, number_1.formatRevenues)(revenues[j - 1])}`
                                : `Entre ${(0, number_1.formatRevenues)(revenues[j - 1])} et ${(0, number_1.formatRevenues)(revenues[j])}`,
                        id: (j + 1).toString(),
                    })),
                },
            ],
        ];
    }));
}
function isIdf(result) {
    let zipCode = result
        .find((r) => r.id == `type-occupant.proprio-second.code-postal`)
        ?.value.toString();
    if (!zipCode) {
        try {
            zipCode = JSON.parse(result.find((r) => r.id == `adresse`)?.value.toString() ?? '{}').zipCode;
        }
        catch (err) {
            console.error(err);
        }
    }
    if (!zipCode)
        return false;
    const idfCodes = [
        '75',
        '77',
        '78',
        '91',
        '92',
        '93',
        '94',
        '95',
    ];
    return idfCodes.includes(zipCode[0] + zipCode[1]);
}
//# sourceMappingURL=simulator.js.map