import { formatDate as formatDateFns } from "date-fns";

export function formatDate(date: Date) {
  return formatDateFns(date, "dd/MM/yyyy");
}
