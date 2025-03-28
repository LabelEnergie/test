export function roundNumber(value: number, decimals: number) {
  const pow10 = 10 ** decimals;
  return Math.round(value * pow10) / pow10;
}

export function formatRevenues(value: number) {
  let numStr = roundNumber(value, 2).toString();
  let sign = "";
  if (numStr.startsWith("-")) {
    sign = "-";
    numStr = numStr.slice(1);
  }
  let numStrWithSpaces = numStr
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    .replace(".", ",");

  const splitted = numStrWithSpaces.split(",");
  if (splitted.length > 1) {
    const decimal = splitted[1];
    if (/^[0-9]$/.test(decimal)) {
      numStrWithSpaces += "0";
    }
  }

  return sign + numStrWithSpaces + "€";
}
