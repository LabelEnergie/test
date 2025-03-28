import { TSimulatorResult } from "@/types/simulator.types";

export const TEST_SIMULATION: TSimulatorResult[] = [
  {
    id: "type-logement",
    type: "select",
    value: ["appartement"],
  },
  {
    id: "date",
    type: "select",
    value: ["2<15"],
  },
  {
    id: "surface",
    type: "input-number",
    value: "10",
  },
  {
    id: "chauffage-principal",
    type: "select",
    value: ["gaz"],
  },
  {
    id: "chauffage-principal.gaz.equipement",
    type: "select",
    value: ["chaudiere-classique"],
  },
  {
    id: "travaux",
    type: "select-multi",
    value: ["6"],
  },
  {
    id: "adresse",
    type: "input-address",
    value: '{"address":"Bobigny","city":"Bobigny","zipCode":"93000"}',
  },
  {
    id: "type-occupant",
    type: "select",
    value: ["proprio-bailleur"],
  },
  {
    id: "foyer-personnes",
    type: "input-moreless",
    value: "3",
  },
  {
    id: "foyer-personnes.3.revenue",
    type: "select",
    value: ["1"],
  },
  {
    id: "prime-utilisee",
    type: "select",
    value: ["non"],
  },
  {
    id: "telephone",
    type: "input-text",
    value: "1001",
  },
];
