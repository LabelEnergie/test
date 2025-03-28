import { z } from "zod";
import {
  schemaAddressError,
  schemaEmailError,
  schemaError,
  schemaNumberError,
} from "./formErrors";
import { toPlural } from "../string";

export const noEmptyEmailSchema = z
  .string({
    invalid_type_error: schemaEmailError,
  })
  .email({ message: schemaEmailError });

export const noEmptyStringSchema = z
  .string({
    required_error: schemaError,
    invalid_type_error: schemaError,
  })
  .trim()
  .min(1, schemaError);

export const noEmptyStringForbiddenCharSchema = (chars: string[]) =>
  noEmptyStringSchema.refine((s) => !chars.some((char) => s.includes(char)), {
    message: `${toPlural("Caractère", chars)} ${chars.join(" ")} ${toPlural(
      "interdit",
      chars
    )}`,
  });

export const noEmptyNumberSchema = z.number({
  invalid_type_error: schemaNumberError,
  required_error: schemaNumberError,
});

export function articleImageSchema(withLegend: boolean = true) {
  return z.object(
    {
      file: z.any().refine((f) => f != null, { message: schemaError }),

      legend: withLegend
        ? noEmptyStringForbiddenCharSchema(["|", ";"])
        : z.string(),
    },
    {
      invalid_type_error: schemaNumberError,
      required_error: schemaNumberError,
    }
  );
}

export const addressSchema = z.object(
  {
    address: z.string(),
    zipCode: z.string(),
    city: z.string(),
  },
  { required_error: schemaAddressError, invalid_type_error: schemaAddressError }
);
