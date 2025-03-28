import {
  useForm,
  UseFormProps,
  FormProvider,
  UseFormReturn,
  FieldValues,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";
import get from "lodash.get";
import { ComponentProps } from "react";
import { ZodSchema, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface UseZodFormProps<T extends ZodSchema<any>>
  extends UseFormProps<TypeOf<T>> {
  schema: T;
}

export const useZodForm = <T extends ZodSchema<any>>({
  schema,
  ...formConfig
}: UseZodFormProps<T>) => {
  return useForm({
    ...formConfig,
    resolver: zodResolver(schema),
  });
};

export const useFieldError = (name?: string): { message?: string } | null => {
  const form = useFormContext();
  if (!name) return null;
  return get(form?.formState?.errors ?? {}, name) ?? null;
};

export interface Props<T extends FieldValues = any>
  extends Omit<ComponentProps<"form">, "onSubmit"> {
  form: UseFormReturn<T>;
  onSubmit?: SubmitHandler<T>;
}

export const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: Props<T>) => {
  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={(event) => {
          event.stopPropagation();
          return form.handleSubmit(onSubmit ? (onSubmit as any) : () => {})(
            event
          );
        }}
        {...props}
      >
        <fieldset disabled={form.formState.isSubmitting}>{children}</fieldset>
      </form>
    </FormProvider>
  );
};
