export function toPlural(name: string, quantity?: any[] | number) {
  if (!quantity) return name;

  let value = Array.isArray(quantity) ? quantity.length : quantity;

  return value > 1 ? name + "s" : name;
}

export function wrapText(content: string = "", maxChar: number) {
  return content.length > maxChar
    ? content.substring(0, maxChar - 3) + "..."
    : content;
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
