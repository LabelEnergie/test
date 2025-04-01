export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function formatRevenues(value: number) {
  let numStr = value.toString();
  let sign = '';
  if (numStr.startsWith('-')) {
    sign = '-';
    numStr = numStr.slice(1);
  }
  let numStrWithSpaces = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return sign + numStrWithSpaces + ' €';
}

export function roundNumber(value: number, decimals: number) {
  const pow10 = 10 ** decimals;
  return Math.round(value * pow10) / pow10;
}

export function formatRevenuesToNumber(value: number) {
  const splitted = value.toString().split('.');
  let result = value.toString().replace('.', ',');
  if (splitted.length > 1) {
    const decimal = parseInt(splitted[1]);
    if (decimal < 10) {
      result += '0';
    }
  }
  return result;
}
