export function toPlural(name: string, quantity?: any[] | number) {
  if (!quantity) return name;

  let value = Array.isArray(quantity) ? quantity.length : quantity;

  return value > 1 ? name + 's' : name;
}
